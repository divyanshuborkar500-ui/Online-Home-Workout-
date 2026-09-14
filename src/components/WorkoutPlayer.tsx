import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  CheckCircle2,
  Clock,
  Dumbbell,
  Layers,
  ArrowRight,
  RefreshCw,
  Info,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  X,
  Volume2
} from 'lucide-react';
import { WorkoutPlan, WorkoutExerciseItem, Exercise } from '../types';
import { ExerciseIllustration } from './ExerciseIllustration';
import { ExerciseReplacementModal } from './ExerciseReplacementModal';
import { soundManager } from '../utils/audio';
import { getExerciseImageUrl } from '../data/exerciseImages';
import { useLanguage } from '../context/LanguageContext';

interface WorkoutPlayerProps {
  plan: WorkoutPlan;
  onWorkoutFinished: (stats: { durationSeconds: number; completedCount: number; totalCount: number }) => void;
  onBackToGenerator: () => void;
}

type PlayerState = 'overview' | 'active_exercise' | 'resting';

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({
  plan,
  onWorkoutFinished,
  onBackToGenerator
}) => {
  const { t } = useLanguage();
  // All exercises flattened into sequential list for guided flow
  const allExerciseItems: WorkoutExerciseItem[] = [
    ...plan.warmup,
    ...plan.mainExercises,
    ...plan.cooldown
  ];

  const [currentPlan, setCurrentPlan] = useState<WorkoutPlan>(plan);
  const [exercisesList, setExercisesList] = useState<WorkoutExerciseItem[]>(allExerciseItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [playerState, setPlayerState] = useState<PlayerState>('overview');

  // Exercise Replacement Modal State
  const [replacingExercise, setReplacingExercise] = useState<Exercise | null>(null);
  const [replacingInstanceId, setReplacingInstanceId] = useState<string | null>(null);

  // Overall workout elapsed time
  const [totalElapsedSeconds, setTotalElapsedSeconds] = useState(0);
  const [isTotalTimerRunning, setIsTotalTimerRunning] = useState(false);
  const totalTimerStartTimeRef = useRef<number | null>(null);

  // Active Exercise / Rest Countdown Timer
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(30);
  const [timerMaxSeconds, setTimerMaxSeconds] = useState<number>(30);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerTargetTimeRef = useRef<number | null>(null);

  // Completed items tracker
  const [completedInstances, setCompletedInstances] = useState<Record<string, boolean>>({});

  // Expanded cards in overview
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const currentItem = exercisesList[currentIndex] || exercisesList[0];
  const currentExercise = currentItem?.exercise;

  // Background-safe total timer tick
  useEffect(() => {
    let interval: number;
    if (isTotalTimerRunning) {
      if (!totalTimerStartTimeRef.current) {
        totalTimerStartTimeRef.current = Date.now() - totalElapsedSeconds * 1000;
      }
      interval = window.setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - (totalTimerStartTimeRef.current || now)) / 1000);
        setTotalElapsedSeconds(Math.max(0, elapsed));
      }, 500);
    } else {
      totalTimerStartTimeRef.current = null;
    }
    return () => clearInterval(interval);
  }, [isTotalTimerRunning]);

  // Background-safe countdown timer tick (for active timed exercises or rest)
  useEffect(() => {
    let interval: number;
    if (isTimerRunning && timerTargetTimeRef.current) {
      interval = window.setInterval(() => {
        const now = Date.now();
        const diff = Math.max(0, Math.ceil((timerTargetTimeRef.current! - now) / 1000));
        setTimerSecondsLeft(diff);

        // Audio countdown for 3, 2, 1
        if (diff <= 3 && diff > 0) {
          soundManager.playCountdown();
        }

        if (diff <= 0) {
          setIsTimerRunning(false);
          timerTargetTimeRef.current = null;
          soundManager.playBeep(880, 0.25); // high beep done

          if (playerState === 'resting') {
            // End of rest -> advance set or next exercise
            handleEndRest();
          }
        }
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, playerState]);

  // Initialize timer for current exercise
  const setupExerciseTimer = (item: WorkoutExerciseItem) => {
    const isTimed = item.exercise.isTimed;
    const duration = isTimed ? item.exercise.timeInSeconds || 30 : 45;
    setTimerMaxSeconds(duration);
    setTimerSecondsLeft(duration);
    setIsTimerRunning(false);
    timerTargetTimeRef.current = null;
  };

  const startTimer = () => {
    timerTargetTimeRef.current = Date.now() + timerSecondsLeft * 1000;
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
    timerTargetTimeRef.current = null;
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    timerTargetTimeRef.current = null;
    setTimerSecondsLeft(timerMaxSeconds);
  };

  const startGuidedWorkout = () => {
    setPlayerState('active_exercise');
    setIsTotalTimerRunning(true);
    setCurrentIndex(0);
    setCurrentSet(1);
    setupExerciseTimer(exercisesList[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartRest = (seconds: number) => {
    setPlayerState('resting');
    setTimerMaxSeconds(seconds);
    setTimerSecondsLeft(seconds);
    timerTargetTimeRef.current = Date.now() + seconds * 1000;
    setIsTimerRunning(true);
  };

  const handleEndRest = () => {
    // Check if more sets remain for current exercise
    if (currentSet < currentItem.sets) {
      setCurrentSet((prev) => prev + 1);
      setPlayerState('active_exercise');
      setupExerciseTimer(currentItem);
    } else {
      // Advance to next exercise
      if (currentIndex < exercisesList.length - 1) {
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        setCurrentSet(1);
        setPlayerState('active_exercise');
        setupExerciseTimer(exercisesList[nextIdx]);
      } else {
        // Workout Finished!
        finishWorkout();
      }
    }
  };

  const handleCompleteCurrentSet = () => {
    // Mark instance complete
    setCompletedInstances((prev) => ({ ...prev, [currentItem.instanceId]: true }));

    const restSecs = currentItem.exercise.restSeconds || 30;

    if (currentSet < currentItem.sets) {
      handleStartRest(restSecs);
    } else if (currentIndex < exercisesList.length - 1) {
      handleStartRest(restSecs);
    } else {
      finishWorkout();
    }
  };

  const handleSkipExercise = () => {
    if (currentIndex < exercisesList.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setCurrentSet(1);
      setPlayerState('active_exercise');
      setupExerciseTimer(exercisesList[nextIdx]);
    } else {
      finishWorkout();
    }
  };

  const handlePreviousExercise = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setCurrentSet(1);
      setPlayerState('active_exercise');
      setupExerciseTimer(exercisesList[prevIdx]);
    }
  };

  const finishWorkout = () => {
    setIsTotalTimerRunning(false);
    setIsTimerRunning(false);
    const completedCount = Object.keys(completedInstances).length;
    onWorkoutFinished({
      durationSeconds: Math.max(totalElapsedSeconds, 60),
      completedCount: Math.max(completedCount, 1),
      totalCount: exercisesList.length
    });
  };

  const handleOpenReplacementModal = (exercise: Exercise, instanceId: string) => {
    setReplacingExercise(exercise);
    setReplacingInstanceId(instanceId);
  };

  const handleApplyReplacement = (newExercise: Exercise) => {
    if (!replacingInstanceId) return;

    setExercisesList((prevList) =>
      prevList.map((item) => {
        if (item.instanceId === replacingInstanceId) {
          return {
            ...item,
            exercise: newExercise,
            target: newExercise.isTimed
              ? `${newExercise.timeInSeconds || 30} seconds`
              : newExercise.defaultRepsOrSeconds
          };
        }
        return item;
      })
    );

    // If currently active, reset timer
    if (currentItem.instanceId === replacingInstanceId) {
      setupExerciseTimer({
        ...currentItem,
        exercise: newExercise
      });
    }

    setReplacingExercise(null);
    setReplacingInstanceId(null);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Exercise Replacement Modal */}
      {replacingExercise && (
        <ExerciseReplacementModal
          currentExercise={replacingExercise}
          userEquipment={plan.equipment}
          userLevel={plan.difficulty}
          onSelectReplacement={handleApplyReplacement}
          onClose={() => setReplacingExercise(null)}
        />
      )}

      {/* OVERVIEW MODE */}
      {playerState === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Header Card */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                Your Customized Routine
              </span>
              <button
                onClick={onBackToGenerator}
                className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1"
              >
                Modify Selections
              </button>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">{plan.title}</h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {plan.description}
            </p>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-slate-400">Duration</div>
                  <div className="font-bold text-white">~{plan.durationMinutes} Minutes</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-slate-400">Difficulty</div>
                  <div className="font-bold text-white capitalize">{plan.difficulty.replace('_', ' ')}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-slate-400">Equipment</div>
                  <div className="font-bold text-white capitalize">
                    {plan.equipment.join(', ').replace(/_/g, ' ')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-slate-400">Exercises</div>
                  <div className="font-bold text-white">{exercisesList.length} Total</div>
                </div>
              </div>
            </div>

            {/* Primary Start Guided Workout CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <button
                id="start-guided-workout-btn"
                onClick={startGuidedWorkout}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-base transition shadow-lg hover:shadow-emerald-500/25 active:scale-98"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Start Guided Workout</span>
              </button>
              <span className="text-xs text-slate-400">
                Includes countdown timer, movement guides & rest periods.
              </span>
            </div>
          </div>

          {/* Section: Warm-Up */}
          {plan.warmup.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Step 1: Dynamic Warm-Up ({plan.warmup.length} movements)
                </h2>
              </div>
              <div className="grid gap-3">
                {plan.warmup.map((item, idx) => (
                  <ExerciseOverviewCard
                    key={item.instanceId}
                    item={item}
                    index={idx + 1}
                    isExpanded={expandedCardId === item.instanceId}
                    onToggleExpand={() =>
                      setExpandedCardId(expandedCardId === item.instanceId ? null : item.instanceId)
                    }
                    onReplace={() => handleOpenReplacementModal(item.exercise, item.instanceId)}
                    onStartDirect={() => {
                      const foundIdx = exercisesList.findIndex((x) => x.instanceId === item.instanceId);
                      if (foundIdx !== -1) {
                        setCurrentIndex(foundIdx);
                        setCurrentSet(1);
                        setPlayerState('active_exercise');
                        setIsTotalTimerRunning(true);
                        setupExerciseTimer(exercisesList[foundIdx]);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Section: Main Workout */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Step 2: Main Circuit ({plan.mainExercises.length} movements)
              </h2>
            </div>
            <div className="grid gap-3">
              {plan.mainExercises.map((item, idx) => (
                <ExerciseOverviewCard
                  key={item.instanceId}
                  item={item}
                  index={idx + 1 + plan.warmup.length}
                  isExpanded={expandedCardId === item.instanceId}
                  onToggleExpand={() =>
                    setExpandedCardId(expandedCardId === item.instanceId ? null : item.instanceId)
                  }
                  onReplace={() => handleOpenReplacementModal(item.exercise, item.instanceId)}
                  onStartDirect={() => {
                    const foundIdx = exercisesList.findIndex((x) => x.instanceId === item.instanceId);
                    if (foundIdx !== -1) {
                      setCurrentIndex(foundIdx);
                      setCurrentSet(1);
                      setPlayerState('active_exercise');
                      setIsTotalTimerRunning(true);
                      setupExerciseTimer(exercisesList[foundIdx]);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Section: Cool-Down */}
          {plan.cooldown.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Step 3: Cool-Down & Mobility ({plan.cooldown.length} stretches)
                </h2>
              </div>
              <div className="grid gap-3">
                {plan.cooldown.map((item, idx) => (
                  <ExerciseOverviewCard
                    key={item.instanceId}
                    item={item}
                    index={idx + 1 + plan.warmup.length + plan.mainExercises.length}
                    isExpanded={expandedCardId === item.instanceId}
                    onToggleExpand={() =>
                      setExpandedCardId(expandedCardId === item.instanceId ? null : item.instanceId)
                    }
                    onReplace={() => handleOpenReplacementModal(item.exercise, item.instanceId)}
                    onStartDirect={() => {
                      const foundIdx = exercisesList.findIndex((x) => x.instanceId === item.instanceId);
                      if (foundIdx !== -1) {
                        setCurrentIndex(foundIdx);
                        setCurrentSet(1);
                        setPlayerState('active_exercise');
                        setIsTotalTimerRunning(true);
                        setupExerciseTimer(exercisesList[foundIdx]);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ACTIVE EXERCISE OR REST MODE */}
      {(playerState === 'active_exercise' || playerState === 'resting') && (
        <div className="space-y-6 animate-in fade-in">
          {/* Top Bar: Progress, Elapsed Time, and Exit */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Exercise <span className="text-slate-900 dark:text-white font-black">{currentIndex + 1}</span> of{' '}
                {exercisesList.length}
              </div>
              <div className="w-24 sm:w-36 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / exercisesList.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 font-mono font-bold text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{formatTime(totalElapsedSeconds)}</span>
              </div>

              <button
                id="view-overview-btn"
                onClick={() => setPlayerState('overview')}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold"
                title="Return to workout overview"
              >
                Overview
              </button>
            </div>
          </div>

          {/* REST TIMER OVERLAY */}
          {playerState === 'resting' ? (
            <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center shadow-xl border border-slate-800 animate-in zoom-in-95">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 inline-block mb-4">
                Recovery Period
              </span>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
                REST — {timerSecondsLeft}s
              </h2>
              <p className="text-sm text-slate-400 max-w-sm mx-auto mb-8">
                Breathe deeply through your nose, take a sip of water, and shake out your muscles.
              </p>

              {/* Visual Countdown Ring / Bar */}
              <div className="w-48 h-48 mx-auto relative flex items-center justify-center mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    stroke="#1e293b"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    stroke="#10b981"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={527}
                    strokeDashoffset={527 - (527 * (timerSecondsLeft / timerMaxSeconds))}
                    strokeLinecap="round"
                    className="transition-all duration-200"
                  />
                </svg>
                <div className="absolute text-4xl font-black font-mono text-white">
                  {timerSecondsLeft}
                </div>
              </div>

              {/* Next Up preview */}
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 max-w-xs mx-auto mb-8 text-xs text-slate-300">
                <span className="text-slate-400">Coming up next: </span>
                <span className="font-bold text-white">
                  {currentSet < currentItem.sets
                    ? `${currentItem.exercise.name} (Set ${currentSet + 1} of ${currentItem.sets})`
                    : exercisesList[currentIndex + 1]?.exercise.name || 'Finish Workout'}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  id="add-15s-rest-btn"
                  onClick={() => {
                    setTimerSecondsLeft((prev) => prev + 15);
                    setTimerMaxSeconds((prev) => prev + 15);
                    if (timerTargetTimeRef.current) {
                      timerTargetTimeRef.current += 15000;
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-bold text-slate-300 transition"
                >
                  +15s Rest
                </button>
                <button
                  id="skip-rest-btn"
                  onClick={handleEndRest}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm transition shadow-sm"
                >
                  {t('skipRest')}
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE EXERCISE VIEW */
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Visual Demonstration Illustration */}
                <div>
                  <ExerciseIllustration
                    exerciseId={currentExercise.id}
                    exerciseName={currentExercise.name}
                    imageUrl={currentExercise.imageUrl}
                    type={currentExercise.illustrationType}
                    className="w-full h-64 sm:h-72 rounded-2xl shadow-inner"
                  />

                  {/* Muscle Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {currentExercise.primaryMuscles.map((muscle) => (
                      <span
                        key={muscle}
                        className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold"
                      >
                        {muscle}
                      </span>
                    ))}
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium capitalize">
                      {currentExercise.difficulty.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Form Modifications & Progressions */}
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">Easier Option: </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {currentExercise.easierModification}
                      </span>
                    </div>
                    {currentExercise.harderProgression && (
                      <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300">Progression: </span>
                        <span className="text-slate-600 dark:text-slate-400">
                          {currentExercise.harderProgression}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Exercise Controls, Instructions, and Timers */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Set {currentSet} of {currentItem.sets}
                      </span>
                      <button
                        id="replace-exercise-active-btn"
                        onClick={() => handleOpenReplacementModal(currentExercise, currentItem.instanceId)}
                        className="text-xs font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 flex items-center gap-1 transition"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Replace Exercise</span>
                      </button>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                      {currentExercise.name}
                    </h2>

                    <div className="mt-2 text-base font-bold text-emerald-600 dark:text-emerald-400">
                      Target: {currentItem.target}
                    </div>
                  </div>

                  {/* Timer Display (if timed or for tracking interval) */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-md">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                        {currentExercise.isTimed ? 'Interval Countdown' : 'Set Pace Timer'}
                      </div>
                      <div className="text-3xl font-black font-mono tracking-tight text-white mt-0.5">
                        {formatTime(timerSecondsLeft)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isTimerRunning ? (
                        <button
                          id="timer-start-btn"
                          onClick={startTimer}
                          className="p-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition shadow-sm"
                          aria-label="Start timer"
                        >
                          <Play className="w-5 h-5 fill-slate-950" />
                        </button>
                      ) : (
                        <button
                          id="timer-pause-btn"
                          onClick={pauseTimer}
                          className="p-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition shadow-sm"
                          aria-label="Pause timer"
                        >
                          <Pause className="w-5 h-5 fill-slate-950" />
                        </button>
                      )}
                      <button
                        id="timer-reset-btn"
                        onClick={resetTimer}
                        className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition"
                        aria-label="Reset timer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Step-by-step Execution Steps */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Instructions
                    </h3>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentExercise.instructions.map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common Mistakes to Avoid */}
                  {currentExercise.commonMistakes.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Watch out for:</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-800 dark:text-amber-200/90">
                        {currentExercise.commonMistakes.map((mistake, mIdx) => (
                          <li key={mIdx}>{mistake}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons: Mark Complete, Skip, Previous */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      id="mark-complete-btn"
                      onClick={handleCompleteCurrentSet}
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {currentSet < currentItem.sets ? t('completeSetAndRest') : t('exerciseFinished')}
                      </span>
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        id="prev-exercise-btn"
                        onClick={handlePreviousExercise}
                        disabled={currentIndex === 0}
                        className="flex-1 sm:flex-none p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        title={t('previous')}
                      >
                        <SkipBack className="w-4 h-4" />
                      </button>

                      <button
                        id="skip-exercise-btn"
                        onClick={handleSkipExercise}
                        className="flex-1 sm:flex-none py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs transition"
                      >
                        {t('skip')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Overview item card component
interface ExerciseOverviewCardProps {
  item: WorkoutExerciseItem;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onReplace: () => void;
  onStartDirect: () => void;
}

const ExerciseOverviewCard: React.FC<ExerciseOverviewCardProps> = ({
  item,
  index,
  isExpanded,
  onToggleExpand,
  onReplace,
  onStartDirect
}) => {
  const { exercise, sets, target } = item;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition overflow-hidden">
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-xs">
            <img
              src={exercise.imageUrl || getExerciseImageUrl(exercise.id, exercise.illustrationType)}
              alt={exercise.name}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/20" />
            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-[10px] font-black text-white leading-none">
              #{index}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{exercise.name}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                {exercise.difficulty.replace('_', ' ')}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {sets} {sets === 1 ? 'set' : 'sets'} × {target}
              </span>
              <span>•</span>
              <span>{exercise.primaryMuscles.join(', ')}</span>
              <span>•</span>
              <span>Rest: {exercise.restSeconds}s</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={onReplace}
            className="p-2 rounded-lg text-slate-500 hover:text-emerald-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1 transition"
            title="Replace with alternative exercise"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Replace</span>
          </button>

          <button
            onClick={onToggleExpand}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs transition"
            aria-label="Toggle details"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <button
            onClick={onStartDirect}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Start</span>
          </button>
        </div>
      </div>

      {/* Expandable Details Drawer */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 text-xs space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Execution Steps:</h4>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {exercise.instructions.map((step, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">Easier Modification:</h4>
                <p className="text-slate-600 dark:text-slate-300">{exercise.easierModification}</p>
              </div>

              {exercise.commonMistakes.length > 0 && (
                <div>
                  <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-0.5">Common Mistakes:</h4>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-0.5">
                    {exercise.commonMistakes.map((m, mIdx) => (
                      <li key={mIdx}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

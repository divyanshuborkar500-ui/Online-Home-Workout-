import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Clock, CheckCircle2, Flame, RotateCcw, ArrowRight, BookmarkCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface WorkoutCompleteProps {
  durationSeconds: number;
  exercisesCompleted: number;
  totalExercises: number;
  currentStreak: number;
  totalWorkouts: number;
  workoutTitle: string;
  onSaveWorkout: () => void;
  onStartAnother: () => void;
  onViewProgress: () => void;
  isSaved?: boolean;
}

export const WorkoutComplete: React.FC<WorkoutCompleteProps> = ({
  durationSeconds,
  exercisesCompleted,
  totalExercises,
  currentStreak,
  totalWorkouts,
  workoutTitle,
  onSaveWorkout,
  onStartAnother,
  onViewProgress,
  isSaved = false
}) => {
  useEffect(() => {
    // Sound chime
    soundManager.playFinishChime();

    // Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  }, []);

  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  const timeFormatted = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  const completionRate = totalExercises > 0 ? Math.round((exercisesCompleted / totalExercises) * 100) : 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 animate-in fade-in duration-300">
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10 text-center">
        {/* Badge / Trophy */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shadow-xs">
          <Trophy className="w-10 h-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          WORKOUT COMPLETE 🎉
        </h1>

        <p className="mt-2 text-base sm:text-lg font-medium text-emerald-600 dark:text-emerald-400">
          {workoutTitle}
        </p>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Every consistent session builds healthy momentum. Great job showing up for your health today.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-center text-emerald-600 mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{timeFormatted}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Workout Time</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-center text-emerald-600 mb-1">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {exercisesCompleted}/{totalExercises}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Exercises</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-center text-amber-500 mb-1">
              <Flame className="w-4 h-4" />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Current Streak</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-center text-blue-500 mb-1">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{totalWorkouts}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Total Finished</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            id="save-workout-btn"
            onClick={onSaveWorkout}
            disabled={isSaved}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition shadow-xs ${
              isSaved
                ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 cursor-default'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{isSaved ? 'Saved to History' : 'Save Workout'}</span>
          </button>

          <button
            id="view-progress-btn"
            onClick={onViewProgress}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 font-bold text-sm transition"
          >
            <span>View Progress</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="start-another-btn"
            onClick={onStartAnother}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-sm transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start Another Workout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Dumbbell,
  Clock,
  Flame,
  Award,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Zap,
  HeartPulse,
  Activity,
  Layers,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';
import {
  FitnessGoal,
  ExperienceLevel,
  WorkoutDuration,
  EquipmentType,
  WorkoutStyle,
  WorkoutPlan
} from '../types';
import { generateWorkoutPlan, generateWeeklySchedule } from '../utils/workoutGenerator';
import { useLanguage } from '../context/LanguageContext';

interface WorkoutGeneratorProps {
  initialGoal?: FitnessGoal;
  initialDuration?: WorkoutDuration;
  initialEquipment?: EquipmentType[];
  onWorkoutGenerated: (plan: WorkoutPlan) => void;
}

export const WorkoutGenerator: React.FC<WorkoutGeneratorProps> = ({
  initialGoal = 'fitness',
  initialDuration = 20,
  initialEquipment = ['none'],
  onWorkoutGenerated
}) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;

  // Form states
  const [goal, setGoal] = useState<FitnessGoal>(initialGoal);
  const [level, setLevel] = useState<ExperienceLevel>('beginner');
  const [duration, setDuration] = useState<WorkoutDuration>(initialDuration);
  const [equipment, setEquipment] = useState<EquipmentType[]>(initialEquipment);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [style, setStyle] = useState<WorkoutStyle>('full_body');

  // Generator UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Validation state
  const [validationError, setValidationError] = useState<string | null>(null);

  // Equipment toggling logic
  const handleToggleEquipment = (eq: EquipmentType) => {
    setValidationError(null);
    if (eq === 'none') {
      setEquipment(['none']);
      return;
    }

    if (eq === 'full_home') {
      setEquipment(['full_home', 'dumbbells', 'bands', 'kettlebell', 'pullup_bar']);
      return;
    }

    // Toggle specific piece
    const withoutNone = equipment.filter((x) => x !== 'none' && x !== 'full_home');
    if (withoutNone.includes(eq)) {
      const updated = withoutNone.filter((x) => x !== eq);
      setEquipment(updated.length === 0 ? ['none'] : updated);
    } else {
      setEquipment([...withoutNone, eq]);
    }
  };

  const handleNext = () => {
    setValidationError(null);

    // Form validation
    if (currentStep === 4 && equipment.length === 0) {
      setValidationError('Please select at least one equipment option (or "No equipment").');
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinalGenerate();
    }
  };

  const handleBack = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinalGenerate = () => {
    setIsGenerating(true);
    setGenerationError(null);

    // Simulate smooth generation calculation with safety timeout
    setTimeout(() => {
      try {
        const plan = generateWorkoutPlan({
          goal,
          level,
          duration,
          equipment,
          daysPerWeek,
          style
        });

        if (!plan || !plan.mainExercises || plan.mainExercises.length === 0) {
          throw new Error('No exercises generated');
        }

        setIsGenerating(false);
        onWorkoutGenerated(plan);
      } catch (err) {
        setIsGenerating(false);
        setGenerationError("We couldn't generate your workout right now. Please try again.");
      }
    }, 450);
  };

  // Preview schedule for chosen days
  const previewSchedule = generateWeeklySchedule(daysPerWeek, style);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Wizard Container */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10">
        {/* Progress Bar & Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Error Notification if generation failed */}
        {generationError && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{generationError}</span>
            </div>
            <button
              onClick={handleFinalGenerate}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Validation Warning */}
        {validationError && (
          <div className="mb-6 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-semibold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* STEP 1: GOAL */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                What is your primary goal?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Select your focus. We tailor movement selection, tempo, and rest periods accordingly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'strength', label: 'Strength', desc: 'Build functional power with fundamental bodyweight mechanics.', icon: Dumbbell },
                { id: 'muscle', label: 'Muscle Building', desc: 'Targeted volume to sculpt and tone muscles at home.', icon: Activity },
                { id: 'fitness', label: 'General Fitness', desc: 'Balanced stamina, energy, and cardiovascular conditioning.', icon: HeartPulse },
                { id: 'fat_loss', label: 'Fat-Loss Support', desc: 'Elevated heart rate circuits to support your active lifestyle.', icon: Flame },
                { id: 'mobility', label: 'Mobility & Posture', desc: 'Gentle joint flow to relieve desk tightness and stiffness.', icon: Sparkles },
                { id: 'full_body', label: 'Full Body Balanced', desc: 'Evenly distribute work across push, pull, legs, and core.', icon: Layers },
                { id: 'quick', label: 'Quick Workout', desc: 'Ultra time-efficient workout for busy schedules.', icon: Zap }
              ].map((item) => {
                const isSelected = goal === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`goal-option-${item.id}`}
                    type="button"
                    onClick={() => {
                      setGoal(item.id as FitnessGoal);
                      setValidationError(null);
                    }}
                    className={`p-4 rounded-2xl border text-left transition flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 dark:border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{item.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              Note: Exercise supports overall physical and mental health. Sustainable body composition changes also involve nutrition, sleep, and consistent daily movement.
            </div>
          </div>
        )}

        {/* STEP 2: EXPERIENCE */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                What's your experience level?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                We ensure exercises match your current joints, mobility, and confidence.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'complete_beginner',
                  label: 'Complete Beginner',
                  desc: 'Never worked out before or returning after years. Safe, low-impact movements with clear posture cues.'
                },
                {
                  id: 'beginner',
                  label: 'Beginner',
                  desc: 'Some light familiarity with pushups or squats. Ready for structured bodyweight circuits.'
                },
                {
                  id: 'intermediate',
                  label: 'Intermediate',
                  desc: 'Exercise regularly. Comfortable with standard pushups, lunges, and moderate pacing.'
                },
                {
                  id: 'advanced',
                  label: 'Advanced',
                  desc: 'High fitness baseline. Looking for higher volume, single-leg stability, and denser work.'
                }
              ].map((item) => {
                const isSelected = level === item.id;
                return (
                  <button
                    key={item.id}
                    id={`level-option-${item.id}`}
                    type="button"
                    onClick={() => {
                      setLevel(item.id as ExperienceLevel);
                      setValidationError(null);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 dark:border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{item.label}</span>
                        {item.id === 'complete_beginner' && (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                            Recommended for first-timers
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                      isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 dark:border-slate-700'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: AVAILABLE TIME */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                How much time do you have?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                A 15-minute workout you complete consistently beats a 60-minute workout you skip.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { time: 10, label: '10 Minutes', desc: '3 focused exercises' },
                { time: 15, label: '15 Minutes', desc: '4 exercises + warmup' },
                { time: 20, label: '20 Minutes', desc: '5 balanced exercises' },
                { time: 30, label: '30 Minutes', desc: 'Comprehensive full session' },
                { time: 45, label: '45 Minutes', desc: 'Extended strength & core' },
                { time: 60, label: '60 Minutes', desc: 'High-volume full workout' }
              ].map((item) => {
                const isSelected = duration === item.time;
                return (
                  <button
                    key={item.time}
                    id={`time-option-${item.time}`}
                    type="button"
                    onClick={() => {
                      setDuration(item.time as WorkoutDuration);
                      setValidationError(null);
                    }}
                    className={`p-4 rounded-2xl border text-left transition ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 dark:border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Clock className={`w-5 h-5 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    </div>
                    <div className="font-extrabold text-base text-slate-900 dark:text-white">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: EQUIPMENT */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                What equipment do you have?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Select all that apply. If you have nothing, choose <strong>No equipment</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'none', label: 'No equipment (Bodyweight only)', desc: 'Zero gear required. Your body and a bit of floor space.' },
                { id: 'dumbbells', label: 'Dumbbells', desc: 'Any light, moderate, or adjustable home dumbbells.' },
                { id: 'bands', label: 'Resistance Bands', desc: 'Loop bands or tube bands with handles.' },
                { id: 'pullup_bar', label: 'Pull-up Bar', desc: 'Doorway or wall mounted chin-up bar.' },
                { id: 'kettlebell', label: 'Kettlebell', desc: 'For swings, goblet squats, and carries.' },
                { id: 'full_home', label: 'Full Home Equipment', desc: 'Mix of dumbbells, bands, and pull-up station.' }
              ].map((item) => {
                const isSelected = equipment.includes(item.id as EquipmentType);
                return (
                  <button
                    key={item.id}
                    id={`equip-option-${item.id}`}
                    type="button"
                    onClick={() => handleToggleEquipment(item.id as EquipmentType)}
                    className={`p-4 rounded-2xl border text-left transition flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 dark:border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{item.label}</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {item.desc}
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 dark:border-slate-700'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: DAYS PER WEEK & REST DAYS */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                How many days can you work out?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Rest days are non-negotiable for tendon and muscular recovery.
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[2, 3, 4, 5, 6, 7].map((num) => {
                const isSelected = daysPerWeek === num;
                return (
                  <button
                    key={num}
                    id={`days-option-${num}`}
                    type="button"
                    onClick={() => {
                      setDaysPerWeek(num);
                      setValidationError(null);
                    }}
                    className={`p-3.5 rounded-2xl border text-center transition ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-black ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 font-bold'
                    }`}
                  >
                    <div className="text-xl">{num}</div>
                    <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">
                      {num === 1 ? 'day' : 'days'}/wk
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Intelligent Weekly Schedule with Rest Days Preview */}
            <div className="mt-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Recommended Weekly Flow ({daysPerWeek} Active Days)
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {7 - daysPerWeek} Rest / Recovery {7 - daysPerWeek === 1 ? 'Day' : 'Days'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {previewSchedule.map((d) => (
                  <div
                    key={d.dayShort}
                    className={`p-2.5 rounded-xl border text-center text-xs ${
                      d.type === 'workout'
                        ? 'bg-white dark:bg-slate-800 border-emerald-300 dark:border-emerald-700/60'
                        : d.type === 'active_recovery'
                        ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/40'
                        : 'bg-slate-100/70 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-slate-900 dark:text-white">{d.dayShort}</div>
                    <div className={`text-[11px] font-semibold mt-1 ${
                      d.type === 'workout'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : d.type === 'active_recovery'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {d.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: WORKOUT STYLE */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Preferred workout style
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Choose the split or emphasis for your routine today.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'full_body', label: 'Full Body', desc: 'Balanced stimulation across all major muscle groups.' },
                { id: 'upper_body', label: 'Upper Body', desc: 'Push and pull movements targeting chest, back, shoulders, arms.' },
                { id: 'lower_body', label: 'Lower Body & Glutes', desc: 'Quadriceps, hamstrings, calves, and hips.' },
                { id: 'core', label: 'Core & Stability', desc: 'Deep abdominals, obliques, and lower-back health.' },
                { id: 'cardio', label: 'Cardio Intervals', desc: 'Rhythmic living-room conditioning to boost heart rate.' },
                { id: 'mixed', label: 'Mixed Conditioning', desc: 'A fusion of strength pauses and cardio energy.' }
              ].map((item) => {
                const isSelected = style === item.id;
                return (
                  <button
                    key={item.id}
                    id={`style-option-${item.id}`}
                    type="button"
                    onClick={() => {
                      setStyle(item.id as WorkoutStyle);
                      setValidationError(null);
                    }}
                    className={`p-4 rounded-2xl border text-left transition flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 dark:border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                        {item.desc}
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 dark:border-slate-700'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <button
            id="generator-back-btn"
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1 || isGenerating}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-semibold transition ${
              currentStep === 1 ? 'invisible' : ''
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('back')}</span>
          </button>

          <button
            id="generator-next-btn"
            type="button"
            onClick={handleNext}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition transform active:scale-98"
          >
            {isGenerating ? (
              <span>{t('generating')}</span>
            ) : currentStep === totalSteps ? (
              <>
                <span>{t('generateWorkout')}</span>
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>{t('continue')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

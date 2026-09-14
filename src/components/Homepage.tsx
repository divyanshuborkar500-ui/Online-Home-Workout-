import React, { useState } from 'react';
import {
  Play,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Dumbbell,
  Sparkles,
  HeartPulse,
  Flame,
  Activity,
  Layers,
  Zap,
  Home,
  Footprints,
  Compass,
  Smile,
  RefreshCw,
  Globe
} from 'lucide-react';
import { FitnessGoal, ExperienceLevel, WorkoutDuration, EquipmentType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HomepageProps {
  onStartGenerator: (presets?: {
    goal?: FitnessGoal;
    level?: ExperienceLevel;
    duration?: WorkoutDuration;
    equipment?: EquipmentType[];
  }) => void;
  onBrowseExercises: () => void;
  onOpenQuickModal: () => void;
}

export const Homepage: React.FC<HomepageProps> = ({
  onStartGenerator,
  onBrowseExercises,
  onOpenQuickModal
}) => {
  const { t } = useLanguage();
  // Quick Workout Finder interactive state in Section 5
  const [finderDuration, setFinderDuration] = useState<WorkoutDuration>(15);
  const [finderLevel, setFinderLevel] = useState<ExperienceLevel>('beginner');
  const [finderGoal, setFinderGoal] = useState<FitnessGoal>('fitness');

  const handleFinderGenerate = () => {
    onStartGenerator({
      duration: finderDuration,
      level: finderLevel,
      goal: finderGoal,
      equipment: ['none']
    });
  };

  return (
    <div className="space-y-12 sm:space-y-20 md:space-y-24 pb-16 animate-in fade-in overflow-x-hidden w-full max-w-full">
      {/* SECTION 2: HERO SECTION */}
      <section className="relative overflow-hidden pt-6 sm:pt-14 pb-10 sm:pb-20 border-b border-slate-200/80 dark:border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-3.5 sm:px-6 text-center relative z-10">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-6 max-w-full text-center">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Interactive Home Workout Platform • Zero Membership Required</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.1] break-words">
            {t('heroTitle1')} <br className="hidden sm:inline" />
            {t('heroTitle2')} <br className="hidden sm:inline" />
            <span className="text-emerald-600 dark:text-emerald-400">{t('heroHighlight')}</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="hero-primary-cta"
              onClick={() => onStartGenerator()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition transform active:scale-98"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{t('startMyWorkout')}</span>
            </button>

            <button
              id="hero-secondary-cta"
              onClick={onBrowseExercises}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs transition"
            >
              <Compass className="w-5 h-5 text-slate-500" />
              <span>{t('exploreExercises')}</span>
            </button>
          </div>

          {/* Value Highlights */}
          <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-left">
            {[
              { title: 'No gym required', desc: '100% home calibrated' },
              { title: 'Beginner-friendly', desc: 'Form cues & modifications' },
              { title: '10 to 30 min options', desc: 'Built for busy lives' },
              { title: 'Zero equipment needed', desc: 'True bodyweight workouts' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xs min-w-0"
              >
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 mb-1 min-w-0">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                    {item.title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-5 leading-snug">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2.5: PROMINENT BEGINNER ONBOARDING CARD */}
      <section className="max-w-6xl mx-auto px-3.5 sm:px-6">
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border-2 border-emerald-500/30 dark:border-emerald-500/20 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Smile className="w-3.5 h-3.5" />
              <span>{t('beginnerBadge')}</span>
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 dark:text-white tracking-tight break-words">
              {t('beginnerHeadline')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('beginnerSubtitle')}
            </p>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                {t('beginnerBullet1')}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                {t('beginnerBullet2')}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                {t('beginnerBullet3')}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                {t('beginnerBullet4')}
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              id="start-beginner-workout-btn"
              onClick={() => onStartGenerator({ level: 'complete_beginner', duration: 15, equipment: ['none'], goal: 'fitness' })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md transition active:scale-98"
            >
              <span>{t('startBeginnerWorkout')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: CHOOSE YOUR GOAL */}
      <section className="max-w-6xl mx-auto px-3.5 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('chooseGoalTitle')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {t('chooseGoalSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {[
            {
              goal: 'strength' as FitnessGoal,
              title: 'Build Strength',
              desc: 'Master pushups, squats, and body tension to build dependable real-world power.',
              icon: Dumbbell,
              accent: 'emerald'
            },
            {
              goal: 'fat_loss' as FitnessGoal,
              title: 'Fat Loss Support',
              desc: 'Continuous movement circuits and cardio intervals to support an active metabolism.',
              icon: Flame,
              accent: 'amber'
            },
            {
              goal: 'fitness' as FitnessGoal,
              title: 'Improve General Fitness',
              desc: 'Energizing full-body conditioning for daily vitality, stamina, and heart health.',
              icon: HeartPulse,
              accent: 'blue'
            },
            {
              goal: 'muscle' as FitnessGoal,
              title: 'Gain Muscle & Tone',
              desc: 'Time under tension and targeted hypertrophy sets for arms, chest, back, and legs.',
              icon: Activity,
              accent: 'indigo'
            },
            {
              goal: 'mobility' as FitnessGoal,
              title: 'Mobility & Flexibility',
              desc: 'Gentle spinal decompression, hip openers, and posture restoration for stiff days.',
              icon: Sparkles,
              accent: 'teal'
            },
            {
              goal: 'quick' as FitnessGoal,
              title: 'Quick Workout (<15 Mins)',
              desc: 'Short on time? Get an express high-yield routine that fits between meetings.',
              icon: Zap,
              accent: 'rose'
            }
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.goal}
                onClick={() => onStartGenerator({ goal: card.goal })}
                className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200 group-hover:bg-emerald-600 group-hover:text-white transition mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 sm:mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span>Start This Goal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: WORK OUT WITH NO EQUIPMENT */}
      <section className="max-w-6xl mx-auto px-3.5 sm:px-6 space-y-6">
        <div className="rounded-2xl sm:rounded-3xl bg-slate-900 text-white p-5 sm:p-8 md:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 inline-block">
                True Calisthenics & Bodyweight
              </span>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white break-words">
                {t('noEquipmentTitle')}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t('noEquipmentSubtitle')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { title: 'Space-Saving Movements', desc: 'Fits easily in a bedroom or apartment living room.' },
                  { title: 'Safe for Beginners', desc: 'Natural movement paths minimize joint strain.' },
                  { title: 'Zero Clutter', desc: 'No bulky machines taking over your living space.' },
                  { title: 'Quiet & Neighbor Friendly', desc: 'No heavy iron plates clanking on floorboards.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-white">{item.title}</div>
                      <div className="text-[11px] text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 sm:pt-4">
                <button
                  id="no-equipment-start-btn"
                  onClick={() => onStartGenerator({ equipment: ['none'] })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-md transition active:scale-98"
                >
                  <span>{t('buildNoEquipmentRoutine')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Callout */}
            <div className="lg:col-span-5 p-4 sm:p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Home className="w-4 h-4" />
                <span>The Home Advantage</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The biggest obstacle to working out is friction: driving to the gym, packing bags, waiting for equipment. By training in your living room in whatever comfortable clothes you have, you eliminate 90% of excuses.
              </p>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-400 font-mono break-words">
                Consistency = Workout frequency × Low friction
              </div>
            </div>
          </div>
        </div>

        {/* 5 Quick-Select Duration Cards for No Equipment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            {
              duration: 5 as WorkoutDuration,
              title: '5-minute wake-up mobility',
              sub: 'Joint circles & spinal wake-up',
              goal: 'mobility' as FitnessGoal,
              level: 'complete_beginner' as ExperienceLevel
            },
            {
              duration: 10 as WorkoutDuration,
              title: '10-minute beginner bodyweight',
              sub: 'Paced foundation movements',
              goal: 'fitness' as FitnessGoal,
              level: 'complete_beginner' as ExperienceLevel
            },
            {
              duration: 15 as WorkoutDuration,
              title: '15-minute low-impact cardio',
              sub: 'Heart rate up, zero jumping',
              goal: 'fat_loss' as FitnessGoal,
              level: 'beginner' as ExperienceLevel
            },
            {
              duration: 20 as WorkoutDuration,
              title: '20-minute full-body strength',
              sub: 'Calisthenics strength circuits',
              goal: 'strength' as FitnessGoal,
              level: 'beginner' as ExperienceLevel
            },
            {
              duration: 30 as WorkoutDuration,
              title: '30-minute fat-burning circuit',
              sub: 'High energy full body burn',
              goal: 'fat_loss' as FitnessGoal,
              level: 'intermediate' as ExperienceLevel
            }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => onStartGenerator({
                duration: item.duration,
                goal: item.goal,
                level: item.level,
                equipment: ['none']
              })}
              className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-xs hover:shadow-md transition text-left flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
                    {item.duration} MIN
                  </span>
                  <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white capitalize group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {item.sub}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                <span>Start Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 5: QUICK WORKOUT FINDER */}
      <section className="max-w-4xl mx-auto px-3.5 sm:px-6">
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 md:p-10 shadow-lg space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Quick Workout Finder
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select your available time and current level for an instant match.
            </p>
          </div>

          {/* Time buttons */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Available Time
            </label>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {[5, 10, 15, 20, 30].map((t) => (
                <button
                  key={t}
                  id={`finder-time-${t}`}
                  onClick={() => setFinderDuration(t as WorkoutDuration)}
                  className={`py-2 sm:py-2.5 px-0.5 sm:px-2 rounded-xl border text-center font-bold text-xs sm:text-sm transition ${
                    finderDuration === t
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {t} <span className="hidden xs:inline">Mins</span><span className="xs:hidden">m</span>
                </button>
              ))}
            </div>
          </div>

          {/* Level buttons */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Experience Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'beginner' as ExperienceLevel, label: 'Beginner', sub: 'Gentle on joints' },
                { id: 'intermediate' as ExperienceLevel, label: 'Intermediate', sub: 'Standard circuits' },
                { id: 'advanced' as ExperienceLevel, label: 'Advanced', sub: 'High density' }
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  id={`finder-level-${lvl.id}`}
                  onClick={() => setFinderLevel(lvl.id)}
                  className={`p-3 rounded-xl border text-left transition ${
                    finderLevel === lvl.id
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm">{lvl.label}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{lvl.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Launch Button */}
          <button
            id="finder-generate-btn"
            onClick={handleFinderGenerate}
            className="w-full py-3.5 sm:py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-base shadow-md transition flex items-center justify-center gap-2 active:scale-98 text-center"
          >
            <Play className="w-4 h-4 fill-white shrink-0" />
            <span className="break-words">Generate {finderDuration}-Min {finderLevel} Workout</span>
          </button>
        </div>
      </section>

      {/* SECTION 6: HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-3.5 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            No algorithms pushing paid supplements. Just clear, logical physical preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              step: '01',
              title: 'Tell Us Your Needs',
              desc: 'Select your focus, available minutes, and what gear you have (or zero gear).'
            },
            {
              step: '02',
              title: 'Receive Custom Plan',
              desc: 'Get an organized workout balanced with dynamic warmups, main lifts, and cool-downs.'
            },
            {
              step: '03',
              title: 'Follow Along Guided',
              desc: 'Use the interactive timer, audio cues, rest countdowns, and instant exercise substitutions.'
            },
            {
              step: '04',
              title: 'Track Habits & Streaks',
              desc: 'Monitor weekly sessions and celebrate small daily victories stored privately on your device.'
            }
          ].map((s, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-600/30 dark:text-emerald-400/20 block mb-1.5 sm:mb-2">
                  {s.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{s.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: BEGINNER FRIENDLY ASSURANCE */}
      <section className="max-w-6xl mx-auto px-3.5 sm:px-6">
        <div className="rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8 sm:mb-10">
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider inline-block">
              Beginner Friendly Promise
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Exercise Shouldn't Be Intimidating
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              If you haven't worked out in months (or ever), that is completely okay. Online Home Workout was engineered specifically to meet you wherever you are today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <RefreshCw className="w-6 h-6 text-emerald-600 mb-2 sm:mb-3" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Smart Modifications</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Can't do a full pushup? Switch instantly to wall pushups or knee variations with one tap.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <Footprints className="w-6 h-6 text-blue-500 mb-2 sm:mb-3" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Joint-Friendly Alternatives</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Low-impact movements that protect sensitive knees, hips, and lower backs.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <Smile className="w-6 h-6 text-amber-500 mb-2 sm:mb-3" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Zero Gym Jargon</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Clear, human instructions explaining where you should feel each movement.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <Clock className="w-6 h-6 text-purple-500 mb-2 sm:mb-3" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Self-Paced Timers</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Pause whenever you need water. Add extra rest seconds anytime with zero penalty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: CALL TO ACTION BANNER */}
      <section className="max-w-5xl mx-auto px-3.5 sm:px-6">
        <div className="rounded-2xl sm:rounded-3xl bg-emerald-600 text-white p-6 sm:p-10 md:p-12 text-center relative overflow-hidden shadow-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white break-words">
            Start your first home workout today.
          </h2>
          <p className="mt-2 text-emerald-100 text-sm sm:text-base max-w-xl mx-auto">
            No signup. No credit card. Just a tailored workout in under 10 seconds.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="cta-banner-generate-btn"
              onClick={() => onStartGenerator()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white text-slate-950 font-black text-sm sm:text-base shadow-lg hover:bg-emerald-50 transition active:scale-98"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>Create My Workout</span>
            </button>

            <button
              id="cta-banner-quick-btn"
              onClick={onOpenQuickModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-2xl bg-emerald-700/80 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base transition border border-emerald-500/50"
            >
              <Zap className="w-5 h-5" />
              <span>Express 10-Min Session</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

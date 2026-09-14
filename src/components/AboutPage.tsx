import React from 'react';
import { ShieldCheck, Heart, Sparkles, CheckCircle2, Home, Footprints, Clock, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onStartWorkout: () => void;
  onOpenLegal: (modal: 'privacy' | 'terms' | 'disclaimer') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onStartWorkout, onOpenLegal }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-in fade-in">
      {/* Header */}
      <div className="space-y-3">
        <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider inline-block">
          Our Philosophy & Method
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Fitness Built for Real Living Rooms
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Online Home Workout was created on a simple premise: exercise does not require expensive gym memberships, loud locker rooms, or complicated machinery to transform your physical resilience.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-black">
            1
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Consistency Beats Intensity</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            An agonizing 90-minute workout once a month accomplishes virtually nothing. But a simple 15-to-20-minute movement routine completed three days a week will fundamentally transform your cardiovascular stamina, posture, and muscular endurance.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-black">
            2
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">No False Claims or Guarantees</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            We will never promise "30-day six-packs" or claim that exercise cures chronic conditions. Sustainable health is a long-term practice grounded in smart mechanics, proper rest days, and honest effort.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-black">
            3
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Form Precedes Volume</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Five clean, controlled pushups performed with full range and aligned spine do infinitely more for your physique than twenty rushed, sloppy reps that strain your lower back.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-black">
            4
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Zero Account Walls</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            You shouldn't have to fill out passwords, confirm email links, or submit credit card numbers just to get a workout. All your stats and history live directly in your browser's private local storage.
          </p>
        </div>
      </div>

      {/* Equipment Guide */}
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recommended Minimalist Home Setup</h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          While bodyweight is 100% sufficient, if you ever wish to expand your home training space, here are our recommended high-yield investments:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Yoga / Fitness Mat:</strong> Cushions wrists, elbows, and knees on hard floors.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Adjustable Resistance Bands:</strong> Light, ultra portable, and safe for joint-friendly pulls.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Light Dumbbells (5–15 lbs):</strong> Excellent for overhead presses, rows, and loaded carries.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Doorway Pull-up Bar:</strong> The gold standard for upper body pulling strength.</span>
          </li>
        </ul>
      </div>

      {/* Safety Callout */}
      <div className="p-6 rounded-3xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span>Safety Notice & Medical Responsibility</span>
        </div>
        <p className="leading-relaxed">
          Online Home Workout provides general physical fitness templates and instructions. If you have a prior injury, heart condition, or are returning to exercise after surgery or pregnancy, please speak with your physician first.
        </p>
        <button
          onClick={() => onOpenLegal('disclaimer')}
          className="text-amber-800 dark:text-amber-300 underline font-semibold inline-block pt-1"
        >
          Read full medical and safety disclaimer →
        </button>
      </div>

      {/* Action */}
      <div className="text-center pt-4">
        <button
          onClick={onStartWorkout}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition"
        >
          <span>Ready to Train? Generate My Workout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

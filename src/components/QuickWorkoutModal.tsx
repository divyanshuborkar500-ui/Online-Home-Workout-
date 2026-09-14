import React, { useState } from 'react';
import { X, Zap, Clock, Dumbbell, Play } from 'lucide-react';
import { WorkoutDuration, EquipmentType, WorkoutPlan } from '../types';
import { generateWorkoutPlan } from '../utils/workoutGenerator';

interface QuickWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchWorkout: (plan: WorkoutPlan) => void;
}

export const QuickWorkoutModal: React.FC<QuickWorkoutModalProps> = ({
  isOpen,
  onClose,
  onLaunchWorkout
}) => {
  if (!isOpen) return null;

  const [quickDuration, setQuickDuration] = useState<WorkoutDuration>(10);
  const [equipmentMode, setEquipmentMode] = useState<'none' | 'dumbbells'>('none');

  const handleLaunch = () => {
    const plan = generateWorkoutPlan({
      goal: 'quick',
      level: 'beginner',
      duration: quickDuration,
      equipment: equipmentMode === 'none' ? ['none'] : ['dumbbells'],
      daysPerWeek: 3,
      style: 'full_body'
    });

    onClose();
    onLaunchWorkout(plan);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
            <Zap className="w-5 h-5" />
            <span className="text-slate-900 dark:text-white font-extrabold text-base">Quick Home Workout</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select Express Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 15].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setQuickDuration(mins as WorkoutDuration)}
                  className={`py-3 px-2 rounded-2xl border text-center font-bold text-sm transition ${
                    quickDuration === mins
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="text-base font-black">{mins} Min</div>
                  <div className="text-[10px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">
                    {mins === 5 ? 'Express Reset' : mins === 10 ? 'High Energy' : 'Full Circuit'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Equipment
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setEquipmentMode('none')}
                className={`p-3 rounded-2xl border text-left text-xs transition ${
                  equipmentMode === 'none'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">No Equipment</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Pure bodyweight</div>
              </button>

              <button
                type="button"
                onClick={() => setEquipmentMode('dumbbells')}
                className={`p-3 rounded-2xl border text-left text-xs transition ${
                  equipmentMode === 'dumbbells'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">Dumbbells</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Added resistance</div>
              </button>
            </div>
          </div>
        </div>

        <button
          id="launch-quick-workout-btn"
          onClick={handleLaunch}
          className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start {quickDuration}-Minute Workout</span>
        </button>
      </div>
    </div>
  );
};

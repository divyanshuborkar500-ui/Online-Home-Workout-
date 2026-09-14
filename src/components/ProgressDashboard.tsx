import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Trash2,
  Share2,
  Layers
} from 'lucide-react';
import { CompletedWorkoutRecord } from '../types';
import { calculateProgressStats } from '../utils/storage';

interface ProgressDashboardProps {
  history: CompletedWorkoutRecord[];
  onStartNewWorkout: () => void;
  onClearHistory: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  history,
  onStartNewWorkout,
  onClearHistory
}) => {
  const stats = calculateProgressStats(history);
  const [filterGoal, setFilterGoal] = useState<string>('all');

  // Last 7 days chart calculation
  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const last7Days = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - idx));
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dayLabel = dayNames[d.getDay()];

    const matchingWorkouts = history.filter((h) => {
      const hDate = new Date(h.completedAt);
      const hStr = `${hDate.getFullYear()}-${String(hDate.getMonth() + 1).padStart(2, '0')}-${String(hDate.getDate()).padStart(2, '0')}`;
      return hStr === dateStr;
    });

    const totalMin = matchingWorkouts.reduce((sum, item) => sum + (item.durationMinutes || 0), 0);

    return {
      dateStr,
      dayLabel,
      isToday: idx === 6,
      count: matchingWorkouts.length,
      minutes: totalMin
    };
  });

  const maxMinutesInDay = Math.max(...last7Days.map((d) => d.minutes), 30);

  const filteredHistory = filterGoal === 'all'
    ? history
    : history.filter((h) => h.goal === filterGoal);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Progress & Consistency
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real fitness is built on small, regular habits. Private to this device.
          </p>
        </div>

        <button
          id="progress-start-workout-btn"
          onClick={onStartNewWorkout}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition active:scale-98 self-start sm:self-auto"
        >
          <span>Start Next Workout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6-Stat Bento Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Workouts</span>
            <Trophy className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats.totalWorkouts}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            Sessions done
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">This Week</span>
            <Calendar className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats.weeklyWorkouts}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            Past 7 days
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Current Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats.currentStreak} <span className="text-xs font-medium text-slate-400">days</span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            Daily habit
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Longest Streak</span>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats.longestStreak} <span className="text-xs font-medium text-slate-400">days</span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            Personal best
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Minutes</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats.totalMinutes} <span className="text-xs font-medium text-slate-400">min</span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            Active time
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Completion Rate</span>
            <CheckCircle2 className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats.completionRate}%
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            Success rate
          </div>
        </div>
      </div>

      {/* Weekly Activity Heatmap/Bar Visualization */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Past 7 Days Activity</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Active days highlighted in emerald. Active recovery and rest days are equally valued!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-40 pt-4">
          {last7Days.map((day) => {
            const heightPercent = day.minutes > 0 ? Math.max(25, (day.minutes / maxMinutesInDay) * 100) : 8;
            return (
              <div key={day.dateStr} className="flex flex-col items-center gap-2 h-full justify-end">
                <div className="text-[10px] sm:text-xs font-semibold text-slate-400">
                  {day.minutes > 0 ? `${day.minutes}m` : 'Rest'}
                </div>
                <div className="w-full max-w-[40px] h-28 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-end p-1 overflow-hidden">
                  <div
                    className={`w-full rounded-lg transition-all duration-500 ${
                      day.minutes > 0
                        ? 'bg-emerald-500 shadow-xs'
                        : 'bg-transparent'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <div className={`text-xs font-bold ${day.isToday ? 'text-emerald-600 dark:text-emerald-400 underline underline-offset-4' : 'text-slate-500 dark:text-slate-400'}`}>
                  {day.dayLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Workouts History */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Workout History</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Every completed routine saved locally to your device.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterGoal}
              onChange={(e) => setFilterGoal(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Goals</option>
              <option value="fitness">Fitness</option>
              <option value="strength">Strength</option>
              <option value="mobility">Mobility</option>
              <option value="fat_loss">Fat-loss Support</option>
            </select>

            {history.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Reset workout history on this device?')) {
                    onClearHistory();
                  }
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition"
                title="Clear local history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {history.length === 0 ? (
          <div className="py-12 text-center text-slate-400 dark:text-slate-500">
            <Trophy className="w-10 h-10 mx-auto mb-2 opacity-40 text-emerald-500" />
            <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
              Complete your first workout to start tracking your progress.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Your workouts, streaks, and minutes will be saved privately on your device.
            </p>
            <button
              onClick={onStartNewWorkout}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition active:scale-98"
            >
              <span>Start My Workout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="py-10 text-center text-slate-400 dark:text-slate-500">
            <p className="text-sm font-medium">No completed workouts matching this filter.</p>
            <button
              onClick={() => setFilterGoal('all')}
              className="mt-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline"
            >
              View all completed workouts
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredHistory.map((rec) => {
              const date = new Date(rec.completedAt);
              const formattedDate = date.toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
              const formattedTime = date.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={rec.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 px-2 rounded-xl transition"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200/50 dark:border-emerald-800/50">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {rec.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span>{formattedDate} at {formattedTime}</span>
                        <span>•</span>
                        <span>{rec.durationMinutes} minutes</span>
                        <span>•</span>
                        <span>{rec.exercisesCount} exercises</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-semibold capitalize">
                      {rec.goal.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

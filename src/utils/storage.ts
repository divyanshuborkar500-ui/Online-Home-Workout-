import { CompletedWorkoutRecord, UserPreferences, WorkoutPlan } from '../types';

const STORAGE_KEYS = {
  PREFERENCES: 'ohw_preferences',
  HISTORY: 'ohw_history',
  SAVED_PLANS: 'ohw_saved_plans',
  ACTIVE_PLAN: 'ohw_active_plan',
  FAVORITES: 'ohw_favorite_exercises'
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  name: 'Home Athlete',
  primaryGoal: 'fitness',
  level: 'beginner',
  availableEquipment: ['none'],
  preferredDuration: 20,
  workoutDaysPerWeek: 3,
  soundEnabled: true
};

export function getStoredPreferences(): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!raw) return DEFAULT_PREFERENCES;
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function saveStoredPreferences(prefs: UserPreferences): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
  } catch (e) {
    console.warn('Could not save preferences to localStorage', e);
  }
}

export function getWorkoutHistory(): CompletedWorkoutRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCompletedWorkout(record: Omit<CompletedWorkoutRecord, 'id' | 'completedAt'>): CompletedWorkoutRecord {
  const current = getWorkoutHistory();
  const newRecord: CompletedWorkoutRecord = {
    ...record,
    id: `comp-${Date.now()}`,
    completedAt: new Date().toISOString()
  };

  const updated = [newRecord, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to persist workout record', e);
  }

  return newRecord;
}

export function getSavedWorkoutPlans(): WorkoutPlan[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_PLANS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveWorkoutPlanToStorage(plan: WorkoutPlan): void {
  const current = getSavedWorkoutPlans();
  const filtered = current.filter((p) => p.id !== plan.id);
  const updated = [plan, ...filtered];
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_PLANS, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save plan', e);
  }
}

export function saveActiveSession(plan: WorkoutPlan | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (!plan) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_PLAN);
    } else {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PLAN, JSON.stringify(plan));
    }
  } catch (e) {
    console.warn('Failed to save active session', e);
  }
}

export function getActiveSession(): WorkoutPlan | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_PLAN);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getFavoriteExercises(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteExercise(id: string): string[] {
  const current = getFavoriteExercises();
  const exists = current.includes(id);
  const updated = exists ? current.filter((x) => x !== id) : [...current, id];
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to toggle favorite', e);
  }
  return updated;
}

export function clearAllAppData(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
    localStorage.removeItem(STORAGE_KEYS.SAVED_PLANS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_PLAN);
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem('ohw_current_active_plan');
  } catch (e) {
    console.warn('Failed to clear app data', e);
  }
}

// Calculate streaks & statistics reliably
export function calculateProgressStats(history: CompletedWorkoutRecord[]) {
  const totalWorkouts = history.length;
  const totalMinutes = history.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0);

  if (history.length === 0) {
    return {
      totalWorkouts: 0,
      totalMinutes: 0,
      currentStreak: 0,
      longestStreak: 0,
      weeklyWorkouts: 0,
      completionRate: 0
    };
  }

  // Workouts in the last 7 days
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const weeklyWorkouts = history.filter((h) => new Date(h.completedAt) >= sevenDaysAgo).length;

  // Streak calculation based on calendar days
  const uniqueWorkoutDays = Array.from(
    new Set(
      history.map((h) => {
        const d = new Date(h.completedAt);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      })
    )
  ).sort().reverse(); // descending

  let currentStreak = 0;
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  // If worked out today or yesterday, streak is alive
  if (uniqueWorkoutDays.length > 0) {
    const firstDay = uniqueWorkoutDays[0];
    if (firstDay === todayStr || firstDay === yesterdayStr) {
      currentStreak = 1;
      let checkDate = new Date(firstDay);

      for (let i = 1; i < uniqueWorkoutDays.length; i++) {
        checkDate.setDate(checkDate.getDate() - 1);
        const expected = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
        if (uniqueWorkoutDays[i] === expected) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
  }

  // Longest streak calculation
  let longestStreak = currentStreak;
  if (uniqueWorkoutDays.length > 0) {
    const sortedAsc = [...uniqueWorkoutDays].sort();
    let tempStreak = 1;
    for (let i = 1; i < sortedAsc.length; i++) {
      const prevDate = new Date(sortedAsc[i - 1]);
      const currDate = new Date(sortedAsc[i]);
      const diffTime = currDate.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

      if (diffDays === 1) {
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    }
  }

  return {
    totalWorkouts,
    totalMinutes,
    currentStreak,
    longestStreak,
    weeklyWorkouts,
    completionRate: 100
  };
}

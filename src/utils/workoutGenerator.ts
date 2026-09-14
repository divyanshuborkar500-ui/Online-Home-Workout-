import {
  Exercise,
  ExperienceLevel,
  EquipmentType,
  FitnessGoal,
  WorkoutDuration,
  WorkoutPlan,
  WorkoutStyle,
  WorkoutExerciseItem,
  DaySchedule
} from '../types';
import { EXERCISES } from '../data/exercises';

interface GeneratorInput {
  goal: FitnessGoal;
  level: ExperienceLevel;
  duration: WorkoutDuration;
  equipment: EquipmentType[];
  daysPerWeek: number;
  style: WorkoutStyle;
}

// Check if exercise matches equipment restrictions
export function matchesEquipment(exercise: Exercise, userEquipment: EquipmentType[]): boolean {
  // If user only has 'none', exercise must require 'none'
  const hasOnlyNone = userEquipment.length === 1 && userEquipment[0] === 'none';
  if (hasOnlyNone) {
    return exercise.equipment.includes('none');
  }

  // If user has equipment (e.g. dumbbells), any bodyweight ('none') or matching item is allowed
  return exercise.equipment.some((eq) => eq === 'none' || userEquipment.includes(eq));
}

// Check if exercise matches difficulty
export function matchesDifficulty(exercise: Exercise, userLevel: ExperienceLevel): boolean {
  const ranks: Record<ExperienceLevel, number> = {
    complete_beginner: 1,
    beginner: 2,
    intermediate: 3,
    advanced: 4
  };

  const userRank = ranks[userLevel];
  const exRank = ranks[exercise.difficulty];

  // Users can do exercises at or below their level
  return exRank <= userRank;
}

export function generateWorkoutPlan(input: GeneratorInput): WorkoutPlan {
  const { goal, level, duration, equipment, style } = input;

  // Filter pool based on equipment and difficulty
  const eligibleExercises = EXERCISES.filter(
    (ex) => matchesEquipment(ex, equipment) && matchesDifficulty(ex, level)
  );

  // Fallback to all bodyweight beginner exercises if pool is somehow constrained
  const safePool =
    eligibleExercises.length >= 4
      ? eligibleExercises
      : EXERCISES.filter((ex) => ex.equipment.includes('none'));

  // Target count of main exercises based on duration
  let mainCount = 4;
  if (duration <= 5) mainCount = 2;
  else if (duration <= 10) mainCount = 3;
  else if (duration <= 15) mainCount = 4;
  else if (duration <= 20) mainCount = 5;
  else if (duration <= 30) mainCount = 6;
  else if (duration <= 45) mainCount = 8;
  else mainCount = 10;

  // Style-specific filtering preference
  const styleMatched = safePool.filter((ex) => {
    if (style === 'full_body' || style === 'mixed') return true;
    if (style === 'upper_body') return ex.category === 'upper_body';
    if (style === 'lower_body') return ex.category === 'lower_body';
    if (style === 'core') return ex.category === 'core';
    if (style === 'cardio') return ex.category === 'cardio';
    if (style === 'mobility') return ex.category === 'mobility';
    return true;
  });

  const workingCandidates = styleMatched.length >= mainCount ? styleMatched : safePool;

  // Filter warmups & cooldowns
  const warmupPool = EXERCISES.filter(
    (ex) => ex.category === 'mobility' || ex.id === 'jumping-jacks' || ex.id === 'high-knees-march'
  );
  const cooldownPool = EXERCISES.filter(
    (ex) => ex.id === 'childs-pose' || ex.id === 'hamstring-stretch' || ex.category === 'mobility'
  );

  // Select warmups (1 for <=15 min, 2 for longer)
  const warmupCount = duration <= 10 ? 1 : 2;
  const selectedWarmups = warmupPool.slice(0, warmupCount).map((ex, idx) => ({
    instanceId: `warmup-${ex.id}-${idx}`,
    exercise: ex,
    sets: 1,
    target: ex.isTimed ? `${ex.timeInSeconds || 30}s gentle flow` : '8–10 gentle reps'
  }));

  // Select main exercises avoiding duplicates
  const shuffled = [...workingCandidates].sort(() => 0.5 - Math.random());
  // Ensure variety if full body
  const selectedMain: WorkoutExerciseItem[] = [];
  const usedIds = new Set<string>();

  for (const ex of shuffled) {
    if (selectedMain.length >= mainCount) break;
    if (!usedIds.has(ex.id)) {
      usedIds.add(ex.id);

      // Adjust sets according to duration
      let sets = ex.defaultSets;
      if (duration <= 10) sets = 2;
      else if (duration >= 45) sets = 3;

      selectedMain.push({
        instanceId: `main-${ex.id}-${selectedMain.length}`,
        exercise: ex,
        sets,
        target: ex.isTimed ? `${ex.timeInSeconds || 30} seconds` : ex.defaultRepsOrSeconds
      });
    }
  }

  // If still need more, fill from safe pool
  if (selectedMain.length < mainCount) {
    for (const ex of safePool) {
      if (selectedMain.length >= mainCount) break;
      if (!usedIds.has(ex.id)) {
        usedIds.add(ex.id);
        selectedMain.push({
          instanceId: `main-${ex.id}-${selectedMain.length}`,
          exercise: ex,
          sets: 2,
          target: ex.isTimed ? `${ex.timeInSeconds || 30} seconds` : ex.defaultRepsOrSeconds
        });
      }
    }
  }

  // Select cooldown (1-2 stretches)
  const cooldownCount = duration <= 10 ? 1 : 2;
  const selectedCooldown = cooldownPool.slice(0, cooldownCount).map((ex, idx) => ({
    instanceId: `cooldown-${ex.id}-${idx}`,
    exercise: ex,
    sets: 1,
    target: ex.isTimed ? `${ex.timeInSeconds || 30}s steady hold` : 'Gentle hold & breathe'
  }));

  // Title formatting
  const levelLabels: Record<ExperienceLevel, string> = {
    complete_beginner: 'Beginner Starter',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
  };

  const styleLabels: Record<WorkoutStyle, string> = {
    full_body: 'Full Body',
    upper_body: 'Upper Body Focus',
    lower_body: 'Lower Body & Glutes',
    core: 'Core & Stability',
    cardio: 'Cardio & Conditioning',
    mixed: 'Mixed Conditioning',
    mobility: 'Joint Mobility & Flow'
  };

  const eqNotice =
    equipment.length === 1 && equipment[0] === 'none'
      ? 'No Equipment'
      : equipment.join(', ').replace(/_/g, ' ');

  const title = `${duration}-Minute ${levelLabels[level]} ${styleLabels[style]}`;
  const description = `Designed for your ${levelLabels[level].toLowerCase()} journey using ${eqNotice.toLowerCase()}. Focused on steady progress without burnout.`;

  // Target areas collection
  const targetAreas = Array.from(
    new Set(selectedMain.flatMap((item) => item.exercise.primaryMuscles))
  ).slice(0, 4);

  return {
    id: `workout-${Date.now()}`,
    title,
    description,
    durationMinutes: duration,
    difficulty: level,
    equipment,
    targetAreas,
    goal,
    style,
    warmup: selectedWarmups,
    mainExercises: selectedMain,
    cooldown: selectedCooldown,
    createdAt: new Date().toISOString()
  };
}

// Intelligently generate a realistic weekly schedule respecting rest and recovery days
export function generateWeeklySchedule(daysPerWeek: number, style: WorkoutStyle): DaySchedule[] {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const short = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let schedule: DaySchedule[] = [];

  switch (daysPerWeek) {
    case 2:
      // Mon (Workout), Thu (Workout), others Rest / Light walk
      schedule = [
        { dayName: 'Monday', dayShort: 'Mon', type: 'workout', label: 'Workout 1', focus: 'Full Body Strength' },
        { dayName: 'Tuesday', dayShort: 'Tue', type: 'rest', label: 'Rest Day', focus: 'Recovery & Hydration' },
        { dayName: 'Wednesday', dayShort: 'Wed', type: 'active_recovery', label: 'Light Walk', focus: 'Gentle Mobility' },
        { dayName: 'Thursday', dayShort: 'Thu', type: 'workout', label: 'Workout 2', focus: 'Full Body Endurance' },
        { dayName: 'Friday', dayShort: 'Fri', type: 'rest', label: 'Rest Day', focus: 'Muscular Recovery' },
        { dayName: 'Saturday', dayShort: 'Sat', type: 'active_recovery', label: 'Mobility', focus: 'Joint Care & Stretches' },
        { dayName: 'Sunday', dayShort: 'Sun', type: 'rest', label: 'Rest Day', focus: 'Weekly Reset' }
      ];
      break;

    case 3:
      // Classic Mon / Wed / Fri
      schedule = [
        { dayName: 'Monday', dayShort: 'Mon', type: 'workout', label: 'Workout A', focus: 'Full Body Foundation' },
        { dayName: 'Tuesday', dayShort: 'Tue', type: 'rest', label: 'Rest Day', focus: 'Tissue Recovery' },
        { dayName: 'Wednesday', dayShort: 'Wed', type: 'workout', label: 'Workout B', focus: 'Core & Lower Body' },
        { dayName: 'Thursday', dayShort: 'Thu', type: 'rest', label: 'Rest Day', focus: 'Recharge' },
        { dayName: 'Friday', dayShort: 'Fri', type: 'workout', label: 'Workout C', focus: 'Upper Body & Cardio' },
        { dayName: 'Saturday', dayShort: 'Sat', type: 'active_recovery', label: 'Active Walk', focus: '15m Living Room Stretch' },
        { dayName: 'Sunday', dayShort: 'Sun', type: 'rest', label: 'Rest Day', focus: 'Complete Rest' }
      ];
      break;

    case 4:
      // Mon (Upper), Tue (Lower), Wed (Rest), Thu (Upper), Fri (Lower/Core), Weekend (Rest)
      schedule = [
        { dayName: 'Monday', dayShort: 'Mon', type: 'workout', label: 'Workout 1', focus: 'Upper Body Push & Pull' },
        { dayName: 'Tuesday', dayShort: 'Tue', type: 'workout', label: 'Workout 2', focus: 'Lower Body & Glutes' },
        { dayName: 'Wednesday', dayShort: 'Wed', type: 'rest', label: 'Rest Day', focus: 'Mid-week Muscle Recovery' },
        { dayName: 'Thursday', dayShort: 'Thu', type: 'workout', label: 'Workout 3', focus: 'Full Body Circuit' },
        { dayName: 'Friday', dayShort: 'Fri', type: 'workout', label: 'Workout 4', focus: 'Core & Conditioning' },
        { dayName: 'Saturday', dayShort: 'Sat', type: 'active_recovery', label: 'Light Movement', focus: 'Mobility & Posture' },
        { dayName: 'Sunday', dayShort: 'Sun', type: 'rest', label: 'Rest Day', focus: 'Full Mental & Physical Rest' }
      ];
      break;

    case 5:
      // 5 days active with 2 guaranteed recovery days
      schedule = [
        { dayName: 'Monday', dayShort: 'Mon', type: 'workout', label: 'Workout 1', focus: 'Push & Core' },
        { dayName: 'Tuesday', dayShort: 'Tue', type: 'workout', label: 'Workout 2', focus: 'Legs & Hips' },
        { dayName: 'Wednesday', dayShort: 'Wed', type: 'workout', label: 'Workout 3', focus: 'Cardio & Conditioning' },
        { dayName: 'Thursday', dayShort: 'Thu', type: 'rest', label: 'Rest Day', focus: 'Crucial Midweek Recovery' },
        { dayName: 'Friday', dayShort: 'Fri', type: 'workout', label: 'Workout 4', focus: 'Upper Body Stability' },
        { dayName: 'Saturday', dayShort: 'Sat', type: 'workout', label: 'Workout 5', focus: 'Total Body Flow' },
        { dayName: 'Sunday', dayShort: 'Sun', type: 'rest', label: 'Rest Day', focus: 'Deep Recovery & Sleep' }
      ];
      break;

    case 6:
      // 6 days includes dedicated mobility day
      schedule = [
        { dayName: 'Monday', dayShort: 'Mon', type: 'workout', label: 'Workout 1', focus: 'Full Body Push' },
        { dayName: 'Tuesday', dayShort: 'Tue', type: 'workout', label: 'Workout 2', focus: 'Full Body Pull & Legs' },
        { dayName: 'Wednesday', dayShort: 'Wed', type: 'active_recovery', label: 'Mobility Day', focus: 'Spine & Hip Flow' },
        { dayName: 'Thursday', dayShort: 'Thu', type: 'workout', label: 'Workout 3', focus: 'Upper Body & Core' },
        { dayName: 'Friday', dayShort: 'Fri', type: 'workout', label: 'Workout 4', focus: 'Lower Body & Conditioning' },
        { dayName: 'Saturday', dayShort: 'Sat', type: 'workout', label: 'Workout 5', focus: 'Cardio Intervals' },
        { dayName: 'Sunday', dayShort: 'Sun', type: 'rest', label: 'Rest Day', focus: 'Non-negotiable Full Rest' }
      ];
      break;

    default: // 7 days (cautionary: 2 recovery days built in)
      schedule = [
        { dayName: 'Monday', dayShort: 'Mon', type: 'workout', label: 'Workout 1', focus: 'Strength Base' },
        { dayName: 'Tuesday', dayShort: 'Tue', type: 'active_recovery', label: 'Mobility', focus: 'Gentle Joint Mobility' },
        { dayName: 'Wednesday', dayShort: 'Wed', type: 'workout', label: 'Workout 2', focus: 'Conditioning' },
        { dayName: 'Thursday', dayShort: 'Thu', type: 'active_recovery', label: 'Active Rest', focus: 'Light Stretching' },
        { dayName: 'Friday', dayShort: 'Fri', type: 'workout', label: 'Workout 3', focus: 'Total Body Strength' },
        { dayName: 'Saturday', dayShort: 'Sat', type: 'workout', label: 'Workout 4', focus: 'Core & Balance' },
        { dayName: 'Sunday', dayShort: 'Sun', type: 'active_recovery', label: 'Restorative', focus: 'Deep Breath & Flexibility' }
      ];
      break;
  }

  return schedule;
}

// Find smart replacements for an exercise matching muscle group, user equipment, and difficulty
export function getSmartReplacements(
  currentExercise: Exercise,
  userEquipment: EquipmentType[],
  userLevel: ExperienceLevel
): Exercise[] {
  // 1. First look at specific replacementIds that fit equipment and difficulty
  const directMatches = currentExercise.replacementIds
    .map((id) => EXERCISES.find((e) => e.id === id))
    .filter((e): e is Exercise => !!e && matchesEquipment(e, userEquipment) && matchesDifficulty(e, userLevel));

  if (directMatches.length >= 2) {
    return directMatches;
  }

  // 2. Otherwise find exercises matching primary muscles or category
  const fallbackMatches = EXERCISES.filter(
    (e) =>
      e.id !== currentExercise.id &&
      matchesEquipment(e, userEquipment) &&
      matchesDifficulty(e, userLevel) &&
      (e.category === currentExercise.category ||
        e.primaryMuscles.some((m) => currentExercise.primaryMuscles.includes(m)))
  );

  const combined = Array.from(new Set([...directMatches, ...fallbackMatches]));
  return combined.slice(0, 4);
}

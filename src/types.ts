export type FitnessGoal =
  | 'strength'
  | 'muscle'
  | 'fitness'
  | 'fat_loss'
  | 'mobility'
  | 'full_body'
  | 'quick';

export type ExperienceLevel = 'complete_beginner' | 'beginner' | 'intermediate' | 'advanced';

export type WorkoutDuration = 5 | 10 | 15 | 20 | 30 | 45 | 60;

export type EquipmentType =
  | 'none'
  | 'dumbbells'
  | 'bands'
  | 'pullup_bar'
  | 'kettlebell'
  | 'full_home';

export type WorkoutStyle =
  | 'full_body'
  | 'upper_body'
  | 'lower_body'
  | 'core'
  | 'cardio'
  | 'mixed'
  | 'mobility';

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'core'
  | 'abs'
  | 'full_body';

export type ExerciseCategory =
  | 'Full Body'
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Arms'
  | 'Legs'
  | 'Glutes'
  | 'Core'
  | 'Cardio'
  | 'Mobility';

export interface Exercise {
  id: string;
  name: string;
  category: WorkoutStyle;
  exerciseCategory: ExerciseCategory;
  difficulty: ExperienceLevel;
  equipment: EquipmentType[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  setsReps: string;
  defaultSets: number;
  defaultRepsOrSeconds: string;
  suitableGoals?: FitnessGoal[];
  isTimed?: boolean;
  timeInSeconds?: number;
  restSeconds: number;
  commonMistakes: string[];
  easierModification: string;
  harderProgression: string;
  replacementIds: string[];
  isLowImpact?: boolean;
  isApartmentFriendly?: boolean;
  imageUrl?: string;
  illustrationType:
    | 'squat'
    | 'pushup'
    | 'plank'
    | 'lunge'
    | 'bridge'
    | 'bird_dog'
    | 'jumping_jack'
    | 'row'
    | 'press'
    | 'stretch'
    | 'crunch'
    | 'dip';
}

export interface WorkoutExerciseItem {
  instanceId: string;
  exercise: Exercise;
  sets: number;
  target: string;
  isCompleted?: boolean;
  completedSets?: number;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: ExperienceLevel;
  equipment: EquipmentType[];
  targetAreas: string[];
  goal: FitnessGoal;
  style: WorkoutStyle;
  warmup: WorkoutExerciseItem[];
  mainExercises: WorkoutExerciseItem[];
  cooldown: WorkoutExerciseItem[];
  createdAt: string;
}

export interface CompletedWorkoutRecord {
  id: string;
  title: string;
  durationSeconds: number;
  durationMinutes: number;
  exercisesCount: number;
  completedAt: string; // ISO date string
  goal: FitnessGoal;
  style: WorkoutStyle;
  difficulty: ExperienceLevel;
}

export interface UserPreferences {
  name: string;
  primaryGoal: FitnessGoal;
  level: ExperienceLevel;
  availableEquipment: EquipmentType[];
  preferredDuration: WorkoutDuration;
  workoutDaysPerWeek: number;
  soundEnabled: boolean;
}

export interface DaySchedule {
  dayName: string;
  dayShort: string;
  type: 'workout' | 'active_recovery' | 'rest';
  label: string;
  focus: string;
}

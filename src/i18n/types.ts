export type SupportedLanguage =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'pt'
  | 'hi'
  | 'ar'
  | 'ja'
  | 'zh'
  | 'ru';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
    region: 'Global / Americas / Europe'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    dir: 'ltr',
    region: 'España & Latinoamérica'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    dir: 'ltr',
    region: 'France & Afrique'
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    dir: 'ltr',
    region: 'Deutschland & Österreich'
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    dir: 'ltr',
    region: 'Brasil & Portugal'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    dir: 'ltr',
    region: 'भारत (India & South Asia)'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    dir: 'rtl',
    region: 'الشرق الأوسط وشمال أفريقيا'
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    dir: 'ltr',
    region: '日本 (Japan)'
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '简体中文',
    flag: '🇨🇳',
    dir: 'ltr',
    region: '中国 & Global'
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    dir: 'ltr',
    region: 'Восточная Европа & Азия'
  }
];

export interface TranslationDictionary {
  // Navigation
  navHome: string;
  navWorkouts: string;
  navExercises: string;
  navProgress: string;
  navAbout: string;
  startWorkout: string;
  brandTagline: string;
  languageButtonLabel: string;
  selectLanguage: string;
  audioEnabled: string;
  audioMuted: string;

  // Common Actions
  startMyWorkout: string;
  exploreExercises: string;
  generateWorkout: string;
  generating?: string;
  continue?: string;
  regenerate: string;
  quickWorkout: string;
  back: string;
  close: string;
  cancel: string;
  save: string;
  reset: string;
  resetAllFilters: string;
  pause: string;
  resume: string;
  skip: string;
  nextExercise: string;
  previousExercise: string;
  finishWorkout: string;
  modify: string;
  replaceExercise: string;
  properForm: string;

  // Homepage Hero & Badges
  heroTitle1: string;
  heroHighlight: string;
  heroTitle2: string;
  heroSubtitle: string;
  badge100Free: string;
  badgeNoEquipment: string;
  badgeScienceIntervals: string;

  // Beginner Section
  beginnerBadge: string;
  beginnerHeadline: string;
  beginnerSubtitle: string;
  beginnerBullet1: string;
  beginnerBullet2: string;
  beginnerBullet3: string;
  beginnerBullet4: string;
  startBeginnerWorkout: string;

  // No Equipment Section
  noEquipmentTitle: string;
  noEquipmentSubtitle: string;
  buildNoEquipmentRoutine: string;
  duration5Min: string;
  duration10Min: string;
  duration15Min: string;
  duration20Min: string;
  duration30Min: string;

  // Goals
  chooseGoalTitle: string;
  chooseGoalSubtitle: string;
  goalFitness: string;
  goalFitnessDesc: string;
  goalStrength: string;
  goalStrengthDesc: string;
  goalFatLoss: string;
  goalFatLossDesc: string;
  goalMobility: string;
  goalMobilityDesc: string;
  goalMuscle: string;
  goalMuscleDesc: string;

  // Workout Generator
  generatorTitle: string;
  generatorSubtitle: string;
  stepGoal: string;
  stepLevel: string;
  stepDuration: string;
  stepEquipment: string;
  levelCompleteBeginner: string;
  levelBeginner: string;
  levelIntermediate: string;
  levelAdvanced: string;
  eqNone: string;
  eqDumbbells: string;
  eqBands: string;
  eqPullupBar: string;
  eqKettlebell: string;
  generateRoutineBtn: string;
  generatedRoutineTitle: string;
  warmupSection: string;
  mainCircuitSection: string;
  cooldownSection: string;

  // Workout Player
  getReady: string;
  workInterval: string;
  restInterval: string;
  round: string;
  exerciseOf: string;
  secondsLeft: string;
  targetReps: string;
  formTips: string;
  upNext: string;
  quitWorkoutConfirm: string;
  quitWorkout: string;
  stayAndFinish: string;
  skipRest?: string;
  completeSetAndRest?: string;
  exerciseFinished?: string;
  previous?: string;

  // Workout Complete
  workoutCompletedHeading: string;
  workoutCompletedMsg: string;
  totalTime: string;
  exercisesFinished: string;
  currentStreak: string;
  totalWorkouts: string;
  saveWorkout: string;
  savedToHistory: string;
  backToHome: string;

  // Exercise Library
  libraryTitle: string;
  librarySubtitle: string;
  searchPlaceholder: string;
  allCategories: string;
  catFullBody: string;
  catChest: string;
  catBack: string;
  catShoulders: string;
  catArms: string;
  catLegs: string;
  catGlutes: string;
  catCore: string;
  catCardio: string;
  catMobility: string;
  noExercisesFound: string;
  viewFormGuide: string;
  commonMistakes: string;
  easierOption: string;
  harderOption: string;

  // Progress Dashboard
  progressTitle: string;
  progressSubtitle: string;
  workoutsThisWeek: string;
  longestStreak: string;
  totalMinutesTrained: string;
  completionRate: string;
  recentActivity: string;
  weeklySchedule: string;
  clearHistory: string;
  noWorkoutsYet: string;
  completeFirstWorkoutNotice: string;

  // Footer
  footerDisclaimer: string;
  footerRights: string;
}

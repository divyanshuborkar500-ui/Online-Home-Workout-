import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Homepage } from './components/Homepage';
import { WorkoutGenerator } from './components/WorkoutGenerator';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { WorkoutComplete } from './components/WorkoutComplete';
import { ProgressDashboard } from './components/ProgressDashboard';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { AboutPage } from './components/AboutPage';
import { LegalModals } from './components/LegalModals';
import { QuickWorkoutModal } from './components/QuickWorkoutModal';
import {
  WorkoutPlan,
  FitnessGoal,
  ExperienceLevel,
  WorkoutDuration,
  EquipmentType,
  CompletedWorkoutRecord,
  Exercise
} from './types';
import {
  getStoredPreferences,
  saveStoredPreferences,
  getWorkoutHistory,
  saveCompletedWorkout,
  calculateProgressStats,
  saveWorkoutPlanToStorage,
  saveActiveSession,
  getActiveSession,
  clearAllAppData
} from './utils/storage';
import { soundManager } from './utils/audio';
import { generateWorkoutPlan } from './utils/workoutGenerator';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'workouts' | 'exercises' | 'progress' | 'about'>('home');
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);
  const [isPlayerActive, setIsPlayerActive] = useState(false);

  // Generator pre-selected filters when launched from home cards
  const [generatorPresets, setGeneratorPresets] = useState<{
    goal?: FitnessGoal;
    level?: ExperienceLevel;
    duration?: WorkoutDuration;
    equipment?: EquipmentType[];
  }>({});

  // Completed workout celebratory modal / view
  const [completedStats, setCompletedStats] = useState<{
    durationSeconds: number;
    completedCount: number;
    totalCount: number;
    workoutTitle: string;
    isSaved: boolean;
  } | null>(null);

  // Quick Workout express launcher modal
  const [isQuickModalOpen, setIsQuickModalOpen] = useState(false);

  // Safety & Legal modal state
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  // Storage and User Preferences
  const [preferences, setPreferences] = useState(getStoredPreferences());
  const [history, setHistory] = useState<CompletedWorkoutRecord[]>([]);

  // Sound preference synchronization & Session / Route Restoration
  useEffect(() => {
    const prefs = getStoredPreferences();
    setPreferences(prefs);
    soundManager.setMuted(!prefs.soundEnabled);
    setHistory(getWorkoutHistory());

    // Restore active workout session if user refreshed mid-session (Test H)
    const savedActivePlan = getActiveSession();
    if (savedActivePlan && savedActivePlan.mainExercises?.length > 0) {
      setActivePlan(savedActivePlan);
      setIsPlayerActive(true);
    }

    // URL / Hash Route Handler
    const handleRoute = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      const path = window.location.pathname.toLowerCase().replace('/', '');
      const target = hash || path;

      if (target === 'workouts' || target === 'workout') {
        setCurrentTab('workouts');
      } else if (target === 'exercises' || target === 'library') {
        setCurrentTab('exercises');
      } else if (target === 'progress' || target === 'history') {
        setCurrentTab('progress');
      } else if (target === 'about') {
        setCurrentTab('about');
      } else if (target === 'no-equipment-workout') {
        setCurrentTab('workouts');
        setGeneratorPresets({ equipment: ['none'] });
      } else if (target === 'beginner-workout') {
        setCurrentTab('workouts');
        setGeneratorPresets({ level: 'complete_beginner', equipment: ['none'] });
      } else if (target === '15-minute-workout') {
        setCurrentTab('workouts');
        setGeneratorPresets({ duration: 15 });
      } else if (target === 'quick-workout') {
        setCurrentTab('workouts');
        setGeneratorPresets({ duration: 10 });
      } else if (target === 'home' || target === '') {
        setCurrentTab('home');
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);

    // Browser / Android Back Button Handler (Requirement 30)
    const handlePopState = () => {
      if (isPlayerActive) {
        setIsPlayerActive(false);
        saveActiveSession(null);
      } else {
        handleRoute();
      }
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isPlayerActive]);

  const handleToggleSound = () => {
    const updated = !preferences.soundEnabled;
    const newPrefs = { ...preferences, soundEnabled: updated };
    setPreferences(newPrefs);
    saveStoredPreferences(newPrefs);
    soundManager.setMuted(!updated);
  };

  const handleNavigateTab = useCallback((tab: 'home' | 'workouts' | 'exercises' | 'progress' | 'about') => {
    setCurrentTab(tab);
    setIsPlayerActive(false);
    setCompletedStats(null);
    saveActiveSession(null);
    if (window.location.hash !== `#${tab}`) {
      window.history.pushState(null, '', `#${tab}`);
    }
  }, []);

  const handleStartGenerator = (presets?: {
    goal?: FitnessGoal;
    level?: ExperienceLevel;
    duration?: WorkoutDuration;
    equipment?: EquipmentType[];
  }) => {
    if (presets) {
      setGeneratorPresets(presets);
    }
    setIsPlayerActive(false);
    setCompletedStats(null);
    saveActiveSession(null);
    setCurrentTab('workouts');
    window.history.pushState(null, '', '#workouts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWorkoutGenerated = (plan: WorkoutPlan) => {
    setActivePlan(plan);
    saveWorkoutPlanToStorage(plan);
    saveActiveSession(plan);
    setIsPlayerActive(true);
    setCompletedStats(null);
    window.history.pushState({ inWorkout: true }, '', '#active-workout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWorkoutFinished = (stats: {
    durationSeconds: number;
    completedCount: number;
    totalCount: number;
  }) => {
    const title = activePlan?.title || 'Home Workout';
    const goal = activePlan?.goal || 'fitness';
    const style = activePlan?.style || 'full_body';
    const difficulty = activePlan?.difficulty || 'beginner';

    // Persist to local storage
    const newRecord = saveCompletedWorkout({
      title,
      durationSeconds: stats.durationSeconds,
      durationMinutes: Math.max(1, Math.round(stats.durationSeconds / 60)),
      exercisesCount: stats.completedCount,
      goal,
      style,
      difficulty
    });

    const updatedHistory = [newRecord, ...history];
    setHistory(updatedHistory);

    setCompletedStats({
      durationSeconds: stats.durationSeconds,
      completedCount: stats.completedCount,
      totalCount: stats.totalCount,
      workoutTitle: title,
      isSaved: true
    });

    setIsPlayerActive(false);
    saveActiveSession(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartSingleExercise = (exercise: Exercise) => {
    // Generate a targeted 10-minute micro session around this exercise
    const microPlan = generateWorkoutPlan({
      goal: 'fitness',
      level: exercise.difficulty === 'advanced' ? 'intermediate' : 'beginner',
      duration: 10,
      equipment: exercise.equipment,
      daysPerWeek: 3,
      style: 'full_body'
    });

    // Replace the main exercise with this one to practice
    if (microPlan.mainExercises.length > 0) {
      microPlan.mainExercises[0] = {
        instanceId: `direct-${Date.now()}`,
        exercise: exercise,
        sets: 3,
        target: exercise.isTimed ? `${exercise.timeInSeconds || 30} seconds` : exercise.defaultRepsOrSeconds
      };
      microPlan.title = `Form Practice: ${exercise.name}`;
    }

    handleWorkoutGenerated(microPlan);
  };

  const handleClearHistory = () => {
    clearAllAppData();
    setHistory([]);
    setActivePlan(null);
    setIsPlayerActive(false);
  };

  const currentStats = calculateProgressStats(history);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors overflow-x-hidden w-full max-w-full">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigateTab}
        onStartWorkoutClick={() => handleStartGenerator()}
        soundEnabled={preferences.soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* Workout Complete Celebration Screen */}
        {completedStats ? (
          <WorkoutComplete
            durationSeconds={completedStats.durationSeconds}
            exercisesCompleted={completedStats.completedCount}
            totalExercises={completedStats.totalCount}
            currentStreak={currentStats.currentStreak}
            totalWorkouts={currentStats.totalWorkouts}
            workoutTitle={completedStats.workoutTitle}
            isSaved={completedStats.isSaved}
            onSaveWorkout={() => {
              setCompletedStats((prev) => (prev ? { ...prev, isSaved: true } : null));
            }}
            onStartAnother={() => {
              setCompletedStats(null);
              handleStartGenerator();
            }}
            onViewProgress={() => {
              setCompletedStats(null);
              setCurrentTab('progress');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : isPlayerActive && activePlan ? (
          /* Active Workout Player (Overview / Guided Timer) */
          <WorkoutPlayer
            plan={activePlan}
            onWorkoutFinished={handleWorkoutFinished}
            onBackToGenerator={() => setIsPlayerActive(false)}
          />
        ) : (
          /* Tab Views */
          <>
            {currentTab === 'home' && (
              <Homepage
                onStartGenerator={handleStartGenerator}
                onBrowseExercises={() => {
                  setCurrentTab('exercises');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenQuickModal={() => setIsQuickModalOpen(true)}
              />
            )}

            {currentTab === 'workouts' && (
              <WorkoutGenerator
                initialGoal={generatorPresets.goal}
                initialDuration={generatorPresets.duration}
                initialEquipment={generatorPresets.equipment}
                onWorkoutGenerated={handleWorkoutGenerated}
              />
            )}

            {currentTab === 'exercises' && (
              <ExerciseLibrary
                onStartExerciseDirectly={handleStartSingleExercise}
              />
            )}

            {currentTab === 'progress' && (
              <ProgressDashboard
                history={history}
                onStartNewWorkout={() => handleStartGenerator()}
                onClearHistory={handleClearHistory}
              />
            )}

            {currentTab === 'about' && (
              <AboutPage
                onStartWorkout={() => handleStartGenerator()}
                onOpenLegal={(type) => setLegalModal(type)}
              />
            )}
          </>
        )}
      </main>

      {/* Quick Express Workout Launcher Modal */}
      <QuickWorkoutModal
        isOpen={isQuickModalOpen}
        onClose={() => setIsQuickModalOpen(false)}
        onLaunchWorkout={handleWorkoutGenerated}
      />

      {/* Legal & Medical Disclaimer Modals */}
      <LegalModals
        activeModal={legalModal}
        onClose={() => setLegalModal(null)}
      />

      {/* Mandatory Platform Footer */}
      <Footer
        onNavigate={handleNavigateTab}
        onOpenLegal={(type) => setLegalModal(type)}
      />
    </div>
  );
}

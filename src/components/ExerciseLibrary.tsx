import React, { useState } from 'react';
import {
  Search,
  Filter,
  VolumeX,
  Footprints,
  Heart,
  Dumbbell,
  Check,
  X,
  Sparkles,
  Info,
  AlertTriangle,
  Play
} from 'lucide-react';
import { EXERCISES } from '../data/exercises';
import { Exercise, EquipmentType, MuscleGroup, ExperienceLevel } from '../types';
import { ExerciseIllustration } from './ExerciseIllustration';
import { getFavoriteExercises, toggleFavoriteExercise } from '../utils/storage';
import { useLanguage } from '../context/LanguageContext';

interface ExerciseLibraryProps {
  onStartExerciseDirectly: (exercise: Exercise) => void;
}

export const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({ onStartExerciseDirectly }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [onlyLowImpact, setOnlyLowImpact] = useState(false);
  const [onlyApartmentFriendly, setOnlyApartmentFriendly] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const [favorites, setFavorites] = useState<string[]>(getFavoriteExercises());
  const [selectedExerciseForModal, setSelectedExerciseForModal] = useState<Exercise | null>(null);

  const handleToggleFav = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleFavoriteExercise(id);
    setFavorites(updated);
  };

  // Reset all filters helper
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMuscle('all');
    setSelectedEquipment('all');
    setSelectedDifficulty('all');
    setOnlyLowImpact(false);
    setOnlyApartmentFriendly(false);
    setOnlyFavorites(false);
  };

  // Filtering logic
  const filteredExercises = EXERCISES.filter((ex) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = ex.name.toLowerCase().includes(q);
      const matchMuscle = ex.primaryMuscles.some((m) => m.toLowerCase().includes(q)) ||
                          ex.secondaryMuscles.some((m) => m.toLowerCase().includes(q));
      const matchCategory = ex.exerciseCategory.toLowerCase().includes(q);
      const matchNoEquip = (q.includes('no equip') || q.includes('bodyweight')) && ex.equipment.includes('none');

      if (!matchName && !matchMuscle && !matchCategory && !matchNoEquip) return false;
    }

    // Exercise Category
    if (selectedCategory !== 'all') {
      if (ex.exerciseCategory !== selectedCategory) return false;
    }

    // Muscle
    if (selectedMuscle !== 'all') {
      const hasMuscle = ex.primaryMuscles.some(
        (m) => m.toLowerCase().includes(selectedMuscle.toLowerCase())
      ) || ex.secondaryMuscles.some((m) => m.toLowerCase().includes(selectedMuscle.toLowerCase()));
      if (!hasMuscle) return false;
    }

    // Equipment
    if (selectedEquipment !== 'all') {
      if (selectedEquipment === 'none') {
        if (!ex.equipment.includes('none')) return false;
      } else {
        if (!ex.equipment.includes(selectedEquipment as EquipmentType)) return false;
      }
    }

    // Difficulty
    if (selectedDifficulty !== 'all') {
      if (selectedDifficulty === 'beginner') {
        if (ex.difficulty !== 'complete_beginner' && ex.difficulty !== 'beginner') return false;
      } else if (ex.difficulty !== selectedDifficulty) {
        return false;
      }
    }

    // Low Impact
    if (onlyLowImpact && !ex.isLowImpact) return false;

    // Apartment Friendly
    if (onlyApartmentFriendly && !ex.isApartmentFriendly) return false;

    // Favorites
    if (onlyFavorites && !favorites.includes(ex.id)) return false;

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Exercise Library & Form Guide
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Browse verified bodyweight and home equipment movements. Learn proper form, joint cues, easier modifications, and common beginner mistakes.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="exercise-search-input"
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-950 dark:text-white placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              id="filter-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Categories</option>
              <option value="Full Body">Full Body</option>
              <option value="Chest">Chest</option>
              <option value="Back">Back</option>
              <option value="Shoulders">Shoulders</option>
              <option value="Arms">Arms</option>
              <option value="Legs">Legs</option>
              <option value="Glutes">Glutes</option>
              <option value="Core">Core</option>
              <option value="Cardio">Cardio</option>
              <option value="Mobility">Mobility</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Muscle Group
            </label>
            <select
              id="filter-muscle"
              value={selectedMuscle}
              onChange={(e) => setSelectedMuscle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Muscles</option>
              <option value="chest">Chest</option>
              <option value="back">Back & Lats</option>
              <option value="legs">Legs (Quads/Hamstrings)</option>
              <option value="glutes">Glutes</option>
              <option value="core">Core & Abs</option>
              <option value="shoulders">Shoulders</option>
              <option value="arms">Arms</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Equipment
            </label>
            <select
              id="filter-equipment"
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Equipment</option>
              <option value="none">No Equipment (Bodyweight)</option>
              <option value="dumbbells">Dumbbells</option>
              <option value="bands">Resistance Bands</option>
              <option value="pullup_bar">Pull-up Bar</option>
              <option value="kettlebell">Kettlebell</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Difficulty
            </label>
            <select
              id="filter-difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner Friendly</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Quick Clear */}
          <div className="flex items-end col-span-2 sm:col-span-1">
            <button
              onClick={handleResetFilters}
              className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Quick Attribute Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={() => setOnlyApartmentFriendly(!onlyApartmentFriendly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              onlyApartmentFriendly
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <VolumeX className="w-3.5 h-3.5" />
            <span>Apartment Friendly (Quiet)</span>
          </button>

          <button
            onClick={() => setOnlyLowImpact(!onlyLowImpact)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              onlyLowImpact
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Footprints className="w-3.5 h-3.5" />
            <span>Low-Impact / Joint Safe</span>
          </button>

          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              onlyFavorites
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Saved Favorites ({favorites.length})</span>
          </button>
        </div>
      </div>

      {/* Exercises Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mb-4 px-1">
          <span>Showing {filteredExercises.length} Exercises</span>
        </div>

        {filteredExercises.length === 0 ? (
          <div className="py-16 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <Dumbbell className="w-10 h-10 mx-auto text-slate-400" />
            <p className="text-base font-bold text-slate-800 dark:text-slate-200">No exercises matched your filters</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">Try resetting the filter criteria or searching for another movement name or muscle.</p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition active:scale-98"
            >
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredExercises.map((ex) => {
              const isFav = favorites.includes(ex.id);
              return (
                <div
                  key={ex.id}
                  onClick={() => setSelectedExerciseForModal(ex)}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition cursor-pointer overflow-hidden flex flex-col group"
                >
                  {/* Illustration header */}
                  <div className="relative">
                    <ExerciseIllustration
                      exerciseId={ex.id}
                      exerciseName={ex.name}
                      imageUrl={ex.imageUrl}
                      type={ex.illustrationType}
                      className="w-full h-48"
                    />
                    <button
                      onClick={(e) => handleToggleFav(ex.id, e)}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition ${
                        isFav
                          ? 'bg-rose-500 text-white'
                          : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                    </button>
                    {ex.isApartmentFriendly && (
                      <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold">
                        Quiet (Apartment Safe)
                      </span>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          {ex.primaryMuscles[0]}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          {ex.difficulty.replace('_', ' ')}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                        {ex.name}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {ex.instructions[0]}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {ex.setsReps}
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-0.5 transition inline-flex items-center gap-1">
                        View Form Guide →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* EXERCISE DETAIL & FORM GUIDE MODAL */}
      {selectedExerciseForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Form Demonstration & Bio-mechanics
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {selectedExerciseForModal.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedExerciseForModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto py-4 space-y-6 pr-1">
              <ExerciseIllustration
                exerciseId={selectedExerciseForModal.id}
                exerciseName={selectedExerciseForModal.name}
                imageUrl={selectedExerciseForModal.imageUrl}
                type={selectedExerciseForModal.illustrationType}
                className="w-full h-64 sm:h-72 rounded-2xl"
              />

              {/* Badges */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold">
                  Muscles: {selectedExerciseForModal.primaryMuscles.join(', ')}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold capitalize">
                  Level: {selectedExerciseForModal.difficulty.replace('_', ' ')}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold capitalize">
                  Equipment: {selectedExerciseForModal.equipment.join(', ').replace(/_/g, ' ')}
                </span>
              </div>

              {/* Execution Steps */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                  Step-by-Step Instructions
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {selectedExerciseForModal.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Mistakes */}
              {selectedExerciseForModal.commonMistakes.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 space-y-1.5">
                  <div className="font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Common Beginner Mistakes to Avoid</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-amber-800 dark:text-amber-200/90">
                    {selectedExerciseForModal.commonMistakes.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">
                    Easier Modification:
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">
                    {selectedExerciseForModal.easierModification}
                  </p>
                </div>

                {selectedExerciseForModal.harderProgression && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">
                      Harder Progression:
                    </span>
                    <p className="text-slate-600 dark:text-slate-300">
                      {selectedExerciseForModal.harderProgression}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <button
                onClick={() => setSelectedExerciseForModal(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const targetEx = selectedExerciseForModal;
                  setSelectedExerciseForModal(null);
                  onStartExerciseDirectly(targetEx);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice in Quick Workout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

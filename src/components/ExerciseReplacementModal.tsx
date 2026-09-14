import React from 'react';
import { X, RefreshCw, Check, ArrowRight } from 'lucide-react';
import { Exercise, EquipmentType, ExperienceLevel } from '../types';
import { getSmartReplacements } from '../utils/workoutGenerator';
import { ExerciseIllustration } from './ExerciseIllustration';

interface ExerciseReplacementModalProps {
  currentExercise: Exercise | null;
  userEquipment: EquipmentType[];
  userLevel: ExperienceLevel;
  onSelectReplacement: (replacement: Exercise) => void;
  onClose: () => void;
}

export const ExerciseReplacementModal: React.FC<ExerciseReplacementModalProps> = ({
  currentExercise,
  userEquipment,
  userLevel,
  onSelectReplacement,
  onClose
}) => {
  if (!currentExercise) return null;

  const replacements = getSmartReplacements(currentExercise, userEquipment, userLevel);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Smart Exercise Substitution</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Replace "{currentExercise.name}"
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current info notice */}
        <div className="my-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">Target Muscles: </span>
            {currentExercise.primaryMuscles.join(', ')}
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
            Equipment Matched
          </span>
        </div>

        {/* Replacement Options List */}
        <div className="overflow-y-auto space-y-3 py-1 pr-1 flex-1">
          {replacements.length === 0 ? (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400">
              <p>No direct alternative found matching these specific equipment criteria.</p>
            </div>
          ) : (
            replacements.map((candidate) => (
              <div
                key={candidate.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-white dark:bg-slate-800 transition shadow-xs hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-14 shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    <ExerciseIllustration
                      exerciseId={candidate.id}
                      exerciseName={candidate.name}
                      imageUrl={candidate.imageUrl}
                      type={candidate.illustrationType}
                      showFormTag={false}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {candidate.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {candidate.instructions[0]}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {candidate.difficulty.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {candidate.setsReps}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  id={`select-replacement-${candidate.id}`}
                  onClick={() => {
                    onSelectReplacement(candidate);
                    onClose();
                  }}
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Choose This</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Easier modification suggestion preview */}
        {currentExercise.easierModification && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold text-slate-700 dark:text-slate-200">Form Modification Tip: </span>
            {currentExercise.easierModification}
          </div>
        )}
      </div>
    </div>
  );
};

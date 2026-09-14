import React, { useState } from 'react';
import { getExerciseImageUrl, ILLUSTRATION_FALLBACK_IMAGES } from '../data/exerciseImages';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export interface ExerciseIllustrationProps {
  type?: string;
  exerciseId?: string;
  exerciseName?: string;
  imageUrl?: string;
  className?: string;
  aspectRatio?: string;
  showFormTag?: boolean;
}

export const ExerciseIllustration: React.FC<ExerciseIllustrationProps> = ({
  type,
  exerciseId,
  exerciseName,
  imageUrl,
  className = 'w-full h-44',
  showFormTag = true
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Resolve the best available real photograph for this exercise
  const initialSrc =
    imageUrl ||
    getExerciseImageUrl(exerciseId, type);

  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      // Fall back to general illustration fallback if specific ID failed
      if (type && ILLUSTRATION_FALLBACK_IMAGES[type]) {
        setCurrentSrc(ILLUSTRATION_FALLBACK_IMAGES[type]);
      } else {
        // Safe universal fallback
        setCurrentSrc(ILLUSTRATION_FALLBACK_IMAGES.squat);
      }
    }
  };

  const displayName = exerciseName || (type ? type.replace(/_/g, ' ') : 'Exercise Demonstration');

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-slate-900 group select-none shadow-xs ${className}`}
    >
      {/* Loading Skeleton Pulse */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-slate-500 text-xs">
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Loading demonstration...</span>
          </div>
        </div>
      )}

      {/* Real High-Resolution Exercise Image */}
      <img
        src={currentSrc}
        alt={`${displayName} proper form demonstration`}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={handleImageError}
        className={`w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Subtle bottom gradient scrim to ensure text & badges remain razor sharp */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

      {/* Form Cue Badge */}
      {showFormTag && (
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold shadow-xs">
          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="uppercase tracking-wider">Proper Form</span>
        </div>
      )}
    </div>
  );
};

export const ExerciseImage = ExerciseIllustration;

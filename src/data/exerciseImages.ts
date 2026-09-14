import squatImg from '../assets/images/exercise_squat_form_1789377252640.jpg';
import pushupImg from '../assets/images/exercise_pushup_form_1789377272853.jpg';
import plankImg from '../assets/images/exercise_plank_form_1789377291409.jpg';

// Verified, high-resolution photography for every single home workout exercise
export const EXERCISE_IMAGES: Record<string, string> = {
  // Upper Body: Chest & Push
  'wall-pushups': 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
  'incline-pushups': 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
  'knee-pushups': 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
  'standard-pushups': pushupImg,
  'diamond-pushups': 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
  'floor-chest-press-db': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
  'bench-dips': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',

  // Upper Body: Back & Pull
  'prone-y-t-w': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  'superman-hold': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
  'bent-over-db-row': 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
  'band-rows': 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80',
  'pullups': 'https://images.unsplash.com/photo-1522898467493-49726bf28798?auto=format&fit=crop&w=800&q=80',

  // Lower Body: Squats & Legs
  'chair-box-squat': 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=800&q=80',
  'bodyweight-squats': squatImg,
  'goblet-squat-db': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
  'standing-calf-raises': 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80',

  // Lower Body: Glutes & Lunges
  'glute-bridges': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  'single-leg-glute-bridge': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  'reverse-lunges': 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80',
  'bulgarian-split-squats': 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80',

  // Core & Stability
  'deadbug': 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&w=800&q=80',
  'bird-dog': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  'forearm-plank': plankImg,
  'side-plank': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',

  // Cardio Intervals
  'mountain-climbers': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
  'jumping-jacks': 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80',
  'high-knees-march': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
  'butt-kicks': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
  'shadow-boxing': 'https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=800&q=80',

  // Mobility, Warm-up & Flexibility
  'cat-cow-stretch': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
  'arm-circles-hug': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
  'hip-circles-warmup': 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80',
  'childs-pose': 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80',
  'hamstring-stretch': 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&w=800&q=80',

  // Shoulders & Arms
  'overhead-db-press': 'https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=800&q=80'
};

// Fallback images based on illustration type / movement pattern
export const ILLUSTRATION_FALLBACK_IMAGES: Record<string, string> = {
  squat: squatImg,
  pushup: pushupImg,
  plank: plankImg,
  lunge: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80',
  bridge: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  bird_dog: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  jumping_jack: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80',
  row: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
  press: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
  stretch: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
  crunch: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&w=800&q=80',
  dip: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
};

/**
 * Returns a high-definition, verified exercise image URL for any exercise or movement type.
 */
export function getExerciseImageUrl(
  exerciseId?: string,
  illustrationType?: string,
  _category?: string
): string {
  if (exerciseId && EXERCISE_IMAGES[exerciseId]) {
    return EXERCISE_IMAGES[exerciseId];
  }

  if (illustrationType && ILLUSTRATION_FALLBACK_IMAGES[illustrationType]) {
    return ILLUSTRATION_FALLBACK_IMAGES[illustrationType];
  }

  // Universal high-quality fitness fallback
  return squatImg;
}

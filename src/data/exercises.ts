import { Exercise, ExerciseCategory, FitnessGoal } from '../types';
import { getExerciseImageUrl } from './exerciseImages';

const RAW_EXERCISES: any[] = [
  // CHEST & PUSH
  {
    id: 'wall-pushups',
    name: 'Wall Push-ups',
    category: 'upper_body',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Chest', 'Shoulders', 'Triceps'],
    secondaryMuscles: ['Core'],
    instructions: [
      'Stand about arm’s length away from a solid wall with feet hip-width apart.',
      'Place your palms flat on the wall at shoulder height and shoulder-width apart.',
      'Keeping your body straight like a plank, bend your elbows to lower your chest toward the wall.',
      'Pause for 1 second, then press back through your palms to return to starting position.'
    ],
    setsReps: '3 sets × 10–12 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '12 reps',
    restSeconds: 45,
    commonMistakes: [
      'Arching or sagging the lower back',
      'Flaring elbows out too wide at 90 degrees',
      'Standing too close to the wall'
    ],
    easierModification: 'Step your feet closer to the wall to reduce resistance.',
    harderProgression: 'Incline Push-ups against a sturdy table or kitchen counter.',
    replacementIds: ['incline-pushups', 'knee-pushups', 'floor-chest-press-db'],
    illustrationType: 'pushup'
  },
  {
    id: 'incline-pushups',
    name: 'Incline Push-ups',
    category: 'upper_body',
    difficulty: 'beginner',
    equipment: ['none'],
    primaryMuscles: ['Chest', 'Triceps', 'Front Shoulders'],
    secondaryMuscles: ['Core'],
    instructions: [
      'Place your hands shoulder-width apart on a sturdy elevated surface (couch, bench, or countertop).',
      'Step your feet back until your body forms a straight line from heels to head.',
      'Lower your chest toward the edge by bending your elbows at roughly a 45-degree angle to your ribs.',
      'Push firmly through your palms to return to the starting position.'
    ],
    setsReps: '3 sets × 8–10 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '10 reps',
    restSeconds: 45,
    commonMistakes: [
      'Letting the hips sag down or pike up',
      'Dropping the head rather than lowering the chest',
      'Using an unstable surface'
    ],
    easierModification: 'Perform on a higher surface such as a counter or wall.',
    harderProgression: 'Knee push-ups on the floor or standard floor push-ups.',
    replacementIds: ['wall-pushups', 'knee-pushups', 'standard-pushups'],
    illustrationType: 'pushup'
  },
  {
    id: 'knee-pushups',
    name: 'Knee Push-ups',
    category: 'upper_body',
    difficulty: 'beginner',
    equipment: ['none'],
    primaryMuscles: ['Chest', 'Triceps', 'Shoulders'],
    secondaryMuscles: ['Core'],
    instructions: [
      'Start on all fours with your hands slightly wider than shoulder-width.',
      'Walk your knees back so there is a straight line from your knees through your hips to your shoulders.',
      'Keep your core braced and lower your chest until it is a few inches off the floor.',
      'Push back up smoothly to full arm extension without locking your elbows.'
    ],
    setsReps: '3 sets × 8–10 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '8 reps',
    restSeconds: 60,
    commonMistakes: [
      'Leaving hips high in the air (piking)',
      'Flaring elbows out horizontally',
      'Not engaging core muscles'
    ],
    easierModification: 'Incline push-ups using a raised sofa or table.',
    harderProgression: 'Standard push-ups or eccentric push-ups with slow descent.',
    replacementIds: ['incline-pushups', 'standard-pushups', 'floor-chest-press-db'],
    illustrationType: 'pushup'
  },
  {
    id: 'standard-pushups',
    name: 'Standard Floor Push-ups',
    category: 'upper_body',
    difficulty: 'intermediate',
    equipment: ['none'],
    primaryMuscles: ['Chest', 'Triceps', 'Shoulders'],
    secondaryMuscles: ['Core', 'Glutes'],
    instructions: [
      'Place hands on the floor slightly wider than shoulder-width, fingers pointing slightly outward.',
      'Extend legs straight behind you, up on toes, body in a rigid straight plank line.',
      'Lower your entire body in unison until your chest touches or hovers an inch above the floor.',
      'Press the floor away firmly to return to the top position.'
    ],
    setsReps: '3 sets × 10–12 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '10 reps',
    restSeconds: 60,
    commonMistakes: [
      'Flaring elbows out 90 degrees (tuck them to about 45 degrees)',
      'Sagging hips or lower back pain',
      'Partial range of motion'
    ],
    easierModification: 'Knee push-ups or incline push-ups.',
    harderProgression: 'Decline push-ups or diamond push-ups.',
    replacementIds: ['knee-pushups', 'diamond-pushups', 'floor-chest-press-db'],
    illustrationType: 'pushup'
  },
  {
    id: 'diamond-pushups',
    name: 'Diamond Push-ups',
    category: 'upper_body',
    difficulty: 'advanced',
    equipment: ['none'],
    primaryMuscles: ['Triceps', 'Inner Chest', 'Front Shoulders'],
    secondaryMuscles: ['Core'],
    instructions: [
      'Set up in a push-up position with hands touching under your chest, index fingers and thumbs forming a diamond/triangle.',
      'Keep your elbows tucked close to your ribcage as you lower your chest to touch your hands.',
      'Drive through your triceps and palms to press back up.'
    ],
    setsReps: '3 sets × 8–10 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '8 reps',
    restSeconds: 60,
    commonMistakes: [
      'Flaring elbows out wide putting stress on wrist joints',
      'Piking the hips up',
      'Jerking the neck forward'
    ],
    easierModification: 'Perform diamond push-ups on knees or elevated surface.',
    harderProgression: 'Decline diamond push-ups with feet elevated.',
    replacementIds: ['standard-pushups', 'bench-dips', 'tricep-kickbacks-db'],
    illustrationType: 'pushup'
  },
  {
    id: 'floor-chest-press-db',
    name: 'Dumbbell Floor Press',
    category: 'upper_body',
    difficulty: 'beginner',
    equipment: ['dumbbells'],
    primaryMuscles: ['Chest', 'Triceps', 'Front Shoulders'],
    secondaryMuscles: ['Core'],
    instructions: [
      'Lie flat on your back on an exercise mat with knees bent and feet flat on the floor.',
      'Hold a dumbbell in each hand at chest level with upper arms resting at roughly 45 degrees to your body.',
      'Press dumbbells upward until arms are straight above your chest (without banging them together).',
      'Lower under control until upper arms gently touch the floor, pause, and repeat.'
    ],
    setsReps: '3 sets × 10–12 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '10 reps',
    restSeconds: 60,
    commonMistakes: [
      'Bouncing elbows hard off the floor',
      'Arching lower back off the ground',
      'Pushing bells back toward the head rather than over the chest'
    ],
    easierModification: 'Use lighter dumbbells or floor push-ups.',
    harderProgression: 'Add a 2-second isometric pause at the bottom.',
    replacementIds: ['standard-pushups', 'knee-pushups'],
    illustrationType: 'press'
  },
  {
    id: 'bench-dips',
    name: 'Chair / Couch Dips',
    category: 'upper_body',
    difficulty: 'beginner',
    equipment: ['none'],
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Front Shoulders', 'Upper Chest'],
    instructions: [
      'Sit on the edge of a sturdy chair or couch and place hands beside your hips with fingers gripping the edge.',
      'Slide your hips forward off the seat, keeping your back close to the furniture.',
      'Bend elbows to lower your hips toward the floor until elbows reach about 90 degrees.',
      'Press through the heels of your hands to return to the top.'
    ],
    setsReps: '3 sets × 8–10 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '10 reps',
    restSeconds: 45,
    commonMistakes: [
      'Drifting hips too far away from the chair (causes shoulder strain)',
      'Shrugging shoulders up toward ears',
      'Lowering below 90 degrees'
    ],
    easierModification: 'Keep knees bent at 90 degrees with feet flat on floor close to you.',
    harderProgression: 'Extend legs out straight with heels on the floor.',
    replacementIds: ['knee-pushups', 'diamond-pushups'],
    illustrationType: 'dip'
  },

  // BACK & PULL / POSTURE
  {
    id: 'prone-y-t-w',
    name: 'Floor Prone Y-T-W Raises',
    category: 'upper_body',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Upper Back', 'Rear Deltoids', 'Rhomboids'],
    secondaryMuscles: ['Lower Traps', 'Erector Spinae'],
    instructions: [
      'Lie face down on your mat with forehead resting gently on a small towel and feet hip-width.',
      'Form a "Y" shape with arms outstretched overhead, thumbs pointing toward ceiling; squeeze shoulder blades and lift arms 2–3 inches off floor.',
      'Next move arms out to sides in a "T" position and lift thumbs up.',
      'Finally bend elbows to ribs in a "W" shape and lift. Perform 5 reps of each letter.'
    ],
    setsReps: '3 sets × 6 reps per letter',
    defaultSets: 3,
    defaultRepsOrSeconds: '6 reps each',
    restSeconds: 45,
    commonMistakes: [
      'Craning the neck up instead of keeping gaze down',
      'Using momentum instead of conscious scapular contraction',
      'Holding breath'
    ],
    easierModification: 'Rest arms between reps and focus on one letter at a time.',
    harderProgression: 'Hold small water bottles or 1-2 lb dumbbells.',
    replacementIds: ['superman-hold', 'bent-over-db-row', 'band-pull-aparts'],
    illustrationType: 'stretch'
  },
  {
    id: 'superman-hold',
    name: 'Superman Holds',
    category: 'upper_body',
    difficulty: 'beginner',
    equipment: ['none'],
    primaryMuscles: ['Lower Back', 'Glutes', 'Upper Back'],
    secondaryMuscles: ['Hamstrings', 'Shoulders'],
    instructions: [
      'Lie face down on the floor with arms reaching forward and legs straight back.',
      'Simultaneously lift your chest, arms, and legs 2–4 inches off the floor by contracting your back and glutes.',
      'Keep your neck neutral looking down at the mat.',
      'Hold for 2–3 seconds at the top, then lower smoothly.'
    ],
    setsReps: '3 sets × 8–10 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '10 reps',
    restSeconds: 45,
    commonMistakes: [
      'Hyper-extending neck backward',
      'Bending knees excessively instead of lifting from the hips',
      'Holding breath'
    ],
    easierModification: 'Lift only upper body, or alternate opposite arm and opposite leg.',
    harderProgression: 'Hold each rep at the top for 5 full seconds.',
    replacementIds: ['bird-dog', 'prone-y-t-w'],
    illustrationType: 'stretch'
  },
  {
    id: 'bent-over-db-row',
    name: 'Dumbbell Bent-Over Rows',
    category: 'upper_body',
    difficulty: 'beginner',
    equipment: ['dumbbells'],
    primaryMuscles: ['Lats', 'Rhomboids', 'Mid Back'],
    secondaryMuscles: ['Biceps', 'Rear Shoulders'],
    instructions: [
      'Stand with feet shoulder-width, hold a dumbbell in each hand with palms facing each other.',
      'Hinge forward at the hips with a flat back and slight bend in the knees until torso is at roughly 45 degrees.',
      'Pull dumbbells toward your lower ribs, driving elbows backward and squeezing shoulder blades together.',
      'Lower weights smoothly to full arm extension.'
    ],
    setsReps: '3 sets × 10–12 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '10 reps',
    restSeconds: 60,
    commonMistakes: [
      'Rounding the lower back (maintain a flat neutral spine)',
      'Using body bounce/momentum to jerk the weights up',
      'Pulling weights to the chest instead of lower ribs'
    ],
    easierModification: 'Use lighter dumbbells or do single-arm row supported on a chair.',
    harderProgression: 'Add a 2-second squeeze at the peak of each rep.',
    replacementIds: ['band-rows', 'prone-y-t-w', 'pullups'],
    illustrationType: 'row'
  },
  {
    id: 'band-rows',
    name: 'Resistance Band Rows',
    category: 'upper_body',
    difficulty: 'beginner',
    equipment: ['bands'],
    primaryMuscles: ['Lats', 'Upper Back'],
    secondaryMuscles: ['Biceps', 'Forearms'],
    instructions: [
      'Sit on the floor with legs extended, loop resistance band securely around mid-feet.',
      'Hold one end of the band in each hand, sit tall with chest lifted.',
      'Pull elbows back along your ribs, squeezing shoulder blades together.',
      'Slowly release tension back to starting position.'
    ],
    setsReps: '3 sets × 12 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '12 reps',
    restSeconds: 45,
    commonMistakes: [
      'Slouching posture while pulling',
      'Letting the band snap arms forward quickly'
    ],
    easierModification: 'Sit with knees slightly bent or use a lighter resistance band.',
    harderProgression: 'Shorten band grip for greater tension.',
    replacementIds: ['bent-over-db-row', 'prone-y-t-w'],
    illustrationType: 'row'
  },
  {
    id: 'pullups',
    name: 'Pull-ups',
    category: 'upper_body',
    difficulty: 'advanced',
    equipment: ['pullup_bar'],
    primaryMuscles: ['Lats', 'Upper Back'],
    secondaryMuscles: ['Biceps', 'Forearms', 'Core'],
    instructions: [
      'Grip the pull-up bar with hands slightly wider than shoulder-width, palms facing away.',
      'Hang with arms fully extended and core engaged.',
      'Pull your chest up toward the bar by driving elbows down toward your hips.',
      'Lower under control to a full dead hang.'
    ],
    setsReps: '3 sets × 5–8 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '6 reps',
    restSeconds: 75,
    commonMistakes: [
      'Kicking legs or kipping with momentum',
      'Not going through full range of motion',
      'Shrugging shoulders into ears'
    ],
    easierModification: 'Use a resistance band looped around knees/feet for assistance.',
    harderProgression: 'Slow 4-second eccentric lowers.',
    replacementIds: ['bent-over-db-row', 'band-rows'],
    illustrationType: 'row'
  },

  // LOWER BODY (LEGS & GLUTES)
  {
    id: 'chair-box-squat',
    name: 'Chair / Box Squat',
    category: 'lower_body',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Calves'],
    instructions: [
      'Stand about 4–6 inches in front of a sturdy chair with feet shoulder-width apart, toes turned slightly out.',
      'Extend arms out in front for balance, brace core, and sit your hips back and down.',
      'Gently touch the chair seat with your glutes without collapsing all your weight.',
      'Drive through your heels to stand back up to tall posture.'
    ],
    setsReps: '3 sets × 10–12 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '10 reps',
    restSeconds: 45,
    commonMistakes: [
      'Letting knees cave inward',
      'Plumping down onto the chair instead of controlling descent',
      'Lifting heels off the ground'
    ],
    easierModification: 'Place a cushion on the chair to elevate seat height.',
    harderProgression: 'Bodyweight Air Squats without chair assistance.',
    replacementIds: ['bodyweight-squats', 'glute-bridges'],
    illustrationType: 'squat'
  },
  {
    id: 'bodyweight-squats',
    name: 'Bodyweight Air Squats',
    category: 'lower_body',
    difficulty: 'beginner',
    equipment: ['none'],
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core'],
    instructions: [
      'Stand tall with feet shoulder-width apart, toes turned slightly outward 15–30 degrees.',
      'Send hips back first, then bend knees to sink down until thighs are at least parallel to the floor.',
      'Keep chest elevated and spine neutral throughout.',
      'Push through full foot (especially heels and midfoot) to stand upright.'
    ],
    setsReps: '3 sets × 12–15 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '12 reps',
    restSeconds: 45,
    commonMistakes: [
      'Knees collapsing inward (keep knees tracking over 2nd and 3rd toes)',
      'Rounding the lower back at the bottom',
      'Rising on toes'
    ],
    easierModification: 'Chair box squat.',
    harderProgression: 'Dumbbell Goblet Squat or Jump Squat.',
    replacementIds: ['chair-box-squat', 'goblet-squat-db', 'reverse-lunges'],
    illustrationType: 'squat'
  },
  {
    id: 'goblet-squat-db',
    name: 'Dumbbell Goblet Squats',
    category: 'lower_body',
    difficulty: 'intermediate',
    equipment: ['dumbbells', 'kettlebell'],
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Core', 'Upper Back', 'Hamstrings'],
    instructions: [
      'Hold a single dumbbell or kettlebell vertically against your chest with both hands under the top plate.',
      'Position feet shoulder-width apart, toes slightly angled out.',
      'Squat down deeply between your knees while maintaining an upright chest.',
      'Push the ground away to stand back up, squeezing glutes at the top.'
    ],
    setsReps: '3 sets × 10–12 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '10 reps',
    restSeconds: 60,
    commonMistakes: [
      'Letting the weight pull your upper body forward',
      'Knees caving inward',
      'Half-reps'
    ],
    easierModification: 'Bodyweight air squats.',
    harderProgression: 'Increase dumbbell weight or pause 2 seconds at bottom.',
    replacementIds: ['bodyweight-squats', 'bulgarian-split-squats'],
    illustrationType: 'squat'
  },
  {
    id: 'glute-bridges',
    name: 'Floor Glute Bridges',
    category: 'lower_body',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Glutes', 'Hamstrings'],
    secondaryMuscles: ['Core', 'Lower Back'],
    instructions: [
      'Lie on your back with knees bent at 90 degrees and feet flat on the floor hip-width apart.',
      'Rest arms flat by your sides, palms facing down.',
      'Squeeze your glutes and push through your heels to raise your hips until knees, hips, and shoulders form a straight line.',
      'Hold at the top for 2 seconds, then lower gently to the mat.'
    ],
    setsReps: '3 sets × 12–15 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '12 reps',
    restSeconds: 45,
    commonMistakes: [
      'Over-arching lower back at the top (keep ribs locked down)',
      'Pushing through toes instead of heels',
      'Rushing through reps without squeezing glutes'
    ],
    easierModification: 'Slightly shorter range of motion.',
    harderProgression: 'Single-leg glute bridge or hold a dumbbell on your hips.',
    replacementIds: ['single-leg-glute-bridge', 'bodyweight-squats', 'bird-dog'],
    illustrationType: 'bridge'
  },
  {
    id: 'single-leg-glute-bridge',
    name: 'Single-Leg Glute Bridge',
    category: 'lower_body',
    difficulty: 'intermediate',
    equipment: ['none'],
    primaryMuscles: ['Glutes', 'Hamstrings'],
    secondaryMuscles: ['Core', 'Hip Stabilizers'],
    instructions: [
      'Lie on your back with knees bent and feet flat on floor.',
      'Lift one leg off the ground, extending it straight out or tucking knee toward chest.',
      'Push through the working heel to drive hips upward until locked in line.',
      'Lower under control and repeat all reps on one side before switching.'
    ],
    setsReps: '3 sets × 8–10 reps per leg',
    defaultSets: 3,
    defaultRepsOrSeconds: '8 reps each',
    restSeconds: 45,
    commonMistakes: [
      'Hips tilting to one side (keep pelvis level)',
      'Straining lower back'
    ],
    easierModification: 'Standard two-leg glute bridge.',
    harderProgression: 'Elevate working foot onto a step or couch.',
    replacementIds: ['glute-bridges', 'reverse-lunges'],
    illustrationType: 'bridge'
  },
  {
    id: 'reverse-lunges',
    name: 'Alternating Reverse Lunges',
    category: 'lower_body',
    difficulty: 'beginner',
    equipment: ['none'],
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core'],
    instructions: [
      'Stand tall with feet together and hands on hips or together in front of chest.',
      'Step backward with your right leg and lower both knees until both bend at roughly 90 degrees.',
      'Your back knee should hover 1–2 inches off the floor with front knee tracking directly over ankle.',
      'Push through your front heel to return to standing, then alternate sides.'
    ],
    setsReps: '3 sets × 10 reps total (5 each leg)',
    defaultSets: 3,
    defaultRepsOrSeconds: '10 reps',
    restSeconds: 45,
    commonMistakes: [
      'Front knee shooting too far forward past toes',
      'Banging back knee hard onto the floor',
      'Leaning torso forward or wobbling sideways'
    ],
    easierModification: 'Hold onto a wall, chair, or door frame for balance support.',
    harderProgression: 'Walking lunges or hold a dumbbell in each hand.',
    replacementIds: ['bodyweight-squats', 'chair-box-squat', 'glute-bridges'],
    illustrationType: 'lunge'
  },
  {
    id: 'bulgarian-split-squats',
    name: 'Bulgarian Split Squats',
    category: 'lower_body',
    difficulty: 'advanced',
    equipment: ['none'],
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Core'],
    instructions: [
      'Stand about two feet in front of a sturdy couch or chair, facing away.',
      'Place the top of your right foot flat on the seat behind you.',
      'Lower your hips straight down by bending your front knee until front thigh is parallel to the ground.',
      'Drive up through the front heel to return to start.'
    ],
    setsReps: '3 sets × 8 reps per leg',
    defaultSets: 3,
    defaultRepsOrSeconds: '8 reps each',
    restSeconds: 60,
    commonMistakes: [
      'Standing too close to the couch, cramping the front knee',
      'Collapsing the front knee inward'
    ],
    easierModification: 'Static split squat with both feet on floor.',
    harderProgression: 'Hold dumbbells in each hand.',
    replacementIds: ['reverse-lunges', 'bodyweight-squats'],
    illustrationType: 'lunge'
  },
  {
    id: 'standing-calf-raises',
    name: 'Standing Calf Raises',
    category: 'lower_body',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Calves'],
    secondaryMuscles: ['Ankles', 'Feet'],
    instructions: [
      'Stand tall with feet hip-width apart near a wall for light finger-touch balance.',
      'Slowly rise as high as you can onto the balls of your feet and toes.',
      'Hold the peak contraction for 1–2 seconds.',
      'Lower heels slowly until they touch the floor with control.'
    ],
    setsReps: '3 sets × 15–20 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '15 reps',
    restSeconds: 30,
    commonMistakes: [
      'Bouncing rapidly without pausing at the top',
      'Rolling ankles outward'
    ],
    easierModification: 'Seated calf raises with hands pressing on knees.',
    harderProgression: 'Single-leg calf raises on the edge of a stair step.',
    replacementIds: ['bodyweight-squats', 'chair-box-squat'],
    illustrationType: 'squat'
  },

  // CORE & ABDOMINALS
  {
    id: 'deadbug',
    name: 'Dead Bug',
    category: 'core',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Deep Core', 'Transverse Abdominis'],
    secondaryMuscles: ['Hip Flexors', 'Lower Back'],
    instructions: [
      'Lie on your back with arms reaching straight toward ceiling and knees bent at 90 degrees (tabletop position).',
      'Press your lower back firmly into the floor so there is zero gap.',
      'Slowly extend right arm overhead while straightening left leg forward, hovering just above floor.',
      'Keep your lower back glued to the floor. Return to start and repeat with opposite limbs.'
    ],
    setsReps: '3 sets × 10 reps (5 each side)',
    defaultSets: 3,
    defaultRepsOrSeconds: '10 reps',
    restSeconds: 45,
    commonMistakes: [
      'Allowing the lower back to arch off the floor',
      'Moving too fast without core control',
      'Holding your breath'
    ],
    easierModification: 'Tap heels to floor with knees bent instead of extending leg straight.',
    harderProgression: 'Hold light 2 lb dumbbells or add an isometric pause.',
    replacementIds: ['bird-dog', 'forearm-plank'],
    illustrationType: 'crunch'
  },
  {
    id: 'bird-dog',
    name: 'Bird-Dog',
    category: 'core',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Core', 'Lower Back', 'Glutes'],
    secondaryMuscles: ['Shoulders', 'Hamstrings'],
    instructions: [
      'Begin on all fours on a yoga mat with wrists under shoulders and knees directly under hips.',
      'Keep your spine neutral and brace your abdominal wall.',
      'Simultaneously reach your right arm straight forward and left leg straight back until parallel to the floor.',
      'Hold for 2 seconds while keeping hips level, return to start, and alternate sides.'
    ],
    setsReps: '3 sets × 10 reps (5 each side)',
    defaultSets: 3,
    defaultRepsOrSeconds: '10 reps',
    restSeconds: 45,
    commonMistakes: [
      'Rotating or tilting hips to the side',
      'Arching the lower back excessively',
      'Craning the neck up'
    ],
    easierModification: 'Lift only one arm or only one leg at a time.',
    harderProgression: 'Bring elbow and knee together under torso to touch between reps.',
    replacementIds: ['deadbug', 'superman-hold'],
    illustrationType: 'bird_dog'
  },
  {
    id: 'forearm-plank',
    name: 'Forearm Plank',
    category: 'core',
    difficulty: 'beginner',
    equipment: ['none'],
    primaryMuscles: ['Core', 'Transverse Abdominis'],
    secondaryMuscles: ['Shoulders', 'Glutes', 'Quads'],
    instructions: [
      'Place forearms on the floor with elbows directly beneath shoulders and arms parallel.',
      'Step feet back and lift body into a straight, rigid line from head to heels.',
      'Squeeze glutes, tuck pelvis slightly, and brace abs like you are expecting a gentle punch.',
      'Breathe steadily and hold without sagging.'
    ],
    setsReps: '3 sets × 20–30 seconds',
    defaultSets: 3,
    defaultRepsOrSeconds: '30 seconds',
    isTimed: true,
    timeInSeconds: 30,
    restSeconds: 45,
    commonMistakes: [
      'Sagging lower back (puts strain on lumbar spine)',
      'Piking hips too high in the air',
      'Holding breath'
    ],
    easierModification: 'Knee plank with knees resting on mat.',
    harderProgression: 'Single-leg plank or plank shoulder taps.',
    replacementIds: ['deadbug', 'bird-dog', 'side-plank'],
    illustrationType: 'plank'
  },
  {
    id: 'side-plank',
    name: 'Side Plank',
    category: 'core',
    difficulty: 'intermediate',
    equipment: ['none'],
    primaryMuscles: ['Obliques', 'Deep Core'],
    secondaryMuscles: ['Shoulders', 'Glute Medius'],
    instructions: [
      'Lie on your right side with legs straight and feet stacked.',
      'Prop your upper body up on your right elbow, positioned directly under your right shoulder.',
      'Lift hips off the floor until your body forms a straight diagonal line from head to feet.',
      'Hold position while breathing normally, then repeat on opposite side.'
    ],
    setsReps: '3 sets × 20 seconds per side',
    defaultSets: 3,
    defaultRepsOrSeconds: '20s each',
    isTimed: true,
    timeInSeconds: 20,
    restSeconds: 45,
    commonMistakes: [
      'Hips dropping down toward the floor',
      'Top shoulder rolling forward',
      'Elbow placed too far forward away from shoulder'
    ],
    easierModification: 'Bend bottom knee at 90 degrees on floor for knee side plank.',
    harderProgression: 'Lift top leg into a side plank star hold.',
    replacementIds: ['forearm-plank', 'deadbug'],
    illustrationType: 'plank'
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'cardio',
    difficulty: 'beginner',
    equipment: ['none'],
    primaryMuscles: ['Core', 'Hip Flexors'],
    secondaryMuscles: ['Shoulders', 'Cardiovascular System'],
    instructions: [
      'Start in a strong high push-up plank position with hands under shoulders.',
      'Drive right knee forward toward your chest, keeping hips level.',
      'Quickly switch legs, stepping right foot back while driving left knee forward.',
      'Maintain a controlled, rhythmic pace while keeping shoulders stable.'
    ],
    setsReps: '3 sets × 30 seconds',
    defaultSets: 3,
    defaultRepsOrSeconds: '30 seconds',
    isTimed: true,
    timeInSeconds: 30,
    restSeconds: 45,
    commonMistakes: [
      'Bouncing hips high in the air',
      'Shoulders drifting back behind wrists',
      'Moving too fast with chaotic form'
    ],
    easierModification: 'Slow marching climbers with hands on an elevated surface like a sofa.',
    harderProgression: 'Cross-body mountain climbers driving knee to opposite elbow.',
    replacementIds: ['forearm-plank', 'jumping-jacks', 'high-knees-march'],
    illustrationType: 'plank'
  },

  // CARDIO & HIGH ENERGY
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks (or Step Jacks)',
    category: 'cardio',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Cardiovascular System', 'Calves'],
    secondaryMuscles: ['Shoulders', 'Glutes'],
    instructions: [
      'Stand tall with feet together and arms resting at your sides.',
      'Jump feet out wide while swinging arms overhead in an arc until hands touch or near touch.',
      'Jump feet back together and return arms to sides.',
      'Land softly on the balls of your feet with knees slightly bent to absorb impact.'
    ],
    setsReps: '3 sets × 30 seconds',
    defaultSets: 3,
    defaultRepsOrSeconds: '30 seconds',
    isTimed: true,
    timeInSeconds: 30,
    restSeconds: 30,
    commonMistakes: [
      'Landing heavily with stiff locked knees',
      'Arms flopping carelessly'
    ],
    easierModification: 'Step Jacks: Step one foot out to the side at a time (zero jumping impact).',
    harderProgression: 'Increase tempo or switch to seal jacks / star jumps.',
    replacementIds: ['high-knees-march', 'butt-kicks', 'mountain-climbers'],
    illustrationType: 'jumping_jack'
  },
  {
    id: 'high-knees-march',
    name: 'Standing High Knees March',
    category: 'cardio',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Cardiovascular System', 'Hip Flexors'],
    secondaryMuscles: ['Core', 'Calves'],
    instructions: [
      'Stand upright with feet hip-width apart and chest proud.',
      'Drive right knee up toward chest until thigh is parallel to the ground while pumping opposite arm.',
      'Step down softly and immediately drive the left knee up.',
      'Keep your core engaged to prevent torso from leaning backward.'
    ],
    setsReps: '3 sets × 30 seconds',
    defaultSets: 3,
    defaultRepsOrSeconds: '30 seconds',
    isTimed: true,
    timeInSeconds: 30,
    restSeconds: 30,
    commonMistakes: [
      'Leaning backward when lifting knees',
      'Slumping shoulders forward'
    ],
    easierModification: 'Gentle stationary marching at a comfortable conversational pace.',
    harderProgression: 'Jogging high knees with continuous light bounce.',
    replacementIds: ['jumping-jacks', 'mountain-climbers'],
    illustrationType: 'jumping_jack'
  },
  {
    id: 'butt-kicks',
    name: 'Butt Kicks',
    category: 'cardio',
    difficulty: 'beginner',
    equipment: ['none'],
    primaryMuscles: ['Hamstrings', 'Cardiovascular System'],
    secondaryMuscles: ['Quadriceps stretch', 'Calves'],
    instructions: [
      'Stand with feet hip-width apart and arms in a runner’s guard.',
      'Jog in place, kicking your heels up toward your glutes with each step.',
      'Stay light on the balls of your feet with upright posture.'
    ],
    setsReps: '3 sets × 30 seconds',
    defaultSets: 3,
    defaultRepsOrSeconds: '30 seconds',
    isTimed: true,
    timeInSeconds: 30,
    restSeconds: 30,
    commonMistakes: [
      'Leaning too far forward',
      'Hard heel stomping'
    ],
    easierModification: 'Step-kick stationary march without jumping.',
    harderProgression: 'Fast high-cadence butt kicks.',
    replacementIds: ['high-knees-march', 'jumping-jacks'],
    illustrationType: 'jumping_jack'
  },
  {
    id: 'shadow-boxing',
    name: 'Shadow Boxing Combos',
    category: 'cardio',
    difficulty: 'beginner',
    equipment: ['none'],
    primaryMuscles: ['Cardiovascular System', 'Shoulders'],
    secondaryMuscles: ['Core', 'Back', 'Calves'],
    instructions: [
      'Adopt an athletic boxing stance: left foot forward, right foot slightly back, knees soft, hands guarding chin.',
      'Throw smooth alternating jabs and crosses, rotating hips and core into each strike.',
      'Keep punches crisp, extending to 95% without hyper-extending the elbow.',
      'Keep feet bouncing lightly.'
    ],
    setsReps: '3 sets × 45 seconds',
    defaultSets: 3,
    defaultRepsOrSeconds: '45 seconds',
    isTimed: true,
    timeInSeconds: 45,
    restSeconds: 30,
    commonMistakes: [
      'Locking elbows out forcefully at full extension',
      'Standing flat-footed with stiff hips'
    ],
    easierModification: 'Perform punches while standing still with feet grounded.',
    harderProgression: 'Add bobbing and weaving or hold 1-2 lb water bottles.',
    replacementIds: ['jumping-jacks', 'high-knees-march'],
    illustrationType: 'press'
  },

  // MOBILITY & STRETCHES (Warm-up & Cooldown)
  {
    id: 'cat-cow-stretch',
    name: 'Cat-Cow Mobility Flow',
    category: 'mobility',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Spine', 'Neck', 'Torso'],
    secondaryMuscles: ['Abdominals', 'Shoulders'],
    instructions: [
      'Start on hands and knees with wrists under shoulders and knees under hips.',
      'Inhale: Arch back gently, drop belly toward floor, and gaze softly upward (Cow pose).',
      'Exhale: Tuck chin to chest, round spine upward toward ceiling, drawing navel inward (Cat pose).',
      'Flow smoothly between both shapes with your natural breath.'
    ],
    setsReps: '2 sets × 8 gentle cycles',
    defaultSets: 2,
    defaultRepsOrSeconds: '8 cycles',
    restSeconds: 30,
    commonMistakes: [
      'Forcing movement through sharp neck snapping',
      'Rushing without deep breathing'
    ],
    easierModification: 'Seated cat-cow on a chair.',
    harderProgression: 'Add gentle thoracic reach-through twists.',
    replacementIds: ['childs-pose', 'bird-dog'],
    illustrationType: 'stretch'
  },
  {
    id: 'arm-circles-hug',
    name: 'Arm Circles & Chest Openers',
    category: 'mobility',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Shoulders', 'Chest'],
    secondaryMuscles: ['Upper Back'],
    instructions: [
      'Stand tall with feet shoulder-width apart and arms outstretched to sides at shoulder height.',
      'Make 15 slow forward circles, gradually increasing circle size.',
      'Reverse for 15 backward circles.',
      'Finish with 10 wide chest opener swings: open arms wide, then wrap arms around chest in a gentle hug.'
    ],
    setsReps: '2 sets × 30 seconds',
    defaultSets: 2,
    defaultRepsOrSeconds: '30 seconds',
    isTimed: true,
    timeInSeconds: 30,
    restSeconds: 20,
    commonMistakes: [
      'Moving jerky or too fast',
      'Shrugging shoulders into ears'
    ],
    easierModification: 'Smaller radius circles or seated.',
    harderProgression: 'Hold light tension band across hands.',
    replacementIds: ['cat-cow-stretch', 'prone-y-t-w'],
    illustrationType: 'stretch'
  },
  {
    id: 'hip-circles-warmup',
    name: 'Standing Hip Openers & Circles',
    category: 'mobility',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Hips', 'Glutes'],
    secondaryMuscles: ['Lower Back', 'Core balance'],
    instructions: [
      'Stand tall with hands on hips (lightly touch wall for balance if needed).',
      'Lift right knee up in front, rotate it out to the side like opening a gate, and step down.',
      'Repeat 8 times opening the gate, then 8 times reversing (closing gate).',
      'Switch to left leg and repeat.'
    ],
    setsReps: '2 sets × 8 each leg',
    defaultSets: 2,
    defaultRepsOrSeconds: '8 reps each',
    restSeconds: 20,
    commonMistakes: [
      'Twisting entire torso instead of rotating at the hip joint',
      'Losing balance by lifting too abruptly'
    ],
    easierModification: 'Stand firmly holding a counter with both hands.',
    harderProgression: 'Perform without touching floor between circles.',
    replacementIds: ['glute-bridges', 'cat-cow-stretch'],
    illustrationType: 'stretch'
  },
  {
    id: 'childs-pose',
    name: 'Child’s Pose Stretch',
    category: 'mobility',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Lats', 'Hips', 'Lower Back'],
    secondaryMuscles: ['Shoulders', 'Ankles'],
    instructions: [
      'Kneel on the floor with big toes touching and knees spread wider than hips.',
      'Sit your hips back toward your heels and fold your torso forward between your thighs.',
      'Walk your hands forward on the mat, resting your forehead gently on the ground.',
      'Take slow, deep diaphragmatic breaths, feeling your ribcage expand.'
    ],
    setsReps: '1 set × 45 seconds',
    defaultSets: 1,
    defaultRepsOrSeconds: '45 seconds',
    isTimed: true,
    timeInSeconds: 45,
    restSeconds: 30,
    commonMistakes: [
      'Lifting hips if knees feel pinched (place a cushion behind knees for comfort)',
      'Tensing shoulders'
    ],
    easierModification: 'Place a folded blanket or pillow under hips or chest.',
    harderProgression: 'Walk hands 30 degrees to the left for a lat stretch, then to the right.',
    replacementIds: ['cat-cow-stretch', 'hamstring-stretch'],
    illustrationType: 'stretch'
  },
  {
    id: 'hamstring-stretch',
    name: 'Standing / Seated Hamstring Stretch',
    category: 'mobility',
    difficulty: 'complete_beginner',
    equipment: ['none'],
    primaryMuscles: ['Hamstrings'],
    secondaryMuscles: ['Calves', 'Lower Back'],
    instructions: [
      'Extend right heel forward on the floor with toes pointed up and knee soft.',
      'Hinge back at the hips, keeping your chest open and back flat.',
      'Rest hands lightly on the bent left thigh (never push directly on the knee joint).',
      'Feel a gentle, comfortable stretch down the back of the right thigh. Hold for 25 seconds, then switch.'
    ],
    setsReps: '2 sets × 25 seconds per side',
    defaultSets: 2,
    defaultRepsOrSeconds: '25s each',
    isTimed: true,
    timeInSeconds: 25,
    restSeconds: 20,
    commonMistakes: [
      'Rounding back to touch toes',
      'Locking knee joint backwards',
      'Bouncing during stretch'
    ],
    easierModification: 'Sit on edge of chair and extend one leg forward.',
    harderProgression: 'Deepen hip hinge while maintaining straight back.',
    replacementIds: ['childs-pose', 'cat-cow-stretch'],
    illustrationType: 'stretch'
  },
  {
    id: 'overhead-db-press',
    name: 'Dumbbell Overhead Shoulder Press',
    category: 'upper_body',
    difficulty: 'intermediate',
    equipment: ['dumbbells'],
    primaryMuscles: ['Shoulders', 'Deltoids'],
    secondaryMuscles: ['Triceps', 'Upper Traps', 'Core'],
    instructions: [
      'Stand with feet hip-width apart or sit tall in a sturdy chair.',
      'Hold dumbbells at shoulder height, palms facing forward or inward.',
      'Brace core and press weights straight overhead until arms are extended but not locked.',
      'Lower under control back to shoulder level.'
    ],
    setsReps: '3 sets × 10 reps',
    defaultSets: 3,
    defaultRepsOrSeconds: '10 reps',
    restSeconds: 60,
    commonMistakes: [
      'Arching lower back excessively to heave weights up',
      'Flaring ribs out',
      'Dropping weights too fast'
    ],
    easierModification: 'Seated press with lighter dumbbells or band press.',
    harderProgression: 'Single-arm overhead press standing.',
    replacementIds: ['floor-chest-press-db', 'standard-pushups'],
    illustrationType: 'press'
  }
];

function determineCategory(ex: any): ExerciseCategory {
  const id = ex.id || '';
  const primary = (ex.primaryMuscles || []).map((m: string) => m.toLowerCase()).join(' ');

  if (id === 'burpees' || id === 'step-back-burpees' || id === 'bear-crawl') {
    return 'Full Body';
  }
  if (ex.category === 'warmup' || ex.category === 'cooldown' || id.includes('stretch') || id.includes('pose') || id.includes('cat-cow') || id.includes('circles')) {
    return 'Mobility';
  }
  if (id === 'pike-pushups' || id.includes('overhead-press') || id.includes('lateral-deltoid') || primary.includes('deltoids')) {
    return 'Shoulders';
  }
  if (id === 'diamond-pushups' || id.includes('dip') || id.includes('bicep') || id.includes('tricep') || primary.includes('biceps') || primary.includes('triceps')) {
    return 'Arms';
  }
  if (primary.includes('chest') || id.includes('pushup') || id.includes('floor-press')) {
    return 'Chest';
  }
  if (primary.includes('lats') || primary.includes('upper back') || primary.includes('back') || id.includes('row') || id.includes('pullup') || id.includes('superman') || id.includes('y-t-w')) {
    return 'Back';
  }
  if (primary.includes('glutes') || id.includes('bridge') || id.includes('donkey') || id.includes('fire-hydrant')) {
    return 'Glutes';
  }
  if (primary.includes('quadriceps') || primary.includes('hamstrings') || primary.includes('calves') || id.includes('squat') || id.includes('lunge') || id.includes('calf')) {
    return 'Legs';
  }
  if (primary.includes('core') || primary.includes('abdominis') || id.includes('plank') || id.includes('deadbug') || id.includes('bird-dog') || id.includes('russian')) {
    return 'Core';
  }
  if (ex.category === 'cardio' || id.includes('jumping') || id.includes('high-knees') || id.includes('mountain-climbers') || id.includes('shadow-box') || id.includes('butt-kicks')) {
    return 'Cardio';
  }
  return 'Full Body';
}

function determineSuitableGoals(cat: ExerciseCategory): FitnessGoal[] {
  if (cat === 'Mobility') {
    return ['mobility', 'fitness'];
  }
  if (cat === 'Cardio') {
    return ['fat_loss', 'fitness', 'quick', 'full_body'];
  }
  if (cat === 'Core') {
    return ['strength', 'fitness', 'fat_loss', 'muscle', 'full_body'];
  }
  return ['strength', 'muscle', 'fitness', 'fat_loss', 'full_body'];
}

export const EXERCISES: Exercise[] = RAW_EXERCISES.map((ex) => {
  const isJumping = ex.id === 'jumping-jacks' || ex.illustrationType === 'jumping_jack';
  const category = determineCategory(ex);
  return {
    ...ex,
    exerciseCategory: category,
    suitableGoals: ex.suitableGoals ?? determineSuitableGoals(category),
    isLowImpact: ex.isLowImpact ?? !isJumping,
    isApartmentFriendly: ex.isApartmentFriendly ?? !isJumping,
    imageUrl: ex.imageUrl || getExerciseImageUrl(ex.id, ex.illustrationType)
  };
});

export const GOAL_DETAILS = {
  strength: {
    title: 'Build Strength',
    description: 'Develop fundamental bodyweight and resistance power for functional daily vitality.',
    iconName: 'Dumbbell',
    badge: 'Pure Power'
  },
  muscle: {
    title: 'Build Muscle',
    description: 'Stimulate muscular hypertrophy with progressive volume and time-under-tension.',
    iconName: 'Biceps',
    badge: 'Hypertrophy'
  },
  fitness: {
    title: 'Improve Fitness',
    description: 'Boost overall endurance, stamina, and heart-lung conditioning from your living room.',
    iconName: 'HeartPulse',
    badge: 'Vitality'
  },
  fat_loss: {
    title: 'Lose Body Fat',
    description: 'High-density circuits supporting active caloric expenditure and metabolic health.',
    iconName: 'Flame',
    badge: 'Calorie Burn'
  },
  mobility: {
    title: 'Improve Mobility',
    description: 'Free up stiff joints, improve posture, and alleviate aches from desk sitting.',
    iconName: 'Sparkles',
    badge: 'Flexibility'
  },
  full_body: {
    title: 'Full Body',
    description: 'Balanced compound movements that engage every major muscle group in one session.',
    iconName: 'Activity',
    badge: 'Balanced'
  },
  quick: {
    title: 'Quick Workout',
    description: 'Time-efficient, energizing mini-sessions for busy days when minutes matter.',
    iconName: 'Zap',
    badge: 'Express'
  }
};

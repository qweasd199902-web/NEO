import { Exercise, WorkoutDay } from '../types';

export const WORKOUT_DAYS: WorkoutDay[] = [
  {
    id: 'mon',
    nameRu: 'Понедельник',
    focusRu: 'Ноги, ахилловы сухожилия, колени, таз',
    isRestDay: false,
    estDurationMin: 28,
    exerciseIds: [
      'mon_calves_standing',
      'mon_toe_raises',
      'mon_shallow_squats',
      'mon_wall_sit',
      'mon_glute_bridge',
      'mon_side_leg_raise',
      'mon_bent_knee_raise',
      'mon_bent_knee_calves',
      'mon_reverse_lunges_support',
      'mon_back_leg_raise',
      'mon_single_leg_balance',
      'mon_standing_hamstring_curl'
    ],
    description: 'Укрепление коленных суставов, связок голеностопа, ахилловых сухожилий и мышц стабилизаторов таза.'
  },
  {
    id: 'tue',
    nameRu: 'Вторник',
    focusRu: 'Кисти, запястья, предплечья, хват',
    isRestDay: false,
    estDurationMin: 24,
    exerciseIds: [
      'tue_fist_clench',
      'tue_finger_spread',
      'tue_wrist_flexion',
      'tue_wrist_extension',
      'tue_forearm_pronation',
      'tue_forearm_supination',
      'tue_isometric_grip',
      'tue_wrist_circles',
      'tue_finger_opposition',
      'tue_towel_wring'
    ],
    description: 'Развитие абсолютной силы хвата, мобильности лучезапястных суставов и выносливости предплечий.'
  },
  {
    id: 'wed',
    nameRu: 'Среда',
    focusRu: 'Подвижность всего тела и дыхание',
    isRestDay: false,
    estDurationMin: 22,
    exerciseIds: [
      'wed_cat_cow',
      'wed_thoracic_rotations',
      'wed_shoulder_circles',
      'wed_wall_slides',
      'wed_pelvic_90_90',
      'wed_gentle_head_tilts',
      'wed_pelvis_circles',
      'wed_gentle_torso_tilts',
      'wed_diaphragmatic_breathing',
      'wed_extended_exhale_breathing',
      'wed_movement_breathing'
    ],
    description: 'Снятие осевой компрессии, раскрытие грудного отдела, улучшение вентиляции легких и восстановление.'
  },
  {
    id: 'thu',
    nameRu: 'Четверг',
    focusRu: 'Ноги, ахилловы сухожилия, колени, таз',
    isRestDay: false,
    estDurationMin: 26,
    exerciseIds: [
      'mon_calves_standing',
      'mon_shallow_squats',
      'mon_wall_sit',
      'mon_glute_bridge',
      'mon_bent_knee_calves',
      'mon_reverse_lunges_support',
      'mon_single_leg_balance',
      'mon_standing_hamstring_curl'
    ],
    description: 'Второй цикл укрепления нижних конечностей и связочного аппарата коленей и стоп.'
  },
  {
    id: 'fri',
    nameRu: 'Пятница',
    focusRu: 'Кисти, запястья, предплечья, плечи',
    isRestDay: false,
    estDurationMin: 25,
    exerciseIds: [
      'tue_fist_clench',
      'tue_finger_spread',
      'tue_wrist_flexion',
      'tue_wrist_extension',
      'tue_forearm_pronation',
      'tue_forearm_supination',
      'tue_isometric_grip',
      'wed_shoulder_circles',
      'wed_wall_slides',
      'tue_towel_wring'
    ],
    description: 'Комплексная работа над силой дистальных отделов рук, плечевым поясом и стабилизацией лопаток.'
  },
  {
    id: 'sat',
    nameRu: 'Суббота',
    focusRu: 'Общая подвижность и лёгкая выносливость',
    isRestDay: false,
    estDurationMin: 20,
    exerciseIds: [
      'sat_foot_circles',
      'wed_pelvis_circles',
      'wed_gentle_torso_tilts',
      'sat_wrist_mobility',
      'sat_march_in_place',
      'sat_side_steps',
      'sat_alternating_knees',
      'sat_calm_walk_in_place'
    ],
    description: 'Аэробная подзарядка сердечно-сосудистой системы, лимфодренаж и суставная разминка.'
  },
  {
    id: 'sun',
    nameRu: 'Воскресенье',
    focusRu: 'Отдых и суперкомпенсация',
    isRestDay: true,
    estDurationMin: 10,
    exerciseIds: [
      'sun_full_rest',
      'wed_diaphragmatic_breathing',
      'extra_stretch'
    ],
    description: 'Священный день покоя кибернетического организма. Мышцы растут и адаптируются в покое.'
  }
];

export const ALL_EXERCISES: Exercise[] = [
  // --- ПОНЕДЕЛЬНИК / ЧЕТВЕРГ (НОГИ) ---
  {
    id: 'mon_calves_standing',
    name: 'Подъёмы на носки стоя',
    dayId: 'mon',
    category: 'legs',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 15,
    defaultDurationSec: 0,
    restSec: 45,
    targetMuscles: ['Икроножные мышцы', 'Камбаловидная мышца'],
    targetJoints: ['Голеностопный сустав', 'Ахиллово сухожилие'],
    instructions: [
      'Встаньте прямо, стопы на ширине таза. При необходимости держитесь за стену или спинку стула.',
      'Медленно поднимитесь на носки как можно выше, задержитесь в верхней точке на 1–2 секунды.',
      'Плавно опуститесь на всю стопу, контролируя движение. Не падайте на пятки.'
    ],
    techniqueNotes: 'Избегайте рывков. Движение строго вверх, равномерное распределение веса между подушечками большого пальца и мизинца.',
    rewards: { xp: 15, credits: 8, statType: 'strength', statXp: 3 },
    svgType: 'calves_standing'
  },
  {
    id: 'mon_toe_raises',
    name: 'Подъёмы носков на себя',
    dayId: 'mon',
    category: 'legs',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 15,
    defaultDurationSec: 0,
    restSec: 40,
    targetMuscles: ['Передняя большеберцовая мышца'],
    targetJoints: ['Голеностопный сустав'],
    instructions: [
      'Встаньте с опорой спиной о стену или сидя на стуле, пятки на полу.',
      'Энергично поднимите носки вверх к голени, оставляя пятки прижатыми к полу.',
      'Задержитесь на 1 секунду в напряжении и плавно опустите.'
    ],
    techniqueNotes: 'Критически важное упражнение для профилактики болей в голени и стабилизации стопы при ходьбе.',
    rewards: { xp: 12, credits: 6, statType: 'mobility', statXp: 2 },
    svgType: 'toe_raises'
  },
  {
    id: 'mon_shallow_squats',
    name: 'Неглубокие приседания',
    dayId: 'mon',
    category: 'legs',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 60,
    targetMuscles: ['Квадрицепсы', 'Большая ягодичная мышца'],
    targetJoints: ['Коленные суставы', 'Тазобедренные суставы'],
    instructions: [
      'Поставьте ноги чуть шире плеч, носки слегка разведены наружу.',
      'Отводя таз назад, выполните плавное приседание до комфортного угла (~60-70 градусов в коленях).',
      'Надавливая всей стопой в пол, вернитесь в исходное положение.'
    ],
    techniqueNotes: 'Колени двигаются сонаправленно со стопами. Не заваливайте колени внутрь! Спина прямая, грудь приподнята.',
    rewards: { xp: 20, credits: 12, statType: 'strength', statXp: 5 },
    svgType: 'squats'
  },
  {
    id: 'mon_wall_sit',
    name: 'Статический полуприсед у стены',
    dayId: 'mon',
    category: 'legs',
    type: 'timer',
    defaultSets: 3,
    defaultReps: 1,
    defaultDurationSec: 30,
    restSec: 60,
    targetMuscles: ['Квадрицепсы', 'Ягодичные', 'Связки надколенника'],
    targetJoints: ['Коленные суставы'],
    instructions: [
      'Прислонитесь спиной к стене и опуститесь вниз, скользя спиной, до угла в коленях 60-90 градусов.',
      'Прижмите поясницу к стене, руки свободно опустите или положите на бедра.',
      'Удерживайте статическое положение, сохраняя ровное глубокое дыхание.'
    ],
    techniqueNotes: 'Не задерживайте дыхание! Колени не должны выходить далеко вперед за проекцию носков.',
    rewards: { xp: 22, credits: 14, statType: 'endurance', statXp: 4 },
    svgType: 'wall_sit'
  },
  {
    id: 'mon_glute_bridge',
    name: 'Ягодичный мостик',
    dayId: 'mon',
    category: 'legs',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 15,
    defaultDurationSec: 0,
    restSec: 45,
    targetMuscles: ['Большая ягодичная мышца', 'Задняя поверхность бедра'],
    targetJoints: ['Тазобедренные суставы', 'Поясничный отдел'],
    instructions: [
      'Лягте на спину, согните ноги в коленях, стопы на ширине плеч близко к тазу.',
      'Напрягая ягодицы, вытолкните таз вверх до образования прямой линии от колен до плеч.',
      'Задержитесь на 1-2 секунды в пике сокращения и плавно опуститесь, не расслабляя мышцы полностью.'
    ],
    techniqueNotes: 'Подъем выполняется силой ягодиц, а не за счет прогиба в пояснице.',
    rewards: { xp: 18, credits: 10, statType: 'strength', statXp: 4 },
    svgType: 'glute_bridge'
  },
  {
    id: 'mon_side_leg_raise',
    name: 'Отведение ноги в сторону',
    dayId: 'mon',
    category: 'legs',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 45,
    targetMuscles: ['Средняя ягодичная мышца', 'Отводящие мышцы бедра'],
    targetJoints: ['Тазобедренный сустав'],
    instructions: [
      'Стоя с опорой на стену или спинку стула, сохраняйте вертикальное положение корпуса.',
      'Плавно отведите прямую ногу строго в сторону на угол 30-45 градусов.',
      'Медленно верните ногу обратно, удерживая таз неподвижным.'
    ],
    techniqueNotes: 'Не наклоняйте корпус в противоположную сторону! Корпус стабилен, носок слегка развернут внутрь или прямо.',
    rewards: { xp: 16, credits: 8, statType: 'mobility', statXp: 3 },
    svgType: 'side_leg_raise'
  },
  {
    id: 'mon_bent_knee_raise',
    name: 'Подъём согнутого колена',
    dayId: 'mon',
    category: 'legs',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 40,
    targetMuscles: ['Подвздошно-поясничная мышца', 'Прямая мышца бедра'],
    targetJoints: ['Тазобедренный сустав'],
    instructions: [
      'Стоя прямо, поднимите согнутое под прямым углом колено до уровня таза или параллели с полом.',
      'Удерживайте баланс 1 секунду в верхней точке.',
      'Контролируемо опустите ногу.'
    ],
    techniqueNotes: 'Сохраняйте осанку, не округляйте поясницу.',
    rewards: { xp: 14, credits: 7, statType: 'mobility', statXp: 3 },
    svgType: 'knee_raise'
  },
  {
    id: 'mon_bent_knee_calves',
    name: 'Подъёмы на носки с согнутыми коленями',
    dayId: 'mon',
    category: 'legs',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 45,
    targetMuscles: ['Камбаловидная мышца (глубокий стабилизатор голени)'],
    targetJoints: ['Голеностоп', 'Ахиллово сухожилие'],
    instructions: [
      'Слегка согните ноги в коленях (угол около 30 градусов) и зафиксируйте этот сгиб.',
      'Не разгибая колен, поднимитесь на носки как можно выше.',
      'Плавно вернитесь в исходное положение, сохраняя сгиб в коленях.'
    ],
    techniqueNotes: 'Сгибание коленей изолирует камбаловидную мышцу, которая напрямую защищает ахиллово сухожилие от перегрузок.',
    rewards: { xp: 17, credits: 9, statType: 'strength', statXp: 4 },
    svgType: 'bent_knee_calves'
  },
  {
    id: 'mon_reverse_lunges_support',
    name: 'Обратные выпады с опорой',
    dayId: 'mon',
    category: 'legs',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultDurationSec: 0,
    restSec: 60,
    targetMuscles: ['Ягодицы', 'Квадрицепсы', 'Бицепс бедра'],
    targetJoints: ['Коленные суставы', 'Тазобедренные суставы'],
    instructions: [
      'Держитесь одной рукой за устойчивую опору.',
      'Сделайте комфортный шаг назад и плавно опуститесь, сгибая оба колена.',
      'Отталкиваясь передней пяткой, вернитесь в исходное положение.'
    ],
    techniqueNotes: 'Переднее колено не выходит за носок. Опора снимает избыточную нагрузку и позволяет контролировать баланс.',
    rewards: { xp: 20, credits: 11, statType: 'strength', statXp: 5 },
    svgType: 'lunges'
  },
  {
    id: 'mon_back_leg_raise',
    name: 'Отведение ноги назад',
    dayId: 'mon',
    category: 'legs',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 40,
    targetMuscles: ['Большая ягодичная мышца', 'Бицепс бедра'],
    targetJoints: ['Тазобедренный сустав'],
    instructions: [
      'Стоя лицом к стене или оперевшись руками о стол, слегка наклоните прямой корпус вперед.',
      'Плавно отведите прямую ногу назад силой ягодицы.',
      'Не допускайте гиперэкстензии и залома в пояснице.'
    ],
    techniqueNotes: 'Фокусируйтесь на пиковом сжатии ягодичной мышцы.',
    rewards: { xp: 15, credits: 8, statType: 'strength', statXp: 3 },
    svgType: 'back_leg_raise'
  },
  {
    id: 'mon_single_leg_balance',
    name: 'Удержание равновесия на одной ноге',
    dayId: 'mon',
    category: 'legs',
    type: 'timer',
    defaultSets: 3,
    defaultReps: 1,
    defaultDurationSec: 25,
    restSec: 40,
    targetMuscles: ['Мышцы-стабилизаторы стопы', 'Проприоцепторы связок'],
    targetJoints: ['Голеностоп', 'Колено'],
    instructions: [
      'Встаньте рядом со стеной для страховки. Приподнимите одну ногу от пола.',
      'Слегка смягчите опорное колено (не блокируйте сустав).',
      'Балансируйте за счет микродвижений стопы и голени.'
    ],
    techniqueNotes: 'Взгляд зафиксирован на одной точке перед собой. Укрепляет нервно-мышечную координацию суставов.',
    rewards: { xp: 18, credits: 10, statType: 'vitality', statXp: 4 },
    svgType: 'balance'
  },
  {
    id: 'mon_standing_hamstring_curl',
    name: 'Сгибание ноги назад стоя',
    dayId: 'mon',
    category: 'legs',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 40,
    targetMuscles: ['Двуглавая мышца бедра (подколенные сухожилия)'],
    targetJoints: ['Коленный сустав'],
    instructions: [
      'Стоя с ровной осанкой, согните одну ногу в колене, направляя пятку к ягодице.',
      'Удерживайте бедра на одной линии (колено не уходит вперед).',
      'Медленно опустите ногу.'
    ],
    techniqueNotes: 'Работа строго в коленном суставе, плавный контроль фазы опускания.',
    rewards: { xp: 15, credits: 8, statType: 'recovery', statXp: 3 },
    svgType: 'hamstring_curl'
  },

  // --- ВТОРНИК / ПЯТНИЦА (КИСТИ, ПРЕДПЛЕЧЬЯ, ХВАТ) ---
  {
    id: 'tue_fist_clench',
    name: 'Сжимание кулака',
    dayId: 'tue',
    category: 'grip',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 20,
    defaultDurationSec: 0,
    restSec: 30,
    targetMuscles: ['Глубокий сгибатель пальцев', 'Поверхностный сгибатель'],
    targetJoints: ['Суставы пальцев', 'Лучезапястный сустав'],
    instructions: [
      'Вытяните руки перед собой или опустите вдоль тела.',
      'С максимальным контролируемым усилием сожмите пальцы в плотный кулак на 1-2 секунды.',
      'Полностью расправьте ладонь.'
    ],
    techniqueNotes: 'Сжатие должно быть акцентированным, без болезненных ощущений.',
    rewards: { xp: 14, credits: 7, statType: 'grip', statXp: 4 },
    svgType: 'fist'
  },
  {
    id: 'tue_finger_spread',
    name: 'Раскрытие пальцев',
    dayId: 'tue',
    category: 'grip',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 15,
    defaultDurationSec: 0,
    restSec: 30,
    targetMuscles: ['Разгибатели пальцев', 'Межкостные мышцы кисти'],
    targetJoints: ['Суставы кисти'],
    instructions: [
      'Из нейтрального положения раскройте пальцы веером с усилием, растягивая межпальцевые промежутки.',
      'Задержите максимальное натяжение на 2 секунды.',
      'Расслабьте кисть.'
    ],
    techniqueNotes: 'Компенсирует постоянное сжатие мыши/смартфона и балансирует тонус разгибателей.',
    rewards: { xp: 12, credits: 6, statType: 'grip', statXp: 3 },
    svgType: 'finger_spread'
  },
  {
    id: 'tue_wrist_flexion',
    name: 'Сгибание запястья с сопротивлением',
    dayId: 'tue',
    category: 'grip',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 45,
    targetMuscles: ['Лучевой и локтевой сгибатели запястья'],
    targetJoints: ['Лучезапястный сустав'],
    instructions: [
      'Положите предплечье на бедро или стол ладонью вверх, кисть свисает с края.',
      'Вторую руку или легкий вес используйте как мягкое сопротивление.',
      'Поднимите кисть вверх, сгибая в запястье, затем плавно опустите.'
    ],
    techniqueNotes: 'Предплечье плотно прижато и не отрывается от поверхности.',
    rewards: { xp: 16, credits: 9, statType: 'grip', statXp: 5 },
    svgType: 'wrist_flexion'
  },
  {
    id: 'tue_wrist_extension',
    name: 'Разгибание запястья с сопротивлением',
    dayId: 'tue',
    category: 'grip',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 45,
    targetMuscles: ['Разгибатели запястья и кисти'],
    targetJoints: ['Лучезапястный сустав', 'Надколенник локтя'],
    instructions: [
      'Положите предплечье на опору ладонью вниз, кисть свисает.',
      'Преодолевая легкое сопротивление, поднимите тыльную сторону кисти вверх.',
      'Медленно вернитесь вниз в исходную позицию.'
    ],
    techniqueNotes: 'Профилактика туннельного синдрома и эпикондилита («локтя теннисиста»).',
    rewards: { xp: 16, credits: 9, statType: 'grip', statXp: 5 },
    svgType: 'wrist_extension'
  },
  {
    id: 'tue_forearm_pronation',
    name: 'Пронация предплечья',
    dayId: 'tue',
    category: 'grip',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 35,
    targetMuscles: ['Круглый и квадратный пронаторы'],
    targetJoints: ['Лучелоктевой сустав'],
    instructions: [
      'Согните руку в локте под 90 градусов, ладонь смотрит ребром вверх (нейтрально).',
      'Поверните предплечье внутрь так, чтобы ладонь развернулась строго вниз к полу.',
      'Плавно вернитесь в исходное положение.'
    ],
    techniqueNotes: 'Локоть прижат к боку и не совершает лишних движений.',
    rewards: { xp: 13, credits: 7, statType: 'mobility', statXp: 3 },
    svgType: 'pronation'
  },
  {
    id: 'tue_forearm_supination',
    name: 'Супинация предплечья',
    dayId: 'tue',
    category: 'grip',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 35,
    targetMuscles: ['Супинатор предплечья', 'Бицепс плеча'],
    targetJoints: ['Лучелоктевой сустав'],
    instructions: [
      'Локоть прижат к туловищу под прямым углом.',
      'Разверните предплечье наружу, раскрывая ладонь строго вверх к потолку.',
      'Задержитесь на секунду в крайнем положении и вернитесь.'
    ],
    techniqueNotes: 'Следите за плавной траекторией вращения лучевой кости.',
    rewards: { xp: 13, credits: 7, statType: 'mobility', statXp: 3 },
    svgType: 'supination'
  },
  {
    id: 'tue_isometric_grip',
    name: 'Изометрическое удержание хвата',
    dayId: 'tue',
    category: 'grip',
    type: 'timer',
    defaultSets: 3,
    defaultReps: 1,
    defaultDurationSec: 25,
    restSec: 50,
    targetMuscles: ['Глубокие мышцы предплечья', 'Сухожилия пальцев'],
    targetJoints: ['Все суставы кисти'],
    instructions: [
      'Сожмите кистевой эспандер, мячик, толстую рукоять или плотно сплетенные пальцы.',
      'Удерживайте постоянное 70-80% максимальное статическое давление.',
      'Сохраняйте ровное дыхание на протяжении всего таймера.'
    ],
    techniqueNotes: 'Ключевое упражнение для плотности сухожилий и силы сдавливающего хвата.',
    rewards: { xp: 20, credits: 12, statType: 'grip', statXp: 6 },
    svgType: 'isometric_grip'
  },
  {
    id: 'tue_wrist_circles',
    name: 'Круговые движения запястьями',
    dayId: 'tue',
    category: 'grip',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 15,
    defaultDurationSec: 0,
    restSec: 30,
    targetMuscles: ['Капсула запястья', 'Мышцы предплечья'],
    targetJoints: ['Лучезапястный сустав'],
    instructions: [
      'Сомкните пальцы в замок или сожмите легкие кулаки.',
      'Выполняйте плавные круговые движения по максимальной комфортной амплитуде.',
      'Выполните по половине повторений по часовой и против часовой стрелки.'
    ],
    techniqueNotes: 'Мягкое смазывание синовиальной жидкостью хрящевых поверхностей.',
    rewards: { xp: 10, credits: 5, statType: 'recovery', statXp: 2 },
    svgType: 'wrist_circles'
  },
  {
    id: 'tue_finger_opposition',
    name: 'Противодействие пальцев',
    dayId: 'tue',
    category: 'grip',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 30,
    targetMuscles: ['Мышца противопоставляющая большой палец', 'Червеобразные мышцы'],
    targetJoints: ['Седловидный сустав большого пальца'],
    instructions: [
      'Поочередно с силой прижимайте подушечку большого пальца к указательному, среднему, безымянному и мизинцу.',
      'Удерживайте каждое сдавливание по 1-2 секунды, образуя плотное кольцо.',
      'Повторите цикл для обеих рук.'
    ],
    techniqueNotes: 'Развивает точность и щипковый хват, стабилизирует первый запястно-пястный сустав.',
    rewards: { xp: 12, credits: 6, statType: 'grip', statXp: 3 },
    svgType: 'finger_opposition'
  },
  {
    id: 'tue_towel_wring',
    name: 'Скручивание полотенца',
    dayId: 'tue',
    category: 'grip',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultDurationSec: 0,
    restSec: 45,
    targetMuscles: ['Сгибатели и разгибатели предплечья', 'Вращатели кисти'],
    targetJoints: ['Лучезапястные и локтевые суставы'],
    instructions: [
      'Возьмите свернутое полотенце обеими руками на расстоянии 10-15 см.',
      'Скручивайте его в противоположные стороны, словно отжимаете воду.',
      'Затем смените направление вращения для каждой руки.'
    ],
    techniqueNotes: 'Мощнейшее функциональное движение, вовлекающее все плоскости движения кисти.',
    rewards: { xp: 18, credits: 11, statType: 'grip', statXp: 5 },
    svgType: 'towel_wring'
  },

  // --- СРЕДА (ПОДВИЖНОСТЬ И ДЫХАНИЕ) ---
  {
    id: 'wed_cat_cow',
    name: 'Кошка-корова',
    dayId: 'wed',
    category: 'mobility',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultDurationSec: 0,
    restSec: 30,
    targetMuscles: ['Разгибатели позвоночника', 'Мышцы пресса'],
    targetJoints: ['Весь позвоночный столб'],
    instructions: [
      'Встаньте на четвереньки (ладони под плечами, колени под тазом).',
      'На вдохе мягко прогнитесь в грудном отделе, направляя взгляд вперед и приподнимая копчик («корова»).',
      'На выдохе округлите спину, подкручивая таз и опуская голову к груди («кошка»).'
    ],
    techniqueNotes: 'Плавная артикуляция позвонка за позвонком без резких рывков.',
    rewards: { xp: 15, credits: 8, statType: 'mobility', statXp: 4 },
    svgType: 'cat_cow'
  },
  {
    id: 'wed_thoracic_rotations',
    name: 'Повороты грудного отдела',
    dayId: 'wed',
    category: 'mobility',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultDurationSec: 0,
    restSec: 35,
    targetMuscles: ['Ротаторы позвоночника', 'Ромбовидные мышцы'],
    targetJoints: ['Грудной отдел позвоночника'],
    instructions: [
      'Из положения на четвереньках или сидя положите одну руку на затылок.',
      'На вдохе раскройте локоть вверх к потолку, поворачивая грудную клетку.',
      'На выдохе опустите локоть к противоположной опорной руке.'
    ],
    techniqueNotes: 'Таз остается неподвижным, вращение происходит исключительно в реберно-позвоночных суставах.',
    rewards: { xp: 16, credits: 9, statType: 'mobility', statXp: 4 },
    svgType: 'thoracic'
  },
  {
    id: 'wed_shoulder_circles',
    name: 'Круги плечами',
    dayId: 'wed',
    category: 'mobility',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 15,
    defaultDurationSec: 0,
    restSec: 30,
    targetMuscles: ['Трапециевидная', 'Дельтовидные', 'Мышцы шеи'],
    targetJoints: ['Плечевые суставы', 'Ключично-акромиальные'],
    instructions: [
      'Стоя прямо с расслабленными руками.',
      'Опишите плечами широкий круг вверх, назад и плавно вниз, сводя лопатки.',
      'Повторите в обратном направлении (вперед).'
    ],
    techniqueNotes: 'Освобождает шейный отдел от скопившегося мышечного панциря и спазмов.',
    rewards: { xp: 12, credits: 6, statType: 'recovery', statXp: 3 },
    svgType: 'shoulder_circles'
  },
  {
    id: 'wed_wall_slides',
    name: 'Скольжение руками по стене',
    dayId: 'wed',
    category: 'mobility',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultDurationSec: 0,
    restSec: 45,
    targetMuscles: ['Передняя зубчатая мышца', 'Нижняя трапеция'],
    targetJoints: ['Плечевой пояс', 'Лопатки'],
    instructions: [
      'Прислонитесь спиной, затылком и тазом к стене. Согните руки под 90 градусов (поза "W").',
      'Прижмите тыльную сторону ладоней и локти к стене.',
      'Плавно скользите руками вверх в позу "Y", не отрывая предплечья и поясницу от стены.'
    ],
    techniqueNotes: 'Золотой стандарт исправления сутулости и стабилизации траектории лопаток.',
    rewards: { xp: 18, credits: 10, statType: 'mobility', statXp: 5 },
    svgType: 'wall_slides'
  },
  {
    id: 'wed_pelvic_90_90',
    name: 'Повороты таза 90/90',
    dayId: 'wed',
    category: 'mobility',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultDurationSec: 0,
    restSec: 40,
    targetMuscles: ['Глубокие ротаторы бедра', 'Грушевидная мышца'],
    targetJoints: ['Тазобедренные суставы'],
    instructions: [
      'Сядьте на пол, согните обе ноги под 90 градусов (одна нога впереди во внешней ротации, другая сбоку во внутренней).',
      'Мягко перекатите колени через верх на другую сторону, не отрывая стопы от пола.',
      'Сохраняйте вертикальное положение позвоночника.'
    ],
    techniqueNotes: 'Глубокая мобилизация капсулы тазобедренного сустава для легкости походки.',
    rewards: { xp: 17, credits: 9, statType: 'mobility', statXp: 4 },
    svgType: 'hip_90_90'
  },
  {
    id: 'wed_gentle_head_tilts',
    name: 'Мягкие наклоны головы',
    dayId: 'wed',
    category: 'mobility',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultDurationSec: 0,
    restSec: 30,
    targetMuscles: ['Грудино-ключично-сосцевидная', 'Лестничные мышцы шеи'],
    targetJoints: ['Шейный отдел позвоночника'],
    instructions: [
      'Сядьте прямо, опустите плечи вниз.',
      'Медленно наклоните правое ухо к правому плечу, почувствуйте приятное натяжение с левой стороны.',
      'Вернитесь в центр и повторите влево. Затем мягкий наклон подбородка к ключицам.'
    ],
    techniqueNotes: 'Никаких резких движений или круговых запрокидываний головы назад!',
    rewards: { xp: 11, credits: 5, statType: 'recovery', statXp: 3 },
    svgType: 'head_tilts'
  },
  {
    id: 'wed_pelvis_circles',
    name: 'Круги тазом',
    dayId: 'wed',
    category: 'mobility',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 30,
    targetMuscles: ['Квадратная мышца поясницы', 'Косые мышцы живота'],
    targetJoints: ['Пояснично-крестцовый отдел', 'Тазобедренные'],
    instructions: [
      'Поставьте ноги на ширине плеч, руки на поясе.',
      'Описывайте тазом широкие круги, сохраняя плечи на месте.',
      'Выполните по половине повторений в каждую сторону.'
    ],
    techniqueNotes: 'Снимает застойные явления в области малого таза и поясничного отдела.',
    rewards: { xp: 12, credits: 6, statType: 'mobility', statXp: 2 },
    svgType: 'pelvis_circles'
  },
  {
    id: 'wed_gentle_torso_tilts',
    name: 'Мягкие наклоны корпуса',
    dayId: 'wed',
    category: 'mobility',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultDurationSec: 0,
    restSec: 35,
    targetMuscles: ['Боковые стабилизаторы корпуса', 'Широчайшие мышцы'],
    targetJoints: ['Позвоночник во фронтальной плоскости'],
    instructions: [
      'Стоя прямо, поднимите одну руку над головой.',
      'Мягко наклонитесь в противоположную сторону, удлиняя весь боковой контур тела.',
      'Вернитесь в центр и смените сторону.'
    ],
    techniqueNotes: 'Тянитесь рукой вверх и по диагонали, не заваливаясь вперед.',
    rewards: { xp: 13, credits: 7, statType: 'mobility', statXp: 3 },
    svgType: 'torso_tilts'
  },
  {
    id: 'wed_diaphragmatic_breathing',
    name: 'Диафрагмальное дыхание',
    dayId: 'wed',
    category: 'breathing',
    type: 'timer',
    defaultSets: 3,
    defaultReps: 1,
    defaultDurationSec: 60,
    restSec: 30,
    targetMuscles: ['Диафрагма', 'Поперечная мышца живота'],
    targetJoints: ['Реберно-грудинные сочленения'],
    instructions: [
      'Положите одну руку на грудь, вторую — на живот ниже ребер.',
      'Сделайте медленный вдох через нос на 4 счета: живот округляется и надувается, рука на груди остается почти неподвижной.',
      'Плавный выдох через рот на 6 счетов: живот мягко опускается.'
    ],
    techniqueNotes: 'Активирует парасимпатическую нервную систему, снижает уровень стресса и нормализует пульс.',
    rewards: { xp: 20, credits: 10, statType: 'vitality', statXp: 5 },
    svgType: 'breathing'
  },
  {
    id: 'wed_extended_exhale_breathing',
    name: 'Дыхание с удлинённым выдохом',
    dayId: 'wed',
    category: 'breathing',
    type: 'timer',
    defaultSets: 3,
    defaultReps: 1,
    defaultDurationSec: 60,
    restSec: 30,
    targetMuscles: ['Дыхательная мускулатура'],
    targetJoints: ['Грудная клетка'],
    instructions: [
      'Вдох носом на 3 секунды.',
      'Пауза на 1 секунду.',
      'Медленный струйный выдох через сомкнутые губы на 6–8 секунд.'
    ],
    techniqueNotes: 'Мощный регулятор сосудистого тонуса и артериального давления.',
    rewards: { xp: 20, credits: 10, statType: 'recovery', statXp: 5 },
    svgType: 'breathing'
  },
  {
    id: 'wed_movement_breathing',
    name: 'Дыхание во время движения',
    dayId: 'wed',
    category: 'breathing',
    type: 'timer',
    defaultSets: 3,
    defaultReps: 1,
    defaultDurationSec: 45,
    restSec: 30,
    targetMuscles: ['Межреберные мышцы', 'Диафрагма'],
    targetJoints: ['Плечевые и реберные суставы'],
    instructions: [
      'На плавном вдохе поднимите руки через стороны вверх.',
      'На плавном выдохе опустите руки вниз, синхронизируя скорость жеста и дыхания.',
      'Двигайтесь плавно как в воде.'
    ],
    techniqueNotes: 'Координация ритма движения с дыхательным паттерном.',
    rewards: { xp: 16, credits: 8, statType: 'vitality', statXp: 4 },
    svgType: 'movement_breathing'
  },

  // --- СУББОТА (ВЫНОСЛИВОСТЬ И ЛЕГКОСТЬ) ---
  {
    id: 'sat_foot_circles',
    name: 'Круги стопами',
    dayId: 'sat',
    category: 'mobility',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 15,
    defaultDurationSec: 0,
    restSec: 30,
    targetMuscles: ['Мышцы стопы и голени'],
    targetJoints: ['Голеностопный', 'Подтаранный суставы'],
    instructions: [
      'Сидя или стоя с опорой, поднимите одну стопу.',
      'Описывайте носком максимальный круговой контур по часовой и против часовой стрелки.',
      'Повторите для второй ноги.'
    ],
    techniqueNotes: 'Улучшает питание суставных хрящей голеностопа.',
    rewards: { xp: 12, credits: 6, statType: 'mobility', statXp: 3 },
    svgType: 'foot_circles'
  },
  {
    id: 'sat_wrist_mobility',
    name: 'Движения запястьями',
    dayId: 'sat',
    category: 'mobility',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 30,
    targetMuscles: ['Связки лучезапястных суставов'],
    targetJoints: ['Запястье'],
    instructions: [
      'Сложите ладони перед грудью в "молитвенной" позе (намасте).',
      'Плавно опускайте соединенные ладони вниз до предплечий, растягивая запястья.',
      'Разверните пальцы вниз и потянитесь тыльными сторонами.'
    ],
    techniqueNotes: 'Деликатная растяжка без форсированного давления.',
    rewards: { xp: 11, credits: 5, statType: 'recovery', statXp: 3 },
    svgType: 'wrist_mobility'
  },
  {
    id: 'sat_march_in_place',
    name: 'Ходьба на месте',
    dayId: 'sat',
    category: 'endurance',
    type: 'timer',
    defaultSets: 3,
    defaultReps: 1,
    defaultDurationSec: 60,
    restSec: 40,
    targetMuscles: ['Мышцы ног', 'Сердечная мышца (миокард)'],
    targetJoints: ['Все суставы нижних конечностей'],
    instructions: [
      'Маршируйте на месте с мягким перекатом стопы с носка на пятку.',
      'Согласованно работайте согнутыми в локтях руками.',
      'Держите легкий комфортный ритм дыхания.'
    ],
    techniqueNotes: 'Мягкий кардио-разогрев без ударной нагрузки на суставы.',
    rewards: { xp: 22, credits: 12, statType: 'endurance', statXp: 5 },
    svgType: 'march'
  },
  {
    id: 'sat_side_steps',
    name: 'Шаги в стороны',
    dayId: 'sat',
    category: 'endurance',
    type: 'timer',
    defaultSets: 3,
    defaultReps: 1,
    defaultDurationSec: 45,
    restSec: 40,
    targetMuscles: ['Отводящие и приводящие мышцы бедер', 'Икры'],
    targetJoints: ['Тазобедренные', 'Колени'],
    instructions: [
      'Сделайте пружинящий шаг вправо, приставив левую ногу.',
      'Затем шаг влево, приставив правую ногу.',
      'Сохраняйте ритмичный легкий темп.'
    ],
    techniqueNotes: 'Развивает фронтальную стабильность и координацию.',
    rewards: { xp: 18, credits: 10, statType: 'endurance', statXp: 4 },
    svgType: 'side_steps'
  },
  {
    id: 'sat_alternating_knees',
    name: 'Поочерёдный подъём коленей',
    dayId: 'sat',
    category: 'endurance',
    type: 'timer',
    defaultSets: 3,
    defaultReps: 1,
    defaultDurationSec: 45,
    restSec: 40,
    targetMuscles: ['Сгибатели бедра', 'Пресс', 'Квадрицепсы'],
    targetJoints: ['Тазобедренные'],
    instructions: [
      'Поочередно поднимайте колени до горизонтали в умеренном темпе.',
      'Касайтесь противоположной рукой поднятого колена.',
      'Держите спину прямо.'
    ],
    techniqueNotes: 'Включает перекрестную моторную координацию полушарий мозга.',
    rewards: { xp: 20, credits: 11, statType: 'endurance', statXp: 5 },
    svgType: 'alternating_knees'
  },
  {
    id: 'sat_calm_walk_in_place',
    name: 'Спокойная ходьба на месте',
    dayId: 'sat',
    category: 'endurance',
    type: 'timer',
    defaultSets: 2,
    defaultReps: 1,
    defaultDurationSec: 60,
    restSec: 30,
    targetMuscles: ['Все мышцы тела в аэробном режиме'],
    targetJoints: ['Все'],
    instructions: [
      'Замедляйте темп шага.',
      'Глубоко и спокойно дышите, нормализуя частоту пульса.',
      'Полное расслабление плеч и кистей.'
    ],
    techniqueNotes: 'Заминка и стабилизация гомеостаза.',
    rewards: { xp: 15, credits: 8, statType: 'recovery', statXp: 4 },
    svgType: 'calm_walk'
  },

  // --- ВОСКРЕСЕНЬЕ (ОТДЫХ) ---
  {
    id: 'sun_full_rest',
    name: 'Полный отдых и суперкомпенсация',
    dayId: 'sun',
    category: 'breathing',
    type: 'timer',
    defaultSets: 1,
    defaultReps: 1,
    defaultDurationSec: 180,
    restSec: 0,
    targetMuscles: ['Все мышечные группы'],
    targetJoints: ['Все суставы'],
    instructions: [
      'Примите удобную позу лежа или сидя.',
      'Закройте глаза, направьте внимание на расслабление мышц лица, шеи, спины и ног.',
      'Позвольте организму восполнить гликоген и восстановить микроструктуру сухожилий.'
    ],
    techniqueNotes: 'Рост физических кондиций происходит исключительно во время сна и отдыха.',
    rewards: { xp: 35, credits: 25, statType: 'recovery', statXp: 10 },
    svgType: 'rest'
  },

  // --- ДОПОЛНИТЕЛЬНЫЕ УПРАЖНЕНИЯ (ДОП-БЛОК) ---
  {
    id: 'extra_abs_crunch',
    name: 'Пресс: Контролируемые скручивания',
    dayId: 'extra',
    category: 'extra',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 15,
    defaultDurationSec: 0,
    restSec: 45,
    targetMuscles: ['Прямая мышца живота'],
    targetJoints: ['Грудной отдел позвоночника'],
    instructions: [
      'Лягте на спину, ноги согнуты в коленях, ладони у висков.',
      'На выдохе оторвите лопатки от пола за счет сжатия пресса.',
      'Поясница плотно прижата к полу.'
    ],
    techniqueNotes: 'Не тяните шею руками! Подбородок направлен вверх.',
    rewards: { xp: 18, credits: 10, statType: 'strength', statXp: 4 },
    svgType: 'abs'
  },
  {
    id: 'extra_chest_pushup',
    name: 'Грудные мышцы: Отжимания от пола / опоры',
    dayId: 'extra',
    category: 'extra',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultDurationSec: 0,
    restSec: 60,
    targetMuscles: ['Большая грудная', 'Передняя дельта', 'Трицепс'],
    targetJoints: ['Плечевые и локтевые суставы'],
    instructions: [
      'Упор лежа от стола, стены или пола.',
      'Опустите грудь к опоре, разводя локти под 45 градусов к корпусу.',
      'Мощным движением выжмите себя вверх.'
    ],
    techniqueNotes: 'Корпус как единая натянутая стрела, пресс и ягодицы напряжены.',
    rewards: { xp: 22, credits: 13, statType: 'strength', statXp: 6 },
    svgType: 'pushup'
  },
  {
    id: 'extra_back_hyperextension',
    name: 'Спина: Лодочка на полу',
    dayId: 'extra',
    category: 'extra',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationSec: 0,
    restSec: 45,
    targetMuscles: ['Разгибатели спины', 'Ромбовидные', 'Ягодицы'],
    targetJoints: ['Позвоночник'],
    instructions: [
      'Лягте на живот, руки вытянуты вперед или вдоль туловища.',
      'Одновременно приподнимите грудь и прямые ноги от пола на 5-10 см.',
      'Задержитесь на 2 секунды и плавно опуститесь.'
    ],
    techniqueNotes: 'Движение в длину, а не только на высоту.',
    rewards: { xp: 19, credits: 11, statType: 'strength', statXp: 5 },
    svgType: 'back'
  },
  {
    id: 'extra_neck_isometric',
    name: 'Шея: Изометрическое противодействие',
    dayId: 'extra',
    category: 'extra',
    type: 'timer',
    defaultSets: 3,
    defaultReps: 1,
    defaultDurationSec: 20,
    restSec: 30,
    targetMuscles: ['Глубокие шейные стабилизаторы'],
    targetJoints: ['Шейные позвонки'],
    instructions: [
      'Прижмите ладонь ко лбу и оказывайте мягкое сопротивление без движения головы.',
      'Затем повторите для затылка, правого и левого виска по 5 секунд на сторону.',
      'Голова остается строго неподвижной.'
    ],
    techniqueNotes: 'Безопаснейший способ укрепления шеи без компрессии позвонков.',
    rewards: { xp: 14, credits: 8, statType: 'vitality', statXp: 3 },
    svgType: 'neck'
  },
  {
    id: 'extra_stretch',
    name: 'Растяжка: Общая заминка всего тела',
    dayId: 'extra',
    category: 'extra',
    type: 'timer',
    defaultSets: 2,
    defaultReps: 1,
    defaultDurationSec: 90,
    restSec: 30,
    targetMuscles: ['Фасции и мышцы всего тела'],
    targetJoints: ['Все крупные сочленения'],
    instructions: [
      'Мягко потяните переднюю поверхность бедра, заднюю поверхность, плечи и грудь.',
      'Держите каждое положение без пружинящих движений в зоне приятного тепла.',
      'Глубоко дышите.'
    ],
    techniqueNotes: 'Способствует выводу метаболитов и ускорению регенерации.',
    rewards: { xp: 25, credits: 15, statType: 'recovery', statXp: 6 },
    svgType: 'stretch'
  }
];

export const TRAINING_STAGES_INFO = [
  {
    stage: 1,
    name: 'Этап 1 — Адаптация',
    duration: '1–2 недели',
    description: 'Втягивающий период: освоение безупречной биомеханики, включение стабилизаторов, подготовка сухожилий без работы до отказа.',
    repsMultiplier: 0.8,
    setsModifier: 0,
    restMultiplier: 1.2
  },
  {
    stage: 2,
    name: 'Этап 2 — Укрепление',
    duration: '3–4 недели',
    description: 'Повышение плотности тренировки, рост силы хвата и локальной выносливости связок коленей и голеностопа.',
    repsMultiplier: 1.0,
    setsModifier: 0,
    restMultiplier: 1.0
  },
  {
    stage: 3,
    name: 'Этап 3 — Развитие',
    duration: '5–8 недель',
    description: 'Увеличение времени под нагрузкой, углубление амплитуды, развитие взрывной силы и функционального баланса.',
    repsMultiplier: 1.25,
    setsModifier: 1,
    restMultiplier: 0.9
  },
  {
    stage: 4,
    name: 'Этап 4 — Поддержание и Мастерство',
    duration: 'После 8 недель',
    description: 'Регулярная непрерывная прокачка кибер-атлета, стабильный тонус, максимальная защита от бытовых травм.',
    repsMultiplier: 1.4,
    setsModifier: 1,
    restMultiplier: 0.85
  }
];

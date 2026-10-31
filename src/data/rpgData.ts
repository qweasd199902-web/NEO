import { Achievement, DailyQuest, ShopItem } from '../types';

export const LEVEL_TITLES: { minLevel: number; title: string; color: string }[] = [
  { minLevel: 1, title: 'Кибер-Неофит (Cyber Initiate)', color: '#94a3b8' },
  { minLevel: 3, title: 'Неоновый Сталкер (Neon Stalker)', color: '#38bdf8' },
  { minLevel: 5, title: 'Хромовый Боец (Chrome Striker)', color: '#00f0ff' },
  { minLevel: 8, title: 'Синт-Атлет (Synth Runner)', color: '#a855f7' },
  { minLevel: 12, title: 'Титановый Страж (Titan Vanguard)', color: '#ff007f' },
  { minLevel: 16, title: 'Кибер-Ронин (Cyber Ronin)', color: '#ffe600' },
  { minLevel: 20, title: 'Повелитель Blood Dragon (Blood Dragon Overlord)', color: '#ff0055' },
  { minLevel: 30, title: 'Абсолютный Бог Неона (Neon Transcendent)', color: '#00ffcc' }
];

export const INITIAL_SHOP_ITEMS: ShopItem[] = [
  // SKINS
  {
    id: 'skin_default',
    name: 'Стандартный Кибер-Костюм MK-1',
    category: 'skin',
    priceCredits: 0,
    priceTokens: 0,
    icon: '👤',
    description: 'Базовый композитный экзо-костюм для фитнес-тренировок.',
    unlocked: true,
    equipped: true
  },
  {
    id: 'skin_blood_dragon',
    name: 'Броня Blood Dragon 1984',
    category: 'skin',
    priceCredits: 500,
    priceTokens: 5,
    icon: '🐉',
    description: 'Легендарная кибер-броня сержанта Рекса Кольта с неоновыми сервоприводами.',
    unlocked: false
  },
  {
    id: 'skin_synth_ninja',
    name: 'Синтвейв Ниндзя',
    category: 'skin',
    priceCredits: 850,
    priceTokens: 10,
    icon: '🥷',
    description: 'Облегчённая нано-ткань с максимальным коэффициентом подвижности.',
    unlocked: false
  },
  {
    id: 'skin_hologram',
    name: 'Квантовая Голограмма',
    category: 'skin',
    priceCredits: 1200,
    priceTokens: 15,
    icon: '💠',
    description: 'Мерцающая лазерная проекция вместо физического тела.',
    unlocked: false
  },
  {
    id: 'skin_titan_chrome',
    name: 'Титановый Берсерк',
    category: 'skin',
    priceCredits: 2000,
    priceTokens: 25,
    icon: '🛡️',
    description: 'Тяжелый хромированный экзоскелет высшего класса защиты.',
    unlocked: false
  },

  // AURAS
  {
    id: 'aura_none',
    name: 'Без ауры',
    category: 'aura',
    priceCredits: 0,
    priceTokens: 0,
    icon: '⚪',
    description: 'Стандартное энергетическое поле.',
    unlocked: true,
    equipped: true
  },
  {
    id: 'aura_magenta_plasma',
    name: 'Плазменная Маджента',
    category: 'aura',
    priceCredits: 350,
    priceTokens: 3,
    icon: '🔥',
    description: 'Интенсивное неоново-розовое свечение вокруг персонажа.',
    unlocked: false
  },
  {
    id: 'aura_cyan_quantum',
    name: 'Квантовый Циан',
    category: 'aura',
    priceCredits: 400,
    priceTokens: 4,
    icon: '⚡',
    description: 'Электрические голубые разряды гипер-скорости.',
    unlocked: false
  },
  {
    id: 'aura_solar_flare',
    name: 'Солнечная Вспышка',
    category: 'aura',
    priceCredits: 600,
    priceTokens: 8,
    icon: '☀️',
    description: 'Ядерно-желтое свечение чистой энергии и выносливости.',
    unlocked: false
  },
  {
    id: 'aura_matrix_green',
    name: 'Поток Матрицы',
    category: 'aura',
    priceCredits: 800,
    priceTokens: 12,
    icon: '🟩',
    description: 'Каскадный поток неонового зеленого кода вокруг тела.',
    unlocked: false
  },

  // ACCESSORIES
  {
    id: 'acc_cyber_visor',
    name: 'Тактический Визор MK-4',
    category: 'accessory',
    priceCredits: 250,
    priceTokens: 2,
    icon: '🕶️',
    description: 'Светящиеся очки дополненной реальности с HUD-интерфейсом пульса.',
    unlocked: false
  },
  {
    id: 'acc_power_gloves',
    name: 'Силовые Перчатки Хвата',
    category: 'accessory',
    priceCredits: 450,
    priceTokens: 5,
    icon: '🧤',
    description: 'Пневматические усилители сухожилий кистей и пальцев.',
    unlocked: false
  },
  {
    id: 'acc_bionic_arm',
    name: 'Бионический Хромовый Протез',
    category: 'accessory',
    priceCredits: 900,
    priceTokens: 12,
    icon: '🦾',
    description: 'Кибернетическая рука с сервоприводами из сплава титана и графена.',
    unlocked: false
  },

  // THEMES
  {
    id: 'theme_blood_dragon',
    name: 'Тема: Blood Dragon (Розовый/Кислотный)',
    category: 'theme',
    priceCredits: 0,
    priceTokens: 0,
    icon: '🔴',
    description: 'Классический стиль ретрофутуризма 80-х Far Cry 3 Blood Dragon.',
    unlocked: true,
    equipped: true
  },
  {
    id: 'theme_miami_vice',
    name: 'Тема: Miami Vice (Циан/Фиолетовый)',
    category: 'theme',
    priceCredits: 300,
    priceTokens: 2,
    icon: '🌴',
    description: 'Мягкий закатный синтвейв в стиле Майами.',
    unlocked: false
  },
  {
    id: 'theme_matrix',
    name: 'Тема: Matrix Terminal (Изумрудный Код)',
    category: 'theme',
    priceCredits: 500,
    priceTokens: 5,
    icon: '💻',
    description: 'Зелёный монохромный терминал хакера киберпространства.',
    unlocked: false
  },
  {
    id: 'theme_outrun',
    name: 'Тема: Outrun Sunset (Оранжевый Закат)',
    category: 'theme',
    priceCredits: 600,
    priceTokens: 6,
    icon: '🌅',
    description: 'Теплые неоновые цвета ночной трассы на Ferrari Testarossa.',
    unlocked: false
  },

  // BUFFS / BOOSTERS
  {
    id: 'buff_xp_booster',
    name: 'Нанит-Инъектор Опыта (2x XP)',
    category: 'buff',
    priceCredits: 150,
    priceTokens: 0,
    icon: '💉',
    description: 'Удваивает весь получаемый опыт (XP) на 30 минут.',
    unlocked: true,
    buffData: {
      type: 'xp',
      multiplier: 2.0,
      durationMinutes: 30
    }
  },
  {
    id: 'buff_credit_booster',
    name: 'Чип Майнинга Кредитов (+50% ₢)',
    category: 'buff',
    priceCredits: 120,
    priceTokens: 0,
    icon: '🪙',
    description: 'Увеличивает начисление кредитов на 50% на 45 минут.',
    unlocked: true,
    buffData: {
      type: 'credits',
      multiplier: 1.5,
      durationMinutes: 45
    }
  },
  {
    id: 'buff_recovery_stasis',
    name: 'Регенеративная Стазис-Капсула',
    category: 'buff',
    priceCredits: 200,
    priceTokens: 1,
    icon: '🧪',
    description: 'Мгновенно восстанавливает 50 HP и ускоряет регенерацию энергии на 1 час.',
    unlocked: true,
    buffData: {
      type: 'recovery',
      multiplier: 2.0,
      durationMinutes: 60
    }
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_rep',
    title: 'Первый Контакт',
    description: 'Совершите своё первое физическое повторение в приложении.',
    icon: '⚡',
    category: 'workout',
    currentProgress: 0,
    maxProgress: 1,
    unlocked: false,
    rewardCredits: 50,
    rewardTokens: 1,
    rewardTitle: 'Инициатор'
  },
  {
    id: 'reps_100',
    title: 'Сотня Повторов',
    description: 'Выполните суммарно 100 повторений упражнений.',
    icon: '💯',
    category: 'workout',
    currentProgress: 0,
    maxProgress: 100,
    unlocked: false,
    rewardCredits: 150,
    rewardTokens: 2
  },
  {
    id: 'reps_500',
    title: 'Кибернетический Молот',
    description: 'Выполните 500 повторений упражнений.',
    icon: '🔨',
    category: 'workout',
    currentProgress: 0,
    maxProgress: 500,
    unlocked: false,
    rewardCredits: 400,
    rewardTokens: 5,
    rewardTitle: 'Молотобоец'
  },
  {
    id: 'workout_first_day',
    title: 'Боевое Крещение',
    description: 'Полностью завершите один тренировочный день.',
    icon: '🏆',
    category: 'workout',
    currentProgress: 0,
    maxProgress: 1,
    unlocked: false,
    rewardCredits: 200,
    rewardTokens: 3
  },
  {
    id: 'workout_week_champion',
    title: 'Недельный Марафон',
    description: 'Завершите 6 тренировок за одну неделю.',
    icon: '👑',
    category: 'workout',
    currentProgress: 0,
    maxProgress: 6,
    unlocked: false,
    rewardCredits: 800,
    rewardTokens: 10,
    rewardTitle: 'Неукротимый'
  },
  {
    id: 'level_5',
    title: 'Апгрейд Системы',
    description: 'Достигните 5-го уровня персонажа.',
    icon: '⭐',
    category: 'level',
    currentProgress: 1,
    maxProgress: 5,
    unlocked: false,
    rewardCredits: 250,
    rewardTokens: 3
  },
  {
    id: 'level_10',
    title: 'Ветеран Неона',
    description: 'Достигните 10-го уровня персонажа.',
    icon: '🌟',
    category: 'level',
    currentProgress: 1,
    maxProgress: 10,
    unlocked: false,
    rewardCredits: 600,
    rewardTokens: 8,
    rewardTitle: 'Ветеран'
  },
  {
    id: 'streak_3',
    title: 'Дисциплина Данных: 3 Дня',
    description: 'Отметьте посещение 3 дня подряд.',
    icon: '🔥',
    category: 'streak',
    currentProgress: 0,
    maxProgress: 3,
    unlocked: false,
    rewardCredits: 100,
    rewardTokens: 2
  },
  {
    id: 'streak_7',
    title: 'Недельный Пульс: 7 Дней',
    description: 'Отметьте посещение 7 дней подряд.',
    icon: '💥',
    category: 'streak',
    currentProgress: 0,
    maxProgress: 7,
    unlocked: false,
    rewardCredits: 300,
    rewardTokens: 5,
    rewardTitle: 'Синхронизированный'
  },
  {
    id: 'streak_14',
    title: 'Стальной Характер: 14 Дней',
    description: 'Отметьте посещение 14 дней подряд.',
    icon: '🛡️',
    category: 'streak',
    currentProgress: 0,
    maxProgress: 14,
    unlocked: false,
    rewardCredits: 700,
    rewardTokens: 10
  },
  {
    id: 'streak_30',
    title: 'Легенда Киберспорта: 30 Дней',
    description: 'Завершите 30 дней в календаре посещений.',
    icon: '🌌',
    category: 'streak',
    currentProgress: 0,
    maxProgress: 30,
    unlocked: false,
    rewardCredits: 1500,
    rewardTokens: 25,
    rewardTitle: 'Бессмертный'
  },
  {
    id: 'grip_master',
    title: 'Титановый Захват',
    description: 'Прокачайте характеристику Grip (Хват) до 15 очков.',
    icon: '✊',
    category: 'stats',
    currentProgress: 5,
    maxProgress: 15,
    unlocked: false,
    rewardCredits: 300,
    rewardTokens: 4
  },
  {
    id: 'sound_of_synth',
    title: 'Ритм Будущего',
    description: 'Включите музыку и потренируйтесь под синтвейв.',
    icon: '🎵',
    category: 'special',
    currentProgress: 0,
    maxProgress: 1,
    unlocked: false,
    rewardCredits: 50,
    rewardTokens: 1
  }
];

export const INITIAL_DAILY_QUESTS: DailyQuest[] = [
  {
    id: 'quest_checkin',
    title: 'Синхронизация Нейросети',
    description: 'Отметьте ежедневный визит в приложении.',
    currentProgress: 0,
    target: 1,
    completed: false,
    claimed: false,
    rewardXp: 50,
    rewardCredits: 30
  },
  {
    id: 'quest_workout_session',
    title: 'Дневной Норматив',
    description: 'Начните и выполните как минимум 3 упражнения сегодняшнего дня.',
    currentProgress: 0,
    target: 3,
    completed: false,
    claimed: false,
    rewardXp: 100,
    rewardCredits: 60
  },
  {
    id: 'quest_reps_clicker',
    title: 'Кликер Силы: 30 Повторений',
    description: 'Засчитайте 30 повторений упражнений в ручном кликере.',
    currentProgress: 0,
    target: 30,
    completed: false,
    claimed: false,
    rewardXp: 75,
    rewardCredits: 40
  },
  {
    id: 'quest_breathing_timer',
    title: 'Вентиляция Легких',
    description: 'Выполните упражнение на дыхание или таймер не менее 60 секунд.',
    currentProgress: 0,
    target: 60,
    completed: false,
    claimed: false,
    rewardXp: 60,
    rewardCredits: 35
  }
];

export function getXpRequiredForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.28, level - 1));
}

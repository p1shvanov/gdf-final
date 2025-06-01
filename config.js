export const CONFIG = {
  // Core settings
  FPS: 30,
  FONT_SIZE: 14,
  PIXEL_RATIO: window.devicePixelRatio || 1,

  // Characters
  BIN_CHARS: ["0", "1", "§"],
  EMPTY_PROBABILITY: 0.5, // 40% пустых полей

  // Colors
  BRANDBOOK_COLORS: ["#5e2ced", "#db6dc4", "#4fdfb4"],
  BACKGROUND_COLOR: "#000000",
  TWINKLE_COLOR: "#333333",

  // Effects
  TWINKLE: {
    ENABLED: true,
    PROBABILITY: 0.1, // 1% chance
    DURATION_MS: 100,
  },

  // Waves
  WAVES: {
    ENABLED: false,
    SPEED: 0.5,
    INTERVAL: 50, // пикселей между волнами
    WIDTH: 10, // толщина волны
    ACTIVATION_PROB: 0.7, // вероятность изменения в волне
  },

  // 3D Logo Animation
  LOGO_3D: {
    CAMERA: {
      FOV: 80,
      NEAR: 0.01,
      FAR: 1000,
      POSITION_Z: 85
    },
    ROTATION: {
      SPEED: 0.005
    },
    EXTRUDE: {
      DEPTH: 30,
      BEVEL_THICKNESS: 2,
      BEVEL_SIZE: 2,
      BEVEL_SEGMENTS: 3
    },
    SHADER: {
      CONTRAST: 1,
      TEAL_INFLUENCE: 1,
      FRESNEL_INTENSITY: 1,
      SATURATION: 1,
      BRIGHTNESS: 1
    }
  },

  // Text Animation
  DEMO_WORDS: [
    "Цифровой",
    "Инновации",
    "Будущее",
    "Технологии",
    "Глобальный",
    "Сеть",
    "Креатив",
    "Видение",
    "Трансформация",
    "Связь",
    "Данные",
    "Облако",
    "ИИ",
    "Блокчейн",
    "Форум",
    "Мир",
    "Изменения",
    "Развитие",
    "Поток",
  ],

  // Canvas
  CANVAS: {
    RESIZE_DEBOUNCE: 100
  }
};

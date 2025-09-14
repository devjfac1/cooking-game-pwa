import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
  modalType: null,
  modalData: null,
  showPauseMenu: false,
  showSettings: false,
  showTutorial: false,
  showAchievements: false,
  showLeaderboard: false,
  animations: true,
  soundEnabled: true,
  musicEnabled: true,
  vibrationEnabled: true,
  theme: 'cartoon',
  language: 'en',
  touchState: {
    isTouching: false,
    touchStart: null,
    touchEnd: null,
    gesture: null,
    swipeDirection: null,
    pinchDistance: 0
  },
  performance: {
    fps: 60,
    memoryUsage: 0,
    renderTime: 0
  },
  notifications: {
    showScore: true,
    showCombo: true,
    showAchievements: true,
    showWarnings: true
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.showModal = true;
      state.modalType = action.payload.type;
      state.modalData = action.payload.data || null;
    },

    hideModal: (state) => {
      state.showModal = false;
      state.modalType = null;
      state.modalData = null;
    },

    togglePauseMenu: (state) => {
      state.showPauseMenu = !state.showPauseMenu;
    },

    toggleSettings: (state) => {
      state.showSettings = !state.showSettings;
    },

    toggleTutorial: (state) => {
      state.showTutorial = !state.showTutorial;
    },

    toggleAchievements: (state) => {
      state.showAchievements = !state.showAchievements;
    },

    toggleLeaderboard: (state) => {
      state.showLeaderboard = !state.showLeaderboard;
    },

    setAnimations: (state, action) => {
      state.animations = action.payload;
    },

    setSoundEnabled: (state, action) => {
      state.soundEnabled = action.payload;
    },

    setMusicEnabled: (state, action) => {
      state.musicEnabled = action.payload;
    },

    setVibrationEnabled: (state, action) => {
      state.vibrationEnabled = action.payload;
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    updateTouchState: (state, action) => {
      Object.assign(state.touchState, action.payload);
    },

    resetTouchState: (state) => {
      state.touchState = {
        isTouching: false,
        touchStart: null,
        touchEnd: null,
        gesture: null,
        swipeDirection: null,
        pinchDistance: 0
      };
    },

    updatePerformance: (state, action) => {
      Object.assign(state.performance, action.payload);
    },

    setNotificationPreference: (state, action) => {
      const { type, enabled } = action.payload;
      state.notifications[type] = enabled;
    },

    setAccessibilityOption: (state, action) => {
      const { option, enabled } = action.payload;
      state.accessibility[option] = enabled;

      // Apply accessibility changes
      if (option === 'reducedMotion') {
        state.animations = !enabled;
      }
    },

    resetUI: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const {
  showModal,
  hideModal,
  togglePauseMenu,
  toggleSettings,
  toggleTutorial,
  toggleAchievements,
  toggleLeaderboard,
  setAnimations,
  setSoundEnabled,
  setMusicEnabled,
  setVibrationEnabled,
  setTheme,
  setLanguage,
  updateTouchState,
  resetTouchState,
  updatePerformance,
  setNotificationPreference,
  setAccessibilityOption,
  resetUI
} = uiSlice.actions;

export default uiSlice.reducer;
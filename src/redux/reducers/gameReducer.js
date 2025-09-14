import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLevel: 1,
  isPlaying: false,
  isPaused: false,
  timeRemaining: 60, // seconds
  difficulty: 1,
  gameSpeed: 1,
  combo: 0,
  maxCombo: 0,
  streak: 0,
  totalOrders: 0,
  completedOrders: 0,
  failedOrders: 0,
  gameStartTime: null,
  lastOrderTime: null,
  orderFrequency: 5000, // milliseconds between orders
  performance: {
    averageResponseTime: 0,
    accuracy: 100,
    efficiency: 100
  }
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isPlaying = true;
      state.isPaused = false;
      state.gameStartTime = Date.now();
      state.timeRemaining = 60 + (state.currentLevel - 1) * 10; // Increase time with level
      state.difficulty = Math.min(5, Math.floor(state.currentLevel / 5) + 1);
      state.orderFrequency = Math.max(2000, 5000 - (state.currentLevel - 1) * 200);
    },

    pauseGame: (state) => {
      state.isPaused = true;
    },

    resumeGame: (state) => {
      state.isPaused = false;
    },

    endGame: (state) => {
      state.isPlaying = false;
      state.isPaused = false;
      state.timeRemaining = 0;
    },

    updateTimer: (state, action) => {
      if (!state.isPaused && state.isPlaying) {
        state.timeRemaining = Math.max(0, state.timeRemaining - action.payload);
        if (state.timeRemaining <= 0) {
          state.isPlaying = false;
        }
      }
    },

    completeOrder: (state, action) => {
      state.completedOrders += 1;
      state.totalOrders += 1;
      state.streak += 1;
      state.combo = Math.min(state.combo + 1, 10); // Max combo of 10
      state.maxCombo = Math.max(state.maxCombo, state.combo);
      state.lastOrderTime = Date.now();

      // Update performance metrics
      const responseTime = action.payload.responseTime;
      const accuracy = action.payload.accuracy;

      state.performance.averageResponseTime =
        (state.performance.averageResponseTime * (state.completedOrders - 1) + responseTime) / state.completedOrders;
      state.performance.accuracy = accuracy;
      state.performance.efficiency = (state.completedOrders / state.totalOrders) * 100;
    },

    failOrder: (state) => {
      state.failedOrders += 1;
      state.totalOrders += 1;
      state.streak = 0;
      state.combo = 0;
      state.performance.efficiency = (state.completedOrders / state.totalOrders) * 100;
    },

    levelUp: (state) => {
      state.currentLevel += 1;
      state.difficulty = Math.min(5, Math.floor(state.currentLevel / 5) + 1);
      state.orderFrequency = Math.max(2000, 5000 - (state.currentLevel - 1) * 200);
      state.timeRemaining = 60 + (state.currentLevel - 1) * 10;
    },

    resetGame: (state) => {
      Object.assign(state, initialState);
    },

    updateGameSpeed: (state, action) => {
      state.gameSpeed = Math.max(0.5, Math.min(2, action.payload));
    },

    setDifficulty: (state, action) => {
      state.difficulty = Math.max(1, Math.min(5, action.payload));
    }
  }
});

export const {
  startGame,
  pauseGame,
  resumeGame,
  endGame,
  updateTimer,
  completeOrder,
  failOrder,
  levelUp,
  resetGame,
  updateGameSpeed,
  setDifficulty
} = gameSlice.actions;

export default gameSlice.reducer;
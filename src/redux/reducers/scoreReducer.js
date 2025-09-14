import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentScore: 0,
  totalScore: 0,
  highScore: 0,
  multiplier: 1,
  combo: 0,
  maxCombo: 0,
  streak: 0,
  maxStreak: 0,
  perfectOrders: 0,
  totalOrders: 0,
  accuracy: 100,
  speedBonus: 0,
  timeBonus: 0,
  comboBonus: 0,
  levelBonus: 0,
  sessionStats: {
    startTime: null,
    endTime: null,
    duration: 0,
    ordersCompleted: 0,
    averageScore: 0
  },
  achievements: [],
  leaderboard: []
};

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    addScore: (state, action) => {
      const { basePoints, speedMultiplier = 1, accuracyMultiplier = 1, comboMultiplier = 1 } = action.payload;

      const finalScore = Math.round(basePoints * speedMultiplier * accuracyMultiplier * comboMultiplier * state.multiplier);

      state.currentScore += finalScore;
      state.totalScore += finalScore;
      state.highScore = Math.max(state.highScore, state.currentScore);

      // Update bonuses
      state.speedBonus += Math.round(basePoints * (speedMultiplier - 1));
      state.timeBonus += Math.round(basePoints * (accuracyMultiplier - 1));
      state.comboBonus += Math.round(basePoints * (comboMultiplier - 1));
    },

    updateMultiplier: (state, action) => {
      state.multiplier = Math.max(1, Math.min(5, action.payload));
    },

    incrementCombo: (state) => {
      state.combo += 1;
      state.maxCombo = Math.max(state.maxCombo, state.combo);

      // Update multiplier based on combo
      if (state.combo >= 10) {
        state.multiplier = 3;
      } else if (state.combo >= 5) {
        state.multiplier = 2;
      } else if (state.combo >= 3) {
        state.multiplier = 1.5;
      }
    },

    resetCombo: (state) => {
      state.combo = 0;
      state.multiplier = 1;
    },

    incrementStreak: (state) => {
      state.streak += 1;
      state.maxStreak = Math.max(state.maxStreak, state.streak);
    },

    resetStreak: (state) => {
      state.streak = 0;
    },

    recordOrder: (state, action) => {
      const { isPerfect, responseTime, accuracy } = action.payload;

      state.totalOrders += 1;

      if (isPerfect) {
        state.perfectOrders += 1;
      }

      // Update accuracy
      state.accuracy = ((state.accuracy * (state.totalOrders - 1)) + accuracy) / state.totalOrders;

      // Speed bonus calculation
      const speedBonus = responseTime < 10 ? 1.5 : responseTime < 20 ? 1.2 : 1;
      state.speedBonus += speedBonus;
    },

    startSession: (state) => {
      state.sessionStats.startTime = Date.now();
      state.sessionStats.ordersCompleted = 0;
      state.sessionStats.averageScore = 0;
    },

    endSession: (state) => {
      if (state.sessionStats.startTime) {
        state.sessionStats.endTime = Date.now();
        state.sessionStats.duration = state.sessionStats.endTime - state.sessionStats.startTime;
        state.sessionStats.averageScore = state.totalOrders > 0 ? state.currentScore / state.totalOrders : 0;
      }
    },

    resetCurrentScore: (state) => {
      state.currentScore = 0;
      state.multiplier = 1;
      state.combo = 0;
      state.streak = 0;
      state.speedBonus = 0;
      state.timeBonus = 0;
      state.comboBonus = 0;
      state.levelBonus = 0;
    },

    unlockAchievement: (state, action) => {
      const achievement = action.payload;
      if (!state.achievements.includes(achievement)) {
        state.achievements.push(achievement);
      }
    },

    updateLeaderboard: (state, action) => {
      const newScore = action.payload;
      state.leaderboard.push(newScore);
      state.leaderboard.sort((a, b) => b.score - a.score);
      state.leaderboard = state.leaderboard.slice(0, 10); // Keep top 10
    },

    resetScore: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const {
  addScore,
  updateMultiplier,
  incrementCombo,
  resetCombo,
  incrementStreak,
  resetStreak,
  recordOrder,
  startSession,
  endSession,
  resetCurrentScore,
  unlockAchievement,
  updateLeaderboard,
  resetScore
} = scoreSlice.actions;

export default scoreSlice.reducer;
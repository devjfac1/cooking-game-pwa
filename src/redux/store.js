import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './reducers/gameReducer';
import customerReducer from './reducers/customerReducer';
import scoreReducer from './reducers/scoreReducer';
import uiReducer from './reducers/uiReducer';

// Configure store with middleware for performance
export const store = configureStore({
  reducer: {
    game: gameReducer,
    customers: customerReducer,
    score: scoreReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
      immutableCheck: {
        ignoredPaths: ['ui.touchState'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Types for use in components (can be imported as needed)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// Performance monitoring middleware
const performanceMiddleware = (store) => (next) => (action) => {
  const start = performance.now();
  const result = next(action);
  const end = performance.now();

  // Log slow actions in development
  if (process.env.NODE_ENV === 'development' && end - start > 16) {
    console.warn(`Slow action: ${action.type} took ${end - start}ms`);
  }

  return result;
};

// Add performance middleware in development
if (process.env.NODE_ENV === 'development') {
  store.middleware.push(performanceMiddleware);
}

// Hot module replacement for reducers
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers/gameReducer', () => {
    store.replaceReducer(gameReducer);
  });
  module.hot.accept('./reducers/customerReducer', () => {
    store.replaceReducer(customerReducer);
  });
  module.hot.accept('./reducers/scoreReducer', () => {
    store.replaceReducer(scoreReducer);
  });
  module.hot.accept('./reducers/uiReducer', () => {
    store.replaceReducer(uiReducer);
  });
}

export default store;
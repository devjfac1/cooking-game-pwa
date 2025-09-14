import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import GameContainer from './components/GameContainer';
import Menu from './components/Menu';
import Settings from './components/Settings';
import Tutorial from './components/Tutorial';
import Achievements from './components/Achievements';
import Leaderboard from './components/Leaderboard';
import Modal from './components/common/Modal';
import { hideModal, updateTouchState, resetTouchState } from './redux/reducers/uiReducer';
import { updateTimer, pauseGame, resumeGame } from './redux/reducers/gameReducer';
import './styles/index.css';

const App = () => {
  console.log('App component rendering...');
  const dispatch = useDispatch();
  const {
    showModal,
    modalType,
    showSettings,
    showTutorial,
    showAchievements,
    showLeaderboard,
    animations,
    theme
  } = useSelector(state => state.ui);

  const { isPlaying, isPaused } = useSelector(state => state.game);

  // Game timer
  useEffect(() => {
    let interval;
    if (isPlaying && !isPaused) {
      interval = setInterval(() => {
        dispatch(updateTimer(1)); // Update every second
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isPaused, dispatch]);

  // Touch event handlers for mobile optimization
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    dispatch(updateTouchState({
      isTouching: true,
      touchStart: { x: touch.clientX, y: touch.clientY }
    }));
  }, [dispatch]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      dispatch(updateTouchState({
        touchEnd: { x: touch.clientX, y: touch.clientY }
      }));
    }
  }, [dispatch]);

  const handleTouchEnd = useCallback((e) => {
    dispatch(resetTouchState());
  }, [dispatch]);

  // Pause/Resume on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        dispatch(pauseGame());
      } else if (!document.hidden && isPlaying) {
        dispatch(resumeGame());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying, dispatch]);

  // Prevent zoom on double tap
  useEffect(() => {
    let lastTouchEnd = 0;
    const handleTouchEndPreventZoom = (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchend', handleTouchEndPreventZoom, false);
    return () => document.removeEventListener('touchend', handleTouchEndPreventZoom);
  }, []);

  // Modal content
  const renderModalContent = () => {
    switch (modalType) {
      case 'settings':
        return <Settings />;
      case 'tutorial':
        return <Tutorial />;
      case 'achievements':
        return <Achievements />;
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`app ${theme} ${animations ? 'animations-enabled' : 'animations-disabled'}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <GameContainer />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Menu />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <Modal onClose={() => dispatch(hideModal())}>
            {renderModalContent()}
          </Modal>
        )}
      </AnimatePresence>

      {/* Additional UI Overlays */}
      <AnimatePresence>
        {showSettings && !showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="settings-overlay"
          >
            <Settings />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTutorial && !showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="tutorial-overlay"
          >
            <Tutorial />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAchievements && !showModal && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="achievements-overlay"
          >
            <Achievements />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLeaderboard && !showModal && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="leaderboard-overlay"
          >
            <Leaderboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
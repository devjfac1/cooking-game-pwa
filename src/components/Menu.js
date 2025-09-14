import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { startGame } from '../redux/reducers/gameReducer';
import { startSession } from '../redux/reducers/scoreReducer';
import { showModal } from '../redux/reducers/uiReducer';
import './Menu.css';

const Menu = () => {
  const dispatch = useDispatch();

  console.log('Menu component rendering...');

  const handleStartGame = () => {
    dispatch(startSession());
    dispatch(startGame());
  };

  const handleShowSettings = () => {
    dispatch(showModal({ type: 'settings' }));
  };

  const handleShowTutorial = () => {
    dispatch(showModal({ type: 'tutorial' }));
  };

  const handleShowAchievements = () => {
    dispatch(showModal({ type: 'achievements' }));
  };

  const handleShowLeaderboard = () => {
    dispatch(showModal({ type: 'leaderboard' }));
  };

  return (
    <div className="menu">
      <motion.div
        className="menu-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1
          className="menu-title"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          🍳 Cooking Game
        </motion.h1>

        <motion.p
          className="menu-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Serve delicious dishes and keep your customers happy!
        </motion.p>

        <motion.div
          className="menu-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.button
            className="btn btn-primary menu-btn-play"
            onClick={handleStartGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
          >
            🎮 Start Cooking
          </motion.button>

          <div className="menu-secondary-buttons">
            <motion.button
              className="btn btn-secondary menu-btn-secondary"
              onClick={handleShowTutorial}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📚 Tutorial
            </motion.button>

            <motion.button
              className="btn btn-secondary menu-btn-secondary"
              onClick={handleShowAchievements}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🏆 Achievements
            </motion.button>

            <motion.button
              className="btn btn-secondary menu-btn-secondary"
              onClick={handleShowLeaderboard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🥇 Leaderboard
            </motion.button>

            <motion.button
              className="btn btn-secondary menu-btn-secondary"
              onClick={handleShowSettings}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ⚙️ Settings
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="menu-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <p>Tap and hold to interact • Swipe to navigate</p>
          <p className="menu-version">v1.0.0</p>
        </motion.div>
      </motion.div>

      {/* Background decorations */}
      <div className="menu-bg-decoration">
        <motion.div
          className="menu-bg-item menu-bg-item-1"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          🍕
        </motion.div>

        <motion.div
          className="menu-bg-item menu-bg-item-2"
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          🍔
        </motion.div>

        <motion.div
          className="menu-bg-item menu-bg-item-3"
          animate={{
            rotate: 360,
            scale: [1, 0.9, 1]
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
            scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          🥗
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
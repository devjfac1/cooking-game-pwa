import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { pauseGame, resumeGame } from '../redux/reducers/gameReducer';
import { addCustomer } from '../redux/reducers/customerReducer';
import Kitchen from './game/Kitchen';
import CustomerQueue from './game/CustomerQueue';
import ScoreBoard from './game/ScoreBoard';
import Timer from './game/Timer';
import './GameContainer.css';

const GameContainer = () => {
  const dispatch = useDispatch();
  const { isPlaying, isPaused, currentLevel, difficulty } = useSelector(state => state.game);
  const { queue } = useSelector(state => state.customers);

  // Generate random order based on difficulty
  const generateRandomOrder = useCallback((difficulty) => {
    const ingredients = ['burger', 'fries', 'drink', 'salad', 'pizza', 'pasta'];
    const cookingMethods = ['grill', 'fry', 'bake'];

    const numIngredients = Math.min(ingredients.length, 1 + Math.floor(difficulty / 2));
    const selectedIngredients = ingredients
      .sort(() => Math.random() - 0.5)
      .slice(0, numIngredients);

    return {
      id: Date.now(),
      ingredients: selectedIngredients,
      cookingMethod: cookingMethods[Math.floor(Math.random() * cookingMethods.length)],
      timeLimit: 30 + (difficulty * 5),
      points: 100 * difficulty
    };
  }, []);

  // Generate customers periodically
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const customerInterval = setInterval(() => {
      if (queue.length < 3) { // Max 3 customers in queue
        const customerNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
        const avatars = ['👩', '👨', '👦', '👧', '🧑', '👩‍🦱'];

        const randomName = customerNames[Math.floor(Math.random() * customerNames.length)];
        const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

        dispatch(addCustomer({
          name: randomName,
          avatar: randomAvatar,
          order: generateRandomOrder(difficulty),
          patience: 80 + Math.random() * 40, // 80-120 patience
          isVIP: Math.random() < 0.1 // 10% chance of VIP
        }));
      }
    }, 8000 - (currentLevel * 200)); // Faster customer arrival as level increases

    return () => clearInterval(customerInterval);
  }, [isPlaying, isPaused, currentLevel, difficulty, queue.length, dispatch, generateRandomOrder]);


  // Handle pause/resume on touch
  const handlePauseToggle = useCallback(() => {
    if (isPaused) {
      dispatch(resumeGame());
    } else {
      dispatch(pauseGame());
    }
  }, [isPaused, dispatch]);

  if (!isPlaying) {
    return (
      <div className="game-loading">
        <motion.div
          className="loading-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-spinner"></div>
          <h2>Preparing your kitchen...</h2>
          <p>Get ready to cook!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className={`game-container ${isPaused ? 'paused' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Pause overlay */}
      {isPaused && (
        <motion.div
          className="pause-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="pause-content">
            <h2>Game Paused</h2>
            <p>Tap to resume</p>
            <button
              className="btn btn-primary"
              onClick={handlePauseToggle}
            >
              Resume Game
            </button>
          </div>
        </motion.div>
      )}

      {/* Game HUD */}
      <div className="game-hud">
        <Timer />
        <ScoreBoard />
      </div>

      {/* Main game area */}
      <div className="game-main">
        <CustomerQueue />
        <Kitchen />
      </div>

      {/* Pause button */}
      <button
        className="pause-button"
        onClick={handlePauseToggle}
        aria-label="Pause/Resume Game"
      >
        {isPaused ? '▶️' : '⏸️'}
      </button>
    </motion.div>
  );
};

export default GameContainer;
import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import './Timer.css';

const Timer = () => {
  const { timeRemaining, currentLevel } = useSelector(state => state.game);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining > 30) return '#2ed573';
    if (timeRemaining > 10) return '#ffa502';
    return '#ff3838';
  };

  return (
    <motion.div
      className="timer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="timer-display">
        <div className="timer-icon">⏱️</div>
        <div
          className="timer-text"
          style={{ color: getTimeColor() }}
        >
          {formatTime(timeRemaining)}
        </div>
      </div>

      <div className="level-display">
        <span className="level-label">Level</span>
        <span className="level-value">{currentLevel}</span>
      </div>
    </motion.div>
  );
};

export default Timer;
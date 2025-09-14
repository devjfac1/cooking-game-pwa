import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import './ScoreBoard.css';

const ScoreBoard = () => {
  const { currentScore, multiplier, combo, highScore } = useSelector(state => state.score);

  return (
    <motion.div
      className="score-board"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="score-item">
        <span className="score-label">Score</span>
        <span className="score-value">{currentScore.toLocaleString()}</span>
      </div>

      <div className="score-item">
        <span className="score-label">High Score</span>
        <span className="score-value">{highScore.toLocaleString()}</span>
      </div>

      <div className="score-item">
        <span className="score-label">Multiplier</span>
        <span className="score-value">×{multiplier}</span>
      </div>

      <div className="score-item">
        <span className="score-label">Combo</span>
        <span className="score-value">{combo}</span>
      </div>
    </motion.div>
  );
};

export default ScoreBoard;
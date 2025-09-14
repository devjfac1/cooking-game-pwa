import React from 'react';

const Tutorial = () => {
  return (
    <div className="tutorial">
      <h2>How to Play</h2>

      <div className="tutorial-section">
        <h3>🎮 Getting Started</h3>
        <p>Tap "Start Cooking" to begin your endless cooking adventure!</p>
      </div>

      <div className="tutorial-section">
        <h3>👥 Serving Customers</h3>
        <p>Customers will arrive with orders. Prepare their food quickly and accurately to earn points!</p>
      </div>

      <div className="tutorial-section">
        <h3>🍳 Cooking Mechanics</h3>
        <p>Use the kitchen stations to cook ingredients. Different methods work for different foods!</p>
      </div>

      <div className="tutorial-section">
        <h3>⏱️ Time Management</h3>
        <p>Work fast! Customers have limited patience, and time runs out eventually.</p>
      </div>

      <div className="tutorial-section">
        <h3>🏆 Scoring</h3>
        <p>Earn points for speed and accuracy. Build combos for bonus multipliers!</p>
      </div>

      <div className="tutorial-tip">
        <strong>💡 Pro Tip:</strong> Keep an eye on customer patience bars and prioritize urgent orders!
      </div>
    </div>
  );
};

export default Tutorial;
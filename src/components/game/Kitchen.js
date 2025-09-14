import React from 'react';
import { motion } from 'framer-motion';
import './Kitchen.css';

const Kitchen = () => {
  return (
    <motion.div
      className="kitchen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="kitchen-header">
        <h2>🍳 Kitchen</h2>
      </div>

      <div className="kitchen-workspace">
        <div className="cooking-stations">
          <div className="cooking-station">
            <div className="station-icon">🔥</div>
            <div className="station-name">Grill</div>
          </div>
          <div className="cooking-station">
            <div className="station-icon">🍳</div>
            <div className="station-name">Fry</div>
          </div>
          <div className="cooking-station">
            <div className="station-icon">🍕</div>
            <div className="station-name">Bake</div>
          </div>
        </div>

        <div className="ingredients-panel">
          <h3>Ingredients</h3>
          <div className="ingredients-grid">
            <div className="ingredient">🥩 Beef</div>
            <div className="ingredient">🥔 Potato</div>
            <div className="ingredient">🥬 Lettuce</div>
            <div className="ingredient">🍅 Tomato</div>
            <div className="ingredient">🧀 Cheese</div>
            <div className="ingredient">🍞 Bread</div>
          </div>
        </div>
      </div>

      <div className="kitchen-actions">
        <button className="btn btn-primary">Cook Order</button>
        <button className="btn btn-secondary">Serve Dish</button>
      </div>
    </motion.div>
  );
};

export default Kitchen;
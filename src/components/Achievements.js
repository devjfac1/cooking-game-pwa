import React from 'react';

const Achievements = () => {
  const achievements = [
    { id: 1, name: 'First Order', description: 'Complete your first order', unlocked: true },
    { id: 2, name: 'Speed Chef', description: 'Complete 10 orders quickly', unlocked: false },
    { id: 3, name: 'Perfect Cook', description: 'Achieve 100% accuracy on 5 orders', unlocked: false },
    { id: 4, name: 'Combo Master', description: 'Reach a 10x combo multiplier', unlocked: false },
    { id: 5, name: 'Customer Favorite', description: 'Satisfy 50 customers', unlocked: false },
    { id: 6, name: 'High Scorer', description: 'Reach 10,000 points', unlocked: false }
  ];

  return (
    <div className="achievements">
      <h2>Achievements</h2>

      <div className="achievements-grid">
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}
          >
            <div className="achievement-icon">
              {achievement.unlocked ? '🏆' : '🔒'}
            </div>
            <div className="achievement-content">
              <h3>{achievement.name}</h3>
              <p>{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="achievements-stats">
        <p>Unlocked: {achievements.filter(a => a.unlocked).length} / {achievements.length}</p>
      </div>
    </div>
  );
};

export default Achievements;
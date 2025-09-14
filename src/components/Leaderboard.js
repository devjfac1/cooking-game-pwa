import React from 'react';

const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, name: 'Chef Mario', score: 15420, level: 12 },
    { rank: 2, name: 'Speedy Gonzalez', score: 12890, level: 10 },
    { rank: 3, name: 'Kitchen King', score: 11250, level: 9 },
    { rank: 4, name: 'You', score: 8750, level: 7 },
    { rank: 5, name: 'Rookie Chef', score: 6230, level: 5 },
    { rank: 6, name: 'Beginner', score: 4120, level: 4 },
    { rank: 7, name: 'Newbie', score: 2890, level: 3 },
    { rank: 8, name: 'Apprentice', score: 1650, level: 2 }
  ];

  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>

      <div className="leaderboard-list">
        {leaderboardData.map(entry => (
          <div
            key={entry.rank}
            className={`leaderboard-item ${entry.name === 'You' ? 'current-player' : ''}`}
          >
            <div className="rank">
              {entry.rank === 1 && '🥇'}
              {entry.rank === 2 && '🥈'}
              {entry.rank === 3 && '🥉'}
              {entry.rank > 3 && `#${entry.rank}`}
            </div>

            <div className="player-info">
              <div className="player-name">{entry.name}</div>
              <div className="player-details">
                Level {entry.level} • {entry.score.toLocaleString()} pts
              </div>
            </div>

            <div className="score">
              {entry.score.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="leaderboard-info">
        <p>Keep cooking to climb the ranks!</p>
        <p>Your best score will be saved locally.</p>
      </div>
    </div>
  );
};

export default Leaderboard;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSoundEnabled, setMusicEnabled, setVibrationEnabled, setAnimations } from '../redux/reducers/uiReducer';

const Settings = () => {
  const dispatch = useDispatch();
  const { soundEnabled, musicEnabled, vibrationEnabled, animations } = useSelector(state => state.ui);

  return (
    <div className="settings">
      <h2>Settings</h2>

      <div className="settings-group">
        <h3>Audio</h3>
        <label className="setting-item">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => dispatch(setSoundEnabled(e.target.checked))}
          />
          Sound Effects
        </label>

        <label className="setting-item">
          <input
            type="checkbox"
            checked={musicEnabled}
            onChange={(e) => dispatch(setMusicEnabled(e.target.checked))}
          />
          Background Music
        </label>

        <label className="setting-item">
          <input
            type="checkbox"
            checked={vibrationEnabled}
            onChange={(e) => dispatch(setVibrationEnabled(e.target.checked))}
          />
          Vibration
        </label>
      </div>

      <div className="settings-group">
        <h3>Visual</h3>
        <label className="setting-item">
          <input
            type="checkbox"
            checked={animations}
            onChange={(e) => dispatch(setAnimations(e.target.checked))}
          />
          Animations
        </label>
      </div>

      <div className="settings-group">
        <h3>About</h3>
        <p>Cooking Game PWA v1.0.0</p>
        <p>Optimized for mobile devices</p>
      </div>
    </div>
  );
};

export default Settings;
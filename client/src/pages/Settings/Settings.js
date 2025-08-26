import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      opportunities: true,
      messages: true
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false
    },
    account: {
      language: 'en',
      timezone: 'UTC',
      theme: 'light'
    }
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save settings
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
              />
              Email notifications
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
              />
              Push notifications
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications.opportunities}
                onChange={(e) => handleSettingChange('notifications', 'opportunities', e.target.checked)}
              />
              New opportunities
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications.messages}
                onChange={(e) => handleSettingChange('notifications', 'messages', e.target.checked)}
              />
              Messages
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>Privacy</h2>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.privacy.profileVisible}
                onChange={(e) => handleSettingChange('privacy', 'profileVisible', e.target.checked)}
              />
              Make profile visible to others
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.privacy.showEmail}
                onChange={(e) => handleSettingChange('privacy', 'showEmail', e.target.checked)}
              />
              Show email address on profile
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.privacy.showPhone}
                onChange={(e) => handleSettingChange('privacy', 'showPhone', e.target.checked)}
              />
              Show phone number on profile
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>Account Settings</h2>
          <div className="setting-item">
            <label>Language</label>
            <select
              value={settings.account.language}
              onChange={(e) => handleSettingChange('account', 'language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div className="setting-item">
            <label>Timezone</label>
            <select
              value={settings.account.timezone}
              onChange={(e) => handleSettingChange('account', 'timezone', e.target.value)}
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
            </select>
          </div>
          <div className="setting-item">
            <label>Theme</label>
            <select
              value={settings.account.theme}
              onChange={(e) => handleSettingChange('account', 'theme', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        <div className="settings-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

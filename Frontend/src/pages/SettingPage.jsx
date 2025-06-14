import React, { useState, useEffect } from 'react';
import ChangePasswordSection from '../components/settings/ChangePasswordSection';

const TABS = ['Profile', 'Preferences', 'Notifications', 'Security', 'Integrations'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile');

  // States cho các mục
  const [profile, setProfile] = useState({ fullName: '', profession: '', avatarUrl: '' });
  const [preferences, setPreferences] = useState({ theme: 'light', defaultView: 'list', timezone: '', dateFormat: 'dd/MM/yyyy' });
  const [notifications, setNotifications] = useState({ taskReminders: true, emailAlerts: true, emailLeadTime: '1h', pushNotifications: false });
  const [security, setSecurity] = useState({ twoFA: false }); // đã bỏ các field mật khẩu ra khỏi đây
  const [integrations, setIntegrations] = useState({ calendarSync: false, exportFormat: 'csv' });

  // Load dữ liệu từ localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('appSettings') || '{}');
    if (saved.profile) setProfile(saved.profile);
    if (saved.preferences) setPreferences(saved.preferences);
    if (saved.notifications) setNotifications(saved.notifications);
    if (saved.security) setSecurity(saved.security);
    if (saved.integrations) setIntegrations(saved.integrations);
  }, []);

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) setProfile(prev => ({ ...prev, avatarUrl: URL.createObjectURL(file) }));
  };

  const handleSave = () => {
    const settings = { profile, preferences, notifications, security, integrations };
    localStorage.setItem('appSettings', JSON.stringify(settings));
    localStorage.setItem('userProfile', JSON.stringify(profile));
    window.dispatchEvent(new Event('profileChanged'));
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 -mb-px font-medium ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Nội dung từng tab */}
      <div className="space-y-6">
        {activeTab === 'Profile' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={e => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Profession</label>
              <input
                type="text"
                value={profile.profession}
                onChange={e => setProfile(prev => ({ ...prev, profession: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Avatar</label>
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
              {profile.avatarUrl && (
                <img
                  src={profile.avatarUrl}
                  alt="Avatar preview"
                  className="w-24 h-24 rounded-full mt-2 border"
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'Preferences' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Theme</label>
              <select
                value={preferences.theme}
                onChange={e => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Default View</label>
              <select
                value={preferences.defaultView}
                onChange={e => setPreferences(prev => ({ ...prev, defaultView: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="list">List</option>
                <option value="board">Board</option>
                <option value="calendar">Calendar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Timezone</label>
              <input
                type="text"
                value={preferences.timezone}
                onChange={e => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                placeholder="e.g. UTC+7"
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date Format</label>
              <select
                value={preferences.dateFormat}
                onChange={e => setPreferences(prev => ({ ...prev, dateFormat: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="dd/MM/yyyy">dd/MM/yyyy</option>
                <option value="MM/dd/yyyy">MM/dd/yyyy</option>
                <option value="yyyy-MM-dd">yyyy-MM-dd</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.taskReminders}
                onChange={e => setNotifications(prev => ({ ...prev, taskReminders: e.target.checked }))}
              />
              Task Reminders
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.emailAlerts}
                onChange={e => setNotifications(prev => ({ ...prev, emailAlerts: e.target.checked }))}
              />
              Email Alerts
            </label>
            {notifications.emailAlerts && (
              <div>
                <label className="block text-sm font-medium mb-1">Lead Time</label>
                <select
                  value={notifications.emailLeadTime}
                  onChange={e => setNotifications(prev => ({ ...prev, emailLeadTime: e.target.value }))}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="5m">5 minutes before</option>
                  <option value="1h">1 hour before</option>
                  <option value="1d">1 day before</option>
                </select>
              </div>
            )}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={e => setNotifications(prev => ({ ...prev, pushNotifications: e.target.checked }))}
              />
              Push Notifications
            </label>
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="space-y-6 max-w-md">
            <ChangePasswordSection />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={security.twoFA}
                onChange={e => setSecurity(prev => ({ ...prev, twoFA: e.target.checked }))}
              />
              Enable Two-Factor Authentication (2FA)
            </label>
          </div>
        )}

        {activeTab === 'Integrations' && (
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={integrations.calendarSync}
                onChange={e => setIntegrations(prev => ({ ...prev, calendarSync: e.target.checked }))}
              />
              Calendar Sync (Google, Outlook)
            </label>
            <div>
              <label className="block text-sm font-medium mb-1">Export Format</label>
              <select
                value={integrations.exportFormat}
                onChange={e => setIntegrations(prev => ({ ...prev, exportFormat: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Import Tasks</label>
              <input type="file" accept=".csv,.json" />
            </div>
          </div>
        )}
      </div>

      {/* Nút lưu thiết lập */}
      {activeTab !== 'Security' && (
        <div className="mt-8 text-right">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Save Settings
          </button>
        </div>
      )}
    </div>
  );
}

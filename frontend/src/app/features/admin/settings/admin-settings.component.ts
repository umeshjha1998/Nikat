import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header"><h1>Platform Settings</h1></div>

    <div class="settings-section">
      <h2><span class="material-icons">tune</span> General Settings</h2>
      <div class="settings-card">
        <div class="setting-row">
          <div class="setting-info"><h4>Platform Name</h4><p>Name displayed across the platform</p></div>
          <input type="text" class="text-input" value="Nikat">
        </div>
        <div class="setting-row">
          <div class="setting-info"><h4>Support Email</h4><p>Contact email for support queries</p></div>
          <input type="text" class="text-input" value="support@nikat.in">
        </div>
        <div class="setting-row">
          <div class="setting-info"><h4>Default Currency</h4><p>Currency used across the platform</p></div>
          <select class="select-input"><option>INR (₹)</option><option>USD ($)</option></select>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h2><span class="material-icons">notifications_active</span> Notifications</h2>
      <div class="settings-card">
        <div class="setting-row">
          <div class="setting-info"><h4>Email Notifications</h4><p>Send email alerts for important events</p></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
        <div class="setting-row">
          <div class="setting-info"><h4>Push Notifications</h4><p>Browser push notifications</p></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
        <div class="setting-row">
          <div class="setting-info"><h4>SMS Alerts</h4><p>Send SMS for critical events</p></div>
          <label class="toggle"><input type="checkbox"><span class="slider"></span></label>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h2><span class="material-icons">security</span> Security</h2>
      <div class="settings-card">
        <div class="setting-row">
          <div class="setting-info"><h4>Two-Factor Authentication</h4><p>Require 2FA for admin accounts</p></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
        <div class="setting-row">
          <div class="setting-info"><h4>Session Timeout</h4><p>Auto-logout after inactivity</p></div>
          <select class="select-input"><option>30 minutes</option><option>1 hour</option><option>4 hours</option></select>
        </div>
      </div>
    </div>

    <div class="save-bar">
      <button class="save-btn"><span class="material-icons">save</span> Save Changes</button>
    </div>
  `,
  styleUrls: ['../admin-shared.css']
})
export class AdminSettingsComponent {}

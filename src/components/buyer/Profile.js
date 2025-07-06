import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="/placeholder-avatar.jpg" alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>Michael Johnson</h2>
          <p className="email">buyer1@udigi.com</p>
          <p className="member-since">Member since: July 5, 2025</p>
        </div>
      </div>

      <div className="profile-sections">
        <div className="section">
          <h3>Contact Information</h3>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="(555) 123-4567" />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" placeholder="123 Main St" />
          </div>
        </div>

        <div className="section">
          <h3>Property Preferences</h3>
          <div className="form-group">
            <label>Preferred Location</label>
            <input type="text" placeholder="Downtown, Suburban" />
          </div>
          <div className="form-group">
            <label>Price Range</label>
            <input type="text" placeholder="$200,000 - $500,000" />
          </div>
        </div>

        <div className="section">
          <h3>Notification Preferences</h3>
          <div className="form-group">
            <label>Email Notifications</label>
            <select>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div className="form-group">
            <label>Text Notifications</label>
            <select>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>
      </div>

      <button className="save-changes">Save Changes</button>
    </div>
  );
};

export default Profile;

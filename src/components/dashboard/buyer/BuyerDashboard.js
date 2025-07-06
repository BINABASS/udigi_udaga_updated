import React from 'react';
import './BuyerDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const BuyerDashboard = () => {
  return (
    <div className="buyer-dashboard">
      <div className="dashboard-header">
        <h2>Buyer Dashboard</h2>
        <p>Welcome to your property search dashboard</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faHome} />
          </div>
          <div className="stat-content">
            <h3>Properties Viewed</h3>
            <p className="stat-number">25</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="stat-content">
            <h3>Favorites</h3>
            <p className="stat-number">5</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <div className="stat-content">
            <h3>Saved Searches</h3>
            <p className="stat-number">3</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="stat-content">
            <h3>Profile Complete</h3>
            <p className="stat-number">80%</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">
              <FontAwesomeIcon icon={faHome} />
            </span>
            <div className="activity-content">
              <p>Viewed property in Downtown</p>
              <span className="activity-time">30 minutes ago</span>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-icon">
              <FontAwesomeIcon icon={faHeart} />
            </span>
            <div className="activity-content">
              <p>Saved luxury apartment</p>
              <span className="activity-time">1 hour ago</span>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-icon">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <div className="activity-content">
              <p>Updated search preferences</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;

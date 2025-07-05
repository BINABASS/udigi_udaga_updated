import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [notifications] = useState(5);
  const [unreadMessages] = useState(3);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Digital Brokerage</h1>
          <p className="sidebar-tagline">Real Estate Management System</p>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/dashboard" className="nav-link active">
                <i className="fas fa-chart-line"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/properties" className="nav-link">
                <i className="fas fa-home"></i>
                <span>Properties</span>
                <span className="nav-badge">125</span>
              </Link>
            </li>
            <li>
              <Link to="/bookings" className="nav-link">
                <i className="fas fa-calendar"></i>
                <span>Bookings</span>
                <span className="nav-badge">42</span>
              </Link>
            </li>
            <li>
              <Link to="/clients" className="nav-link">
                <i className="fas fa-users"></i>
                <span>Clients</span>
                <span className="nav-badge">35</span>
              </Link>
            </li>
            <li>
              <Link to="/messages" className="nav-link">
                <i className="fas fa-envelope"></i>
                <span>Messages</span>
                <span className="nav-badge">{unreadMessages}</span>
              </Link>
            </li>
            <li>
              <Link to="/reports" className="nav-link">
                <i className="fas fa-chart-bar"></i>
                <span>Reports</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="sidebar-button">
            <i className="fas fa-cog"></i>
            Settings
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="header">
          <div className="welcome">
            <h2>Dashboard Overview</h2>
            <p>Today's Summary - July 5, 2025</p>
          </div>
          <div className="user-actions">
            <div className="notification-badge">
              <i className="fas fa-bell"></i>
              <span>{notifications}</span>
            </div>
            <Link to="/login" className="logout-btn">
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </Link>
          </div>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-home"></i>
            </div>
            <div className="stat-content">
              <h3>Total Properties</h3>
              <p className="stat-number">125</p>
              <span className="trend up">+15% from last month</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-calendar"></i>
            </div>
            <div className="stat-content">
              <h3>Active Bookings</h3>
              <p className="stat-number">42</p>
              <span className="trend up">+8% increase</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content">
              <h3>New Clients</h3>
              <p className="stat-number">35</p>
              <span className="trend up">+12% growth</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="stat-content">
              <h3>Messages</h3>
              <p className="stat-number">18</p>
              <span className="trend down">-5% decrease</span>
            </div>
          </div>
        </div>
        <div className="charts-section">
          <div className="chart-container">
            <h3>Recent Activity</h3>
            <div className="chart-placeholder">
              <div className="chart-item">
                <i className="fas fa-home"></i>
                <div className="chart-info">
                  <h4>Property Added</h4>
                  <p>12 mins ago</p>
                </div>
              </div>
              <div className="chart-item">
                <i className="fas fa-calendar"></i>
                <div className="chart-info">
                  <h4>Booking Confirmed</h4>
                  <p>45 mins ago</p>
                </div>
              </div>
              <div className="chart-item">
                <i className="fas fa-users"></i>
                <div className="chart-info">
                  <h4>New Client</h4>
                  <p>1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className="chart-container">
            <h3>Property Distribution</h3>
            <div className="chart-placeholder">
              <div className="chart-distribution">
                <div className="chart-distribution-item">
                  <div className="chart-type">
                    <i className="fas fa-building"></i>
                    <span>Residential</span>
                  </div>
                  <div className="chart-progress">
                    <div className="chart-bar" style={{ width: '65%' }}></div>
                  </div>
                  <div className="chart-value">65%</div>
                </div>
                <div className="chart-distribution-item">
                  <div className="chart-type">
                    <i className="fas fa-store"></i>
                    <span>Commercial</span>
                  </div>
                  <div className="chart-progress">
                    <div className="chart-bar" style={{ width: '25%' }}></div>
                  </div>
                  <div className="chart-value">25%</div>
                </div>
                <div className="chart-distribution-item">
                  <div className="chart-type">
                    <i className="fas fa-landmark"></i>
                    <span>Land</span>
                  </div>
                  <div className="chart-progress">
                    <div className="chart-bar" style={{ width: '10%' }}></div>
                  </div>
                  <div className="chart-value">10%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

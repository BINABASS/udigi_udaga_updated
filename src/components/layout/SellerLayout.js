import React from 'react';
import { Link } from 'react-router-dom';
import './SellerLayout.css';

const SellerLayout = ({ children }) => {
  return (
    <div className="seller-layout">
      <div className="seller-sidebar">
        <div className="seller-sidebar-header">
          <h1>Seller Dashboard</h1>
          <p>Manage Your Properties</p>
        </div>
        <nav className="seller-sidebar-nav">
          <ul>
            <li>
              <Link to="/seller/dashboard" className="nav-link">
                <i className="fas fa-chart-line"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/seller/properties" className="nav-link">
                <i className="fas fa-home"></i>
                <span>My Properties</span>
                <span className="nav-badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/seller/inquiries" className="nav-link">
                <i className="fas fa-envelope"></i>
                <span>Inquiries</span>
              </Link>
            </li>
            <li>
              <Link to="/seller/analytics" className="nav-link">
                <i className="fas fa-chart-bar"></i>
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link to="/seller/settings" className="nav-link">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="seller-main-content">
        <div className="seller-header">
          <div className="seller-welcome">
            <h2>My Dashboard</h2>
            <p>Manage your properties and track performance</p>
          </div>
          <div className="seller-actions">
            <button className="add-property-btn">
              <i className="fas fa-plus"></i>
              Add New Property
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SellerLayout;

import React from 'react';
import { Link } from 'react-router-dom';
import './BuyerLayout.css';

const BuyerLayout = ({ children }) => {
  return (
    <div className="buyer-layout">
      <div className="buyer-sidebar">
        <div className="buyer-logo">
          <h2>Buyer Dashboard</h2>
        </div>
        <nav className="buyer-nav">
          <ul>
            <li>
              <Link to="/buyer/dashboard">
                <i className="fas fa-home"></i>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/buyer/properties">
                <i className="fas fa-building"></i>
                Properties
              </Link>
            </li>
            <li>
              <Link to="/buyer/favorites">
                <i className="fas fa-heart"></i>
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/buyer/saved-searches">
                <i className="fas fa-search"></i>
                Saved Searches
              </Link>
            </li>
            <li>
              <Link to="/buyer/profile">
                <i className="fas fa-user"></i>
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="buyer-main-content">
        {children}
      </div>
    </div>
  );
};

export default BuyerLayout;

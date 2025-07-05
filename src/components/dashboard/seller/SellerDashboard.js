import React, { useState } from 'react';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const [properties] = useState([
    {
      id: 1,
      title: 'Luxury Villa',
      status: 'Available',
      price: 889000,
      views: 125,
      inquiries: 8,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Modern Apartment',
      status: 'Pending',
      price: 450000,
      views: 87,
      inquiries: 3,
      lastUpdated: new Date().toISOString()
    }
  ]);

  const [stats] = useState({
    totalProperties: 2,
    totalViews: 212,
    totalInquiries: 11,
    averagePrice: 669500
  });

  return (
    <div className="seller-dashboard">
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Properties</h3>
          <p className="stat-number">{stats.totalProperties}</p>
          <div className="stat-details">
            <span className="stat-label">Active</span>
            <span className="stat-value">2</span>
          </div>
        </div>
        <div className="stat-card">
          <h3>Total Views</h3>
          <p className="stat-number">{stats.totalViews}</p>
          <div className="stat-details">
            <span className="stat-label">This Month</span>
            <span className="stat-value">+15%</span>
          </div>
        </div>
        <div className="stat-card">
          <h3>Inquiries</h3>
          <p className="stat-number">{stats.totalInquiries}</p>
          <div className="stat-details">
            <span className="stat-label">Pending</span>
            <span className="stat-value">3</span>
          </div>
        </div>
        <div className="stat-card">
          <h3>Average Price</h3>
          <p className="stat-number">${stats.averagePrice.toLocaleString()}</p>
          <div className="stat-details">
            <span className="stat-label">Market Avg</span>
            <span className="stat-value">+5%</span>
          </div>
        </div>
      </div>

      <div className="properties-grid">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            <div className="property-header">
              <h3>{property.title}</h3>
              <span className={`status-badge ${property.status.toLowerCase()}`}>
                {property.status}
              </span>
            </div>
            <div className="property-metrics">
              <div className="metric">
                <i className="fas fa-eye"></i>
                <span>{property.views} Views</span>
              </div>
              <div className="metric">
                <i className="fas fa-envelope"></i>
                <span>{property.inquiries} Inquiries</span>
              </div>
              <div className="metric">
                <i className="fas fa-clock"></i>
                <span>Updated {new Date(property.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="property-actions">
              <button className="edit-btn">
                <i className="fas fa-edit"></i>
                Edit
              </button>
              <button className="view-btn">
                <i className="fas fa-eye"></i>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;

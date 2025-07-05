import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import './PropertyDetails.css';
import '../ui/uiComponents.css';
import PropertyForm from './PropertyForm';

const PropertyDetails = ({ property, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // Handle property deletion
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get updated properties from localStorage
      const properties = JSON.parse(localStorage.getItem('properties')) || [];
      // Filter out the property to be deleted
      const updatedProperties = properties.filter(p => p.id !== property.id);
      // Save updated properties
      localStorage.setItem('properties', JSON.stringify(updatedProperties));
      
      // Show success message
      toast.success('Property deleted successfully');
      
      // Close details modal
      onClose();
    } catch (err) {
      setError('Failed to delete property');
      toast.error('Failed to delete property');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="property-details-modal">
      <div className="property-details-content">
        <div className="property-details-header">
          <h2 className="property-details-title" aria-label={`Property details for ${property.title}`}>
            {property.title}
          </h2>
          <button 
            className="close-btn" 
            onClick={handleClose}
            aria-label="Close property details"
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>

        <div className="property-header">
          <div className="property-image">
            <img src={property.image} alt={property.title} />
            <div className="image-overlay">
              <h2 className="property-title-overlay">{property.title}</h2>
              <div className="property-price-overlay">
                ${property.price.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="property-info-header">
            <div className="property-price-status">
              <div className="price-tag">
                ${property.price.toLocaleString()}
              </div>
              <div className={`status-badge ${property.status.toLowerCase()}`}>
                {property.status}
              </div>
            </div>

            <div className="property-meta">
              <div className="meta-item">
                <i className="fas fa-home"></i>
                {property.type}
              </div>
              <div className="meta-item">
                <i className="fas fa-map-marker-alt"></i>
                {property.location}
              </div>
              <div className="meta-item">
                <i className="fas fa-bed"></i>
                {property.bedrooms} Beds
              </div>
              <div className="meta-item">
                <i className="fas fa-bath"></i>
                {property.bathrooms} Baths
              </div>
              <div className="meta-item">
                <i className="fas fa-ruler-combined"></i>
                {property.area} sqft
              </div>
            </div>
          </div>
        </div>

        <div className="property-actions">
          <button 
            className="action-btn edit-btn accessible-btn" 
            onClick={() => {
              setEditingProperty(property);
              setShowForm(true);
            }}
            aria-label="Edit property"
            disabled={isLoading}
          >
            <i className="fas fa-edit" aria-hidden="true"></i>
            Edit
          </button>
          <button 
            className="action-btn delete-btn accessible-btn" 
            onClick={handleDelete}
            aria-label="Delete property"
            disabled={isLoading}
          >
            <i className="fas fa-trash" aria-hidden="true"></i>
            Delete
          </button>
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}
        </div>

        <div className="property-details-main">
          {isLoading ? (
            <div className="loading-container">
              <Skeleton height={200} />
            </div>
          ) : (
            <div className="property-description">
              <h2 aria-label="Property description">Description</h2>
              <p>{property.description}</p>
            </div>
          )}

          <div className="property-features-section">
            <h2>Features</h2>
            <div className="features-grid">
              {property.features?.map((feature, index) => (
                <div key={index} className="feature-item">
                  <i className={`fas ${feature.icon}`}></i>
                  <span>{feature.label}</span>
                </div>
              )) || (
                <div className="no-features">
                  No features available
                </div>
              )}
            </div>
          </div>

          <div className="property-amenities-section">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {property.amenities?.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <i className={`fas ${amenity.icon}`}></i>
                  <span>{amenity.label}</span>
                </div>
              )) || (
                <div className="no-amenities">
                  No amenities available
                </div>
              )}
            </div>
          </div>

          <div className="property-footer">
            <div className="action-buttons">
              <button className="back-btn" onClick={onClose}>
                <i className="fas fa-arrow-left"></i>
                Back
              </button>
              <button className="book-now-btn">
                <i className="fas fa-calendar-check"></i>
                Book Now
              </button>
            </div>
          </div>
        </div>

        {showForm && (
          <PropertyForm
            property={editingProperty}
            onClose={() => {
              setShowForm(false);
              setEditingProperty(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;

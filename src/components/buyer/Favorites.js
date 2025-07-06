import React from 'react';
import './Favorites.css';

const Favorites = () => {
  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <div className="favorites-grid">
        {/* Add your favorites list here */}
        <div className="favorite-item">
          <div className="favorite-image">
            <img src="/placeholder.jpg" alt="Property" />
          </div>
          <div className="favorite-details">
            <h3>Luxury Apartment</h3>
            <p className="location">Downtown Area</p>
            <p className="price">$450,000</p>
            <button className="remove-favorite">Remove</button>
          </div>
        </div>
        
        <div className="favorite-item">
          <div className="favorite-image">
            <img src="/placeholder.jpg" alt="Property" />
          </div>
          <div className="favorite-details">
            <h3>Family Home</h3>
            <p className="location">Suburban Area</p>
            <p className="price">$320,000</p>
            <button className="remove-favorite">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;

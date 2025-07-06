import React from 'react';
import './SavedSearches.css';

const SavedSearches = () => {
  return (
    <div className="saved-searches-container">
      <h2>Saved Searches</h2>
      <div className="searches-list">
        {/* Add your saved searches here */}
        <div className="search-item">
          <div className="search-details">
            <h3>Family Home Search</h3>
            <p>3-4 bedrooms, $300k-$500k, Suburban area</p>
            <p className="last-run">Last run: 2 days ago</p>
          </div>
          <div className="search-actions">
            <button className="run-search">Run Now</button>
            <button className="edit-search">Edit</button>
            <button className="delete-search">Delete</button>
          </div>
        </div>

        <div className="search-item">
          <div className="search-details">
            <h3>Investment Property</h3>
            <p>2-3 bedrooms, $200k-$300k, City center</p>
            <p className="last-run">Last run: 1 week ago</p>
          </div>
          <div className="search-actions">
            <button className="run-search">Run Now</button>
            <button className="edit-search">Edit</button>
            <button className="delete-search">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedSearches;

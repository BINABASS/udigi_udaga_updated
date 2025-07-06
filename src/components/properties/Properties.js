import React, { useState, useEffect } from 'react';
import PropertyForm from './PropertyForm';
import PropertyDetails from './PropertyDetails';
import { propertyTypes, propertyStatuses } from '../../data/properties';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import './Properties.css';

const Properties = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState(() => {
    const savedProperties = JSON.parse(localStorage.getItem('properties')) || [
      {
        id: 1,
        title: 'Luxury Villa',
        type: 'Villa',
        status: 'Available',
        price: 889000,
        bedrooms: 4,
        bathrooms: 4,
        area: 4200,
        location: 'Downtown',
        amenities: ['pool', 'garden', 'wifi', 'pet friendly'],
        description: 'Luxurious villa with stunning city views and modern amenities.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Modern Apartment',
        type: 'Apartment',
        status: 'Rented',
        price: 250000,
        bedrooms: 3,
        bathrooms: 2,
        area: 1500,
        location: 'Suburb',
        amenities: ['wifi', 'parking', 'gym'],
        description: 'Spacious modern apartment with great amenities.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Beach House',
        type: 'House',
        status: 'Available',
        price: 550000,
        bedrooms: 5,
        bathrooms: 3,
        area: 3200,
        location: 'Beachfront',
        amenities: ['pool', 'garden', 'ac', 'kitchen'],
        description: 'Beautiful beach house with direct ocean access.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }
    ];
    return savedProperties;
  });
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filter, setFilter] = useState({
    type: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    minBathrooms: '',
    minArea: ''
  });

  useEffect(() => {
    // Filter properties based on selected criteria
    const filtered = properties.filter((property) => {
      const matchesType = !filter.type || property.type === filter.type;
      const matchesStatus = !filter.status || property.status === filter.status;
      const matchesPrice = !filter.minPrice || property.price >= parseInt(filter.minPrice);
      const matchesBedrooms = !filter.minBedrooms || property.bedrooms >= parseInt(filter.minBedrooms);
      const matchesBathrooms = !filter.minBathrooms || property.bathrooms >= parseInt(filter.minBathrooms);
      const matchesArea = !filter.minArea || property.area >= parseInt(filter.minArea);
      
      return matchesType && matchesStatus && matchesPrice && matchesBedrooms && matchesBathrooms && matchesArea;
    });
    setFilteredProperties(filtered);
  }, [filter, properties]);

  const handleDelete = (propertyId) => {
    const confirmed = window.confirm('Are you sure you want to delete this property?');
    if (confirmed) {
      const updatedProperties = properties.filter(p => p.id !== propertyId);
      setProperties(updatedProperties);
      localStorage.setItem('properties', JSON.stringify(updatedProperties));
    }
  };

  const handleStatusChange = (propertyId, newStatus) => {
    const updatedProperties = properties.map(p => 
      p.id === propertyId ? { ...p, status: newStatus } : p
    );
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  return (
    <div className="properties-container">
      <div className="properties-header">
        <h2>Properties</h2>
        <div className="header-actions">
          <button className="filter-button" onClick={() => setShowForm(true)}>
            <FontAwesomeIcon icon={faFilter} /> Filter
          </button>
          <button className="add-button" onClick={() => setShowForm(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add Property
          </button>
        </div>
      </div>

      <div className="properties-filters">
        <select
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          placeholder="Type"
        >
          <option value="">All Types</option>
          {propertyTypes.map(type => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
        
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          placeholder="Status"
        >
          <option value="">All Statuses</option>
          {propertyStatuses.map(status => (
            <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
          ))}
        </select>

        <div className="price-filter">
          <input
            type="number"
            value={filter.minPrice}
            onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
            placeholder="Min Price"
          />
          <span>-</span>
          <input
            type="number"
            value={filter.maxPrice}
            onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
            placeholder="Max Price"
          />
        </div>
      </div>

      <div className="properties-grid">
        {filteredProperties.map((property) => (
          <div key={property.id} className="property-card">
            <img src={property.image} alt={property.title} />
            <div className="property-info">
              <h3>{property.title}</h3>
              <p className="price">${property.price.toLocaleString()}</p>
              <div className="property-details">
                <span>{property.bedrooms} Beds</span>
                <span>{property.bathrooms} Baths</span>
                <span>{property.area} sqft</span>
              </div>
              <div className="property-status">
                <span className={`status-badge ${property.status}`}>
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </span>
              </div>
              <div className="property-actions">
                <button onClick={() => {
                  setSelectedProperty(property);
                  setShowDetails(true);
                }}>
                  <FontAwesomeIcon icon={faEye} /> View
                </button>
                <button onClick={() => {
                  setEditingProperty(property);
                  setShowForm(true);
                }}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button onClick={() => handleDelete(property.id)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <PropertyForm
          onClose={() => {
            setShowForm(false);
            setEditingProperty(null);
          }}
          property={editingProperty}
          onSave={(newProperty) => {
            const updatedProperties = editingProperty
              ? properties.map(p => p.id === editingProperty.id ? newProperty : p)
              : [...properties, newProperty];
            setProperties(updatedProperties);
            localStorage.setItem('properties', JSON.stringify(updatedProperties));
            setShowForm(false);
          }}
        />
      )}

      {showDetails && selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          onClose={() => {
            setShowDetails(false);
            setSelectedProperty(null);
          }}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default Properties;

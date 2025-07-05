import React, { useState, useMemo, useEffect } from 'react';
import PropertyForm from './PropertyForm';
import PropertyDetails from './PropertyDetails';
import './Properties.css';

const amenityIcons = {
  'pool': 'fa-swimming-pool',
  'garden': 'fa-tree',
  'security': 'fa-shield-alt',
  'parking': 'fa-parking',
  'wifi': 'fa-wifi',
  'gym': 'fa-dumbbell',
  'balcony': 'fa-window-maximize',
  'pet friendly': 'fa-paw',
  'ac': 'fa-snowflake',
  'laundry': 'fa-tshirt',
  'kitchen': 'fa-utensils'
};

const getAmenityIcon = (amenity) => {
  const key = amenity.toLowerCase().replace(/\s+/g, '');
  return amenityIcons[key] || 'fa-star';
};

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
        title: 'Modern House',
        type: 'House',
        status: 'Sold',
        price: 550000,
        bedrooms: 3,
        bathrooms: 3,
        area: 900,
        location: 'Stone Town',
        amenities: ['pool', 'pet friendly'],
        description: 'Sleek modern house with beautiful city views.',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }
    ];
    return savedProperties;
  });

  const [typeFilter, setTypeFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState(1000000);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesStatus = statusFilter === 'all' || property.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesType = typeFilter === 'all' || property.type.toLowerCase() === typeFilter.toLowerCase();
      const matchesPrice = property.price <= priceFilter;
      const matchesSearch = 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesType && matchesPrice && matchesSearch;
    });
  }, [properties, statusFilter, typeFilter, priceFilter, searchQuery]);

  // Effects
  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  // Handlers
  const handlePropertySave = (propertyData) => {
    if (editingProperty) {
      // Update existing property
      const updatedProperties = properties.map(p => 
        p.id === editingProperty.id ? { ...p, ...propertyData } : p
      );
      setProperties(updatedProperties);
    } else {
      // Add new property
      const newProperty = {
        ...propertyData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      setProperties([...properties, newProperty]);
    }
    setShowForm(false);
    setEditingProperty(null);
  };

  return (
    <div className="properties-page">
      <div className="properties-header">
        <h1>Properties</h1>
        <div className="header-actions">
          <button 
            className="add-property-btn" 
            onClick={() => setShowForm(true)}
          >
            <i className="fas fa-plus"></i>
            Add Property
          </button>
        </div>
      </div>

      <div className="properties-filters">
        <div className="filter-group">
          <label>Status</label>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Type</label>
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="villa">Villa</option>
            <option value="house">House</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Price Range</label>
          <input 
            type="number" 
            value={priceFilter} 
            onChange={(e) => setPriceFilter(e.target.value)}
            placeholder="$1,000,000"
            min="0"
          />
        </div>

        <div className="filter-group">
          <label>Search</label>
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search properties..."
          />
        </div>
      </div>

      <div className="properties-grid">
        {filteredProperties.map((property) => (
          <div 
            key={property.id} 
            className="property-card"
            onClick={() => setSelectedProperty(property)}
          >
            <div className="property-image">
              <img src={property.image} alt={property.title} />
              <div className="property-status">
                {property.status}
              </div>
            </div>
            <div className="property-content">
              <h3>{property.title}</h3>
              <div className="property-type">
                {property.type}
              </div>
              <div className="property-price">
                ${property.price.toLocaleString()}
              </div>
              <div className="property-meta">
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
              <div className="property-amenities">
                {property.amenities.map((amenity, index) => (
                  <div 
                    key={index} 
                    className="amenity-item"
                  >
                    <i className={`fas ${getAmenityIcon(amenity)}`} aria-hidden="true"></i>
                    {amenity.replace(/\s+/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                ))}
              </div>
            </div>
            <div className="property-actions">
              <button 
                className="action-btn view-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProperty(property);
                  setShowDetails(true);
                }}
              >
                <i className="fas fa-eye"></i>
                Quick View
              </button>
              <button 
                className="action-btn edit-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingProperty(property);
                  setShowForm(true);
                }}
              >
                <i className="fas fa-edit"></i>
                Edit
              </button>
              <button 
                className="action-btn delete-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  const updatedProperties = properties.filter(p => p.id !== property.id);
                  setProperties(updatedProperties);
                  localStorage.setItem('properties', JSON.stringify(updatedProperties));
                }}
              >
                <i className="fas fa-trash"></i>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="property-form-modal">
          <div className="property-form-content">
            <PropertyForm 
              property={editingProperty || null}
              onClose={() => {
                setShowForm(false);
                setEditingProperty(null);
              }}
              onSubmit={handlePropertySave}
            />
          </div>
        </div>
      )}

      {showDetails && selectedProperty && (
        <div className="property-details-modal">
          <PropertyDetails 
            property={selectedProperty}
            onClose={() => {
              setShowDetails(false);
              setSelectedProperty(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Properties

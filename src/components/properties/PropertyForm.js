import React, { useState, useEffect } from 'react';
import './PropertyForm.css';

const PropertyForm = ({ onClose, onSubmit, property = null }) => {
  const [formData, setFormData] = useState(property || {
    title: '',
    type: '',
    status: 'available',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    location: '',
    image: null,
    previewImage: null
  });

  const [amenities, setAmenities] = useState(property?.amenities || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setAmenities(prev => checked 
      ? [...prev, value] 
      : prev.filter(amenity => amenity !== value)
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a JPEG, PNG, or WebP image.');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size should be less than 5MB.');
      return;
    }

    setFormData(prev => ({
      ...prev,
      image: file
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        previewImage: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please upload a property image.');
      return;
    }

    const propertyData = {
      ...formData,
      amenities,
      price: parseFloat(formData.price),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      area: parseInt(formData.area)
    };

    onSubmit(propertyData);
    onClose();
  };

  useEffect(() => {
    if (property) {
      setFormData({
        ...property,
        previewImage: property.image
      });
      setAmenities(property.amenities || []);
    }
  }, [property]);

  return (
    <div className="property-form-modal">
      <div className="property-form-content">
        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-header">
            <h2>{property ? 'Edit Property' : 'Add New Property'}</h2>
            <button 
              type="button" 
              className="close-btn" 
              onClick={onClose}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select 
              name="type" 
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Property Type</option>
              <option value="villa">Villa</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="land">Land</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select 
              name="status" 
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="booked">Booked</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price ($)</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Bedrooms</label>
            <input 
              type="number" 
              name="bedrooms" 
              value={formData.bedrooms}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Bathrooms</label>
            <input 
              type="number" 
              name="bathrooms" 
              value={formData.bathrooms}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Area (sqft)</label>
            <input 
              type="number" 
              name="area" 
              value={formData.area}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Property Image</label>
            <div className="image-upload-container">
              {formData.previewImage ? (
                <div className="preview-image">
                  <img src={formData.previewImage} alt="Preview" />
                  <button 
                    type="button" 
                    className="remove-image-btn" 
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        image: null,
                        previewImage: null
                      }));
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ) : (
                <div className="upload-area" 
                     onDragOver={handleDragOver}
                     onDrop={handleDrop}
                >
                  <input 
                    type="file" 
                    name="image" 
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                  />
                  <p>Drag and drop an image or click to select</p>
                </div>
              )}
            </div>
          </div>

          <div className="form-group amenities-group">
            <label>Amenities</label>
            <div className="amenities-list">
              <label className="amenity-item">
                <input 
                  type="checkbox" 
                  value="pool" 
                  checked={amenities.includes('pool')}
                  onChange={handleAmenityChange}
                />
                Pool
              </label>
              <label className="amenity-item">
                <input 
                  type="checkbox" 
                  value="garden" 
                  checked={amenities.includes('garden')}
                  onChange={handleAmenityChange}
                />
                Garden
              </label>
              <label className="amenity-item">
                <input 
                  type="checkbox" 
                  value="parking" 
                  checked={amenities.includes('parking')}
                  onChange={handleAmenityChange}
                />
                Parking
              </label>
              <label className="amenity-item">
                <input 
                  type="checkbox" 
                  value="wifi" 
                  checked={amenities.includes('wifi')}
                  onChange={handleAmenityChange}
                />
                WiFi
              </label>
              <label className="amenity-item">
                <input 
                  type="checkbox" 
                  value="gym" 
                  checked={amenities.includes('gym')}
                  onChange={handleAmenityChange}
                />
                Gym
              </label>
              <label className="amenity-item">
                <input 
                  type="checkbox" 
                  value="balcony" 
                  checked={amenities.includes('balcony')}
                  onChange={handleAmenityChange}
                />
                Balcony
              </label>
              <label className="amenity-item">
                <input 
                  type="checkbox" 
                  value="pet friendly" 
                  checked={amenities.includes('pet friendly')}
                  onChange={handleAmenityChange}
                />
                Pet Friendly
              </label>
              <label className="amenity-item">
                <input 
                  type="checkbox" 
                  value="ac" 
                  checked={amenities.includes('ac')}
                  onChange={handleAmenityChange}
                />
                AC
              </label>
              <label className="amenity-item">
                <input 
                  type="checkbox" 
                  value="laundry" 
                  checked={amenities.includes('laundry')}
                  onChange={handleAmenityChange}
                />
                Laundry
              </label>
              <label className="amenity-item">
                <input 
                  type="checkbox" 
                  value="kitchen" 
                  checked={amenities.includes('kitchen')}
                  onChange={handleAmenityChange}
                />
                Kitchen
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
            >
              {property ? 'Update Property' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;

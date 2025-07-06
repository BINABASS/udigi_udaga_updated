import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faClock, faUserShield, faHome } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faLinkedinIn, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend server
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>
        
        {/* Contact Form Section */}
        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information Section */}
        <div className="contact-info-section">
          <div className="info-card">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
            <div className="info-content">
              <h3>Our Office</h3>
              <p>123 Property Street</p>
              <p>Downtown Area, Stone Town</p>
              <p>Zanzibar, Tanzania</p>
            </div>
          </div>
          <div className="info-card">
            <FontAwesomeIcon icon={faPhone} className="info-icon" />
            <div className="info-content">
              <h3>Phone</h3>
              <p>+255 777 123 456</p>
              <p>+255 777 654 321</p>
            </div>
          </div>
          <div className="info-card">
            <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
            <div className="info-content">
              <h3>Email</h3>
              <p>info@udigiproperties.com</p>
              <p>support@udigiproperties.com</p>
            </div>
          </div>
          <div className="info-card">
            <FontAwesomeIcon icon={faClock} className="info-icon" />
            <div className="info-content">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="social-media-section">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="https://facebook.com/udigiproperties" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
            </a>
            <a href="https://twitter.com/udigiproperties" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="social-icon" />
            </a>
            <a href="https://instagram.com/udigiproperties" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </a>
            <a href="https://linkedin.com/company/udigiproperties" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} className="social-icon" />
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h2>Find Us</h2>
          <div className="map-container">
            {/* Add your Google Maps or other map integration here */}
            <iframe
              title="Udigi Properties Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.770088421325!2d39.19485441429062!3d-6.165224097950322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1865984f53015615%3A0x74a3e20b9f95f329!2sStone%20Town!5e0!3m2!1sen!2stz!4v1688638781000!5m2!1sen!2stz"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="quick-links-section">
          <Link to="/login" className="admin-login-btn">
            <FontAwesomeIcon icon={faUserShield} /> Admin Login
          </Link>
          <Link to="/" className="back-btn">
            <FontAwesomeIcon icon={faHome} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;

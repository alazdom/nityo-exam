// src/components/AddAccountForm.jsx
import React, { useState } from 'react';
import './AddAccountForm.css';
import axios from 'axios';

const AddAccountForm = ({ setShowForm }) => {
  const [formData, setFormData] = useState({
    country: '',
    accountType: '',
    username: '',
    lastName: '',
    firstName: '',
    email: '',
    contactNumber: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/users', formData);
      console.log('User created:', response.data);
      window.location.reload()
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleBackClick = () => {
    setShowForm(false); // Show the table again
  };

  return (
    <div className="add-account-form">
      <h2>Account: Add Record</h2>
      <button className="back-btn" onClick={handleBackClick}>
        Back
      </button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">---</option>
            <option value="Philippines">Philippines</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="accountType">Account Type *</label>
          <select
            name="accountType"
            id="accountType"
            value={formData.accountType}
            onChange={handleChange}
            required
          >
            <option value="">---</option>
            <option value="Admin">Admin</option>
            <option value="Team Member">Team Member</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo (optional)</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleChange}
          />
          <span>{formData.photo ? formData.photo.name : 'No Photo Uploaded'}</span>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAccountForm;

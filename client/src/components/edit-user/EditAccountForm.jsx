import React, { useState } from 'react';
import './EditAccountForm.css';
import axios from 'axios';

const EditAccountForm = ({ employeeData, setShowForm, updateEmployee }) => {
  const [formData, setFormData] = useState(employeeData);

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
      // Send the updated employee data to the backend
      await axios.put(`http://localhost:5000/api/users/${formData.id}`, formData);
      console.log('Updated Employee:', formData);
      updateEmployee(formData); // Update in state
      setShowForm(false); // Close the form
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleBackClick = () => {
    setShowForm(false); // Close the form
  };

  return (
    <div className="edit-account-form">
      <h2>Edit Employee Record</h2>
      <button className="back-btn" onClick={handleBackClick}>
        Back
      </button>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditAccountForm;

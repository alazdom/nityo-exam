import React, { useState } from "react";
import "./EditAccountForm.css";
import axios from "axios";

const EditAccountForm = ({ employeeData, setShowForm, updateEmployee }) => {
  const [formData, setFormData] = useState(employeeData);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated employee data to the backend
      await axios.put(
        `http://localhost:5000/api/users/${formData.id}`,
        formData
      );
      console.log("Updated Employee:", formData);
      updateEmployee(formData); // Update in state
      setShowForm(false); // Close the form
    } catch (error) {
      console.error("Error updating employee:", error);
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
          <label htmlFor="country">
            Country <span>*</span>
          </label>
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
        <label htmlFor="accountType">Account Type <span>*</span></label>
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
          <label htmlFor="username">
            Username <span>*</span>
          </label>
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
          <label htmlFor="lastName">
            Last Name <span>*</span>
          </label>
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
          <label htmlFor="firstName">
            First Name <span>*</span>
          </label>
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
          <label htmlFor="email">Email Address <span>*</span></label>
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
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditAccountForm;

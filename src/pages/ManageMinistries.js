import React, { useState } from 'react';
import '../styles/ManageMinistries.css';
import AdminSidebar from '../components/AdminSidebar';

function ManageMinistries() {
  const [formData, setFormData] = useState({
    ministryName: '',
    description: '',
    ministerName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2000/ministries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Ministry added:', result);
      } else {
        console.error('Failed to add ministry');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setFormData({
      ministryName: '',
      description: '',
      ministerName: '',
    });
  };

  return (
    <div className="manage-ministries-page">
      <AdminSidebar />
      <div className="manage-ministries-container">
        <button
          className="back-dashboard-button"
          onClick={() => window.location.href = '/admin'}
        >
          ⬅ Back to Dashboard
        </button>
        <h2 className="manage-ministries-title">Manage Ministries</h2>
        <div className="add-ministry-box">
          <h3 className="add-ministry-heading">Add ministry:</h3>
          <form onSubmit={handleSubmit} className="ministry-form">
            <label>
              Ministry Name:
              <input
                type="text"
                name="ministryName"
                value={formData.ministryName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Minister Name:
              <input
                type="text"
                name="ministerName"
                value={formData.ministerName}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" className="submit-button">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageMinistries;
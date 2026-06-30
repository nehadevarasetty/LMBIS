import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import '../styles/ManageMinistries.css'; // Reuse existing ministry styles

function AddOffice() {
  const [formData, setFormData] = useState({
    officeName: '',
    location: '',
    selectedMinistry: '',
  });

  const [ministries, setMinistries] = useState([]);

  // Fetch ministries from backend
  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const response = await fetch('http://localhost:2000/ministries');
        const data = await response.json();
        setMinistries(data);
      } catch (error) {
        console.error('Error fetching ministries:', error);
      }
    };

    fetchMinistries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('New Office Details:', formData);
    try {
      const response = await fetch('http://localhost:2000/offices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Office added:', result);
        setFormData({ officeName: '', location: '', selectedMinistry: '' });
      } else {
        console.error('Failed to add office');
      }
    } catch (error) {
      console.error('Error submitting office:', error);
    }
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
        <h2 className="manage-ministries-title">Manage Offices</h2>
        <div className="add-ministry-box">
          <h3 className="add-ministry-heading">Add office:</h3>
          <form onSubmit={handleSubmit} className="ministry-form">
            <label>
              Office Name:
              <input
                type="text"
                name="officeName"
                value={formData.officeName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Select Ministry:
              <select
                name="selectedMinistry"
                value={formData.selectedMinistry}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a Ministry</option>
                {ministries.map((ministry) => (
                  <option key={ministry._id} value={ministry.ministryName}>
                    {ministry.ministryName}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="submit-button">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddOffice;

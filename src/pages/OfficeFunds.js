import React, { useState } from 'react';
import OfficeSidebar from '../components/OfficeSidebar';
import '../styles/OfficeFunds.css';

const OfficeFunds = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    amount: '',
    fiscalYear: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2000/funds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
          officeName: 'Budget Health Office',
          ministryName: 'Ministry of Health',
        }),
      });

      if (response.ok) {
        alert('Fund request submitted successfully!');
        setFormData({
          title: '',
          description: '',
          project: '',
          amount: '',
          fiscalYear: '',
        });
      } else {
        alert('Failed to submit fund request.');
      }
    } catch (error) {
      console.error('Error submitting fund request:', error);
      alert('An error occurred while submitting the fund request.');
    }
  };

  return (
    <div className="office-dashboard">
      <OfficeSidebar />
      <main className="office-main">
        <header className="office-header">
          <h2>Request Funds</h2>
          <button className="back-button" onClick={() => window.location.href = '/office'}>
            &larr; Back to Dashboard
          </button>
        </header>
        <div className="request-funds-form">
          <h2>Request Funds:</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title of expenditure:
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </label>
            <label>
              Description:
              <input type="text" name="description" value={formData.description} onChange={handleChange} required />
            </label>
            <label>
              Project:
              <input type="text" name="project" value={formData.project} onChange={handleChange} required />
            </label>
            <label>
              Amount Requested:
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
            </label>
            <label>
              Fiscal Year:
              <select name="fiscalYear" value={formData.fiscalYear} onChange={handleChange} required>
                <option value="">Select Year</option>
                <option value="2023-24">2023-2024</option>
                <option value="2024-25">2024-2025</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default OfficeFunds;
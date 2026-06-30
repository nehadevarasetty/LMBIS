import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import BudgetCard from '../components/BudgetCard';
import '../styles/BudgetManagement.css';


const BudgetManagement = () => {
  const [ministries, setMinistries] = useState([]);

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const response = await fetch('http://localhost:2000/ministries');
        const data = await response.json();
        setMinistries(data);
      } catch (error) {
        console.error('Failed to fetch ministries:', error);
      }
    };
    fetchMinistries();
  }, []);

  const handleApprove = async (ministryName, amount, fiscalYear) => {
    try {
      const response = await fetch('http://localhost:2000/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ministryName, fiscalYear, allocated: amount }),
      });
      if (response.ok) {
        await response.json();
        alert(`Budget for ${ministryName} submitted successfully`);
      } else {
        alert('Failed to submit budget');
      }
    } catch (error) {
      console.error('Error submitting budget:', error);
    }
  };

  return (
    <div className="budget-management-page">
      <AdminSidebar />
      <div className="budget-management-content">
        <button className="back-dashboard-button" onClick={() => window.location.href = '/admin'}>
          ⬅ Back to Dashboard
        </button>
        <h2 className="budget-management-title">Budget Management</h2>
        <div className="budget-grid">
          {ministries.map((ministry, index) => (
            <BudgetCard
              key={index}
              ministryName={ministry.ministryName ? ministry.ministryName : ministry}
              onApprove={handleApprove}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetManagement;

import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import MinistryCard from '../components/MinistryCard';
import '../styles/OfficeManagement.css';
import { useNavigate } from 'react-router-dom';

const OfficeManagement = () => {
  const navigate = useNavigate();
  const [ministries, setMinistries] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [ministryRes, budgetRes] = await Promise.all([
        fetch('http://localhost:2000/ministries'),
        fetch('http://localhost:2000/budgets')
      ]);

      const ministryData = await ministryRes.json();
      const budgetData = await budgetRes.json();

      // Merge each ministry with its matching budget
      const merged = ministryData.map(min => {
        const match = budgetData.find(b => b.ministryName === min.ministryName);
        return {
          ...min,
          budget: match ? match.allocated : 'Not Set'
        };
      });

      setMinistries(merged);
    } catch (error) {
      console.error('Error fetching ministries or budgets:', error);
    }
  };

  fetchData();
}, []);


  const handleViewOffices = (ministry) => {
    navigate('/offices/list', { state: { ministryName: ministry.ministryName } });
  };

  return (
    <div className="office-management-page">
      <AdminSidebar />
      <div className="office-management-content">
        <button
          className="back-dashboard-button"
          onClick={() => window.location.href = '/admin'}
        >
          ⬅ Back to Dashboard
        </button>
        <h2 className="office-management-title">Office Management</h2>
        <div className="ministry-cards-scroll-container">
          {ministries.map((ministry, index) => (
            <MinistryCard
              key={index}
              ministry={{
                name: ministry.ministryName,
                description: ministry.description,
                budget: ministry.budget || 'Not Set'
              }}
              onViewOffices={() => handleViewOffices(ministry)}
            />
          ))}
        </div>
        <div className="add-offices-container">
          <button className="add-office-button" onClick={() => window.location.href = '/offices/add'}>+ Add Offices</button>
        </div>
      </div>
    </div>
  );
};

export default OfficeManagement;

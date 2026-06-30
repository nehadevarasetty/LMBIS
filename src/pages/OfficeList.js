import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import OfficeCard from '../components/OfficeCard';
import '../styles/OfficeList.css';

const OfficeList = () => {
  const location = useLocation();
  const ministryName = location.state?.ministryName || 'Selected Ministry';

  const [offices, setOffices] = useState([]);

  useEffect(() => {
    if (ministryName) {
      fetch(`http://localhost:2000/offices/${ministryName}`)
        .then((res) => res.json())
        .then((data) => setOffices(data))
        .catch((err) => console.error('Error fetching offices:', err));
    }
  }, [ministryName]);

  return (
    <div className="office-list-page">
      <AdminSidebar />
      <div className="office-list-content">
        <button
          className="back-dashboard-button"
          onClick={() => window.history.back()}
        >
          ⬅ Back to Ministries
        </button>
        <h2 className="office-list-title">Offices under {ministryName}</h2>
        <div className="office-cards-scroll-container">
          {offices.map((office, index) => (
            <OfficeCard key={index} office={office} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficeList;
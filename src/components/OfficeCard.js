import React from 'react';
import '../styles/OfficeCard.css';

const OfficeCard = ({ office }) => {
  return (
    <div className="office-card">
      <h3 className="office-title">{office.officeName}</h3>
      <p><strong>Location:</strong> {office.location}</p>
      <p><strong>No. of Employees:</strong> {office.employees}</p>
    </div>
  );
};

export default OfficeCard;



import React from 'react';
import '../styles/OfficeDetailCard.css';

const OfficeDetailCard = ({ ministryName, officeName, location, employeeCount, projectCount }) => {
  return (
    <div className="office-detail-card">
      <h3>View Details:</h3>
      <div className="details-box">
        <p><strong>Ministry Name:</strong> {ministryName}</p>
        <p><strong>Office Name:</strong> {officeName}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Total no of Employees:</strong> {employeeCount}</p>
        <p><strong>Total no of Projects:</strong> {projectCount}</p>
      </div>
    </div>
  );
};

export default OfficeDetailCard;
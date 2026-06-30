import React from 'react';
import '../styles/EmployeeCard.css';

const EmployeeCard = ({ id, name, designation, employeeId, level, onEdit }) => {
  return (
    <div className="employee-card">
      <div className="employee-card-content">
        <h4>{name || 'Unnamed Employee'}</h4>
        <p><strong>Designation:</strong> {designation || 'Not specified'}</p>
        <p><strong>Employee ID:</strong> {employeeId || 'N/A'}</p>
        <p><strong>Level:</strong> {level || 'N/A'}</p>
      </div>
      <button
        className="edit-button"
        onClick={onEdit}
      >
        Edit Employee Details
      </button>
    </div>
  );
};

export default EmployeeCard;

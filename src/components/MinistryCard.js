import React from 'react';
import '../styles/MinistryCard.css';

const MinistryCard = ({ ministry, onViewOffices }) => {
  const { name, description, budget } = ministry;

  return (
    <div className="ministry-card">
      <div className="ministry-details">
        <h3 className="ministry-name">{name}</h3>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Budget Allocated:</strong> ₹{budget.toLocaleString()}</p>
      </div>
      <div className="ministry-buttons">
        <button className="view-offices-button" onClick={() => onViewOffices(ministry)}>View Offices</button>
      </div>
    </div>
  );
};

export default MinistryCard;
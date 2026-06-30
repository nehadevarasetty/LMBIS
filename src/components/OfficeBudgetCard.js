import React from 'react';
import '../styles/OfficeBudgetCard.css';

const OfficeBudgetCard = ({ title, budget }) => {
  return (
    <div className="office-budget-card">
      <h3>{title}</h3>
      <div className="budget-amount">
        Budget: {budget ? `₹${budget.toLocaleString()}` : 'N/A'}
      </div>
      <button className="track-button" onClick={() => window.location.href = '/office/expenditure'}>
        Track Spending
      </button>
    </div>
  );
};

export default OfficeBudgetCard;
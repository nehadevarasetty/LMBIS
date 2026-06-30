import React, { useState } from 'react';
import '../styles/BudgetCard.css';

const BudgetCard = ({ ministryName, onApprove }) => {
  const [budget, setBudget] = useState('');
  const [fiscalYear, setFiscalYear] = useState('');

  const handleApprove = () => {
    onApprove(ministryName, budget, fiscalYear);
    setBudget('');
    setFiscalYear('');
  };

  return (
    <div className="budget-card">
      <h3 className="ministry-title">{ministryName}</h3>

      <label className="budget-label">Enter Fiscal Year:</label>
      <input
        type="text"
        className="fiscal-year-input"
        value={fiscalYear}
        onChange={(e) => setFiscalYear(e.target.value)}
        placeholder="e.g., 2024-25"
      />

      <label className="budget-label">Set Budget:</label>
      <input
        type="number"
        className="budget-input"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Enter amount"
      />

      <button className="approve-button" onClick={handleApprove}>
        Approve
      </button>
    </div>
  );
};

export default BudgetCard;

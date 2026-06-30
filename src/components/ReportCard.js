

import React from 'react';
import '../styles/ReportCard.css';

const ReportCard = ({ title, icon, onClick }) => {
  return (
    <div className="report-card">
      <div className="report-icon">{icon}</div>
      <h3 className="report-title">{title}</h3>
      <button className="report-button" onClick={onClick}>
        Generate report
      </button>
    </div>
  );
};

export default ReportCard;
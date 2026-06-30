

import React from 'react';
import '../styles/ProjectCard.css';

const ProjectCard = ({ name, description, budgetAllocated, remainingFunds, onEdit }) => {
  return (
    <div className="project-card">
      <div className="project-card-content">
        <h4>{name}</h4>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Budget Allocated:</strong> {budgetAllocated}</p>
      </div>
      <div className="project-card-actions">
        <button className="remaining-funds-button">
          Remaining Funds: {remainingFunds}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
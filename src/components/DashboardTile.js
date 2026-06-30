

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardTile.css';

const DashboardTile = ({ title, image, buttonText, link }) => {
  const navigate = useNavigate();
  return (
    <div
      className="dashboard-tile"
      onClick={() => link && navigate(link)}
      style={{ cursor: link ? 'pointer' : 'default' }}
    >
      <img src={image} alt={title} className="tile-icon" />
      <h3 className="tile-title">{title}</h3>
      {buttonText && <button className="tile-button">{buttonText}</button>}
    </div>
  );
};

export default DashboardTile;
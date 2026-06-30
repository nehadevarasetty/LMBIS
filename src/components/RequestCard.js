import React from 'react';
import '../styles/RequestCard.css';

const RequestCard = ({ data, onApprove, onReject }) => {
  const { title, officeName, amount, description, project, fiscalYear, ministryName } = data;

  return (
    <div className="request-card">
      <h3 className="request-title">{title}</h3>
      <div className="request-detail"><strong>Ministry:</strong> {ministryName}</div>
      <div className="request-detail"><strong>Office:</strong> {officeName}</div>
      <div className="request-detail"><strong>Project:</strong> {project}</div>
      <div className="request-detail"><strong>Amount:</strong> {amount}</div>
      <div className="request-detail"><strong>Description:</strong> {description}</div>
      <div className="request-detail"><strong>Fiscal Year:</strong> {fiscalYear}</div>
      <div className="request-actions">
        <button className="approve-button" onClick={onApprove}>Approve</button>
        <button className="reject-button" onClick={onReject}>Reject</button>
      </div>
    </div>
  );
};

export default RequestCard;

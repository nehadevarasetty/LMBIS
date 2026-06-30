import React from 'react';
import '../styles/TransferCard.css';

const TransferCard = ({ transfer }) => {
  const { title, description, project, officeName, ministryName, amount, fiscalYear, timestamp } = transfer;
  const formattedDate =
    timestamp?.seconds || timestamp?._seconds
      ? new Date((timestamp.seconds || timestamp._seconds) * 1000).toLocaleString()
      : '-';

  return (
    <div className="transfer-card">
      <h3 className="transfer-heading">{title}</h3>
      <div className="transfer-detail"><strong>Ministry:</strong> {ministryName}</div>
      <div className="transfer-detail"><strong>Office:</strong> {officeName}</div>
      <div className="transfer-detail"><strong>Project:</strong> {project}</div>
      <div className="transfer-detail"><strong>Amount:</strong> ₹{amount.toLocaleString()}</div>
      <div className="transfer-detail"><strong>Description:</strong> {description}</div>
      <div className="transfer-detail"><strong>Fiscal Year:</strong> {fiscalYear}</div>
      <div className="transfer-detail"><strong>Transfer Date:</strong> {formattedDate}</div>
    </div>
  );
};

export default TransferCard;
import React, { useEffect, useState } from 'react';
import OfficeSidebar from '../components/OfficeSidebar';
import TransferCard from '../components/TransferCard';
import '../styles/OfficeTransfers.css';

const OfficeTransfers = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await fetch('http://localhost:2000/funds');
        const data = await response.json();
        const approvedTransfers = data.filter(
          item => item.status === 'approved' && item.officeName === 'Budget Health Office'
        );
        setTransfers(approvedTransfers);
      } catch (error) {
        console.error('Error fetching fund transfers:', error);
      }
    };

    fetchTransfers();
  }, []);

  return (
    <div className="office-dashboard">
      <OfficeSidebar />
      <main className="office-main">
        <header className="office-header">
          <h2>Fund Transfers</h2>
          <button className="back-button" onClick={() => window.location.href = '/office'}>
            &larr; Back to Dashboard
          </button>
        </header>
        <div className="transfers-container">
          {transfers.map((transfer, index) => (
            <TransferCard key={index} transfer={transfer} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default OfficeTransfers;
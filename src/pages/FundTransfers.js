import React from 'react';
import '../styles/FundTransfers.css';
import AdminSidebar from '../components/AdminSidebar';
import TransferCard from '../components/TransferCard';

const FundTransfers = () => {
  const [transfers, setTransfers] = React.useState([]);

  React.useEffect(() => {
    const fetchApprovedTransfers = async () => {
      try {
        const response = await fetch('http://localhost:2000/funds');
        const data = await response.json();
        const approved = data.filter(item => item.status === 'approved');
        setTransfers(approved);
      } catch (error) {
        console.error('Error fetching fund transfers:', error);
      }
    };

    fetchApprovedTransfers();
  }, []);

  const totalTransfers = transfers.length;
  const totalAmount = transfers.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="fund-transfers-page">
      <AdminSidebar />
      <div className="fund-transfers-content">
        <button className="back-dashboard-button" onClick={() => window.location.href = '/admin'}>
          ⬅ Back to Dashboard
        </button>
        <h2 className="fund-transfers-title">Fund Transfers</h2>
        <div className="transfer-list">
          {transfers.map((transfer) => (
            <TransferCard key={transfer.id} transfer={transfer} />
          ))}
        </div>
        <div className="fund-transfers-summary">
          <div className="summary-box">Total no. of Transfers: {totalTransfers}</div>
          <div className="summary-box">Total amount transferred: ₹{totalAmount.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default FundTransfers;

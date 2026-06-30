import AdminSidebar from '../components/AdminSidebar';
import React, { useState, useEffect } from 'react';
import '../styles/PendingRequests.css';
import RequestCard from '../components/RequestCard';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:2000/funds');
        const data = await response.json();
        const pendingOnly = data.filter(req => req.status === 'pending');
        setRequests(pendingOnly);
      } catch (error) {
        console.error('Error fetching fund requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await fetch(`http://localhost:2000/funds/${id}/approve`, {
        method: 'PUT'
      });
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`http://localhost:2000/funds/${id}/reject`, {
        method: 'PUT'
      });
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleApproveAll = async () => {
    try {
      await Promise.all(
        requests.map(req =>
          fetch(`http://localhost:2000/funds/${req.id}/approve`, {
            method: 'PUT'
          })
        )
      );
      setRequests([]);
    } catch (error) {
      console.error('Error approving all requests:', error);
    }
  };

  return (
    <div className="pending-requests-page">
      <AdminSidebar />
      <div className="pending-requests-container" style={{ marginLeft: '250px' }}>
        <div className="top-bar">
          <button
            className="back-dashboard-button"
            onClick={() => window.location.href = '/admin'}
          >
            ⬅ Back to Dashboard
          </button>
          <h2 className="pending-requests-title">Pending Requests</h2>
        </div>
        <div className="requests-scroll-wrapper">
          {requests.map((req) => (
            <RequestCard
              key={req.id}
              data={req}
              onApprove={() => handleApprove(req.id)}
              onReject={() => handleReject(req.id)}
            />
          ))}
        </div>
        <button className="approve-all-button" onClick={handleApproveAll}>
          Approve All
        </button>
      </div>
    </div>
  );
};

export default PendingRequests;
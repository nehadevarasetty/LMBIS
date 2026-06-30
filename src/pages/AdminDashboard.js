import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import DashboardTile from '../components/DashboardTile';
import '../styles/AdminDashboard.css';
import fundTransfersIcon from '../assets/fund-transfers.png';
import budgetIcon from '../assets/budget.png';
import ministriesIcon from '../assets/ministries.png';
import officesIcon from '../assets/offices.png';
import pendingIcon from '../assets/pending.png';
import reportsIcon from '../assets/reports.png';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-main">
        <header className="admin-header">
          <h2>Welcome, Admin</h2>
        </header>
        <section className="admin-tiles">
          <DashboardTile title="Fund Transfers" image={fundTransfersIcon} buttonText="View Transfers" link="/fund-transfers" />
          <DashboardTile title="Budget Management" image={budgetIcon} buttonText="Manage Budget" link="/budget" />
          <DashboardTile title="Manage Ministries" image={ministriesIcon} buttonText="Edit Ministries" link="/manage-ministries" />
          <DashboardTile title="Manage Offices" image={officesIcon} buttonText="View Offices" link="/offices" />
          <DashboardTile title="Pending Requests" image={pendingIcon} buttonText="Review Now" link="/pending-requests"/>
          <DashboardTile title="Reports Page" image={reportsIcon} buttonText="Generate Reports" link="/reports" />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
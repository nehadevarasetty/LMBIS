import React from 'react';
import OfficeSidebar from '../components/OfficeSidebar';
import DashboardTile from '../components/DashboardTile';
import '../styles/OfficeDashboard.css';
import RequestIcon from '../assets/pending.png';
import TransferIcon from '../assets/fund-transfers.png';
import BudgetIcon from '../assets/budget.png';
import ReportsIcon from '../assets/reports.png';
import OfficeInfoIcon from '../assets/offices.png';
import ExpenditureIcon from '../assets/ministries.png';

const OfficeDashboard = () => {
  return (
    <div className="office-dashboard">
      <OfficeSidebar />
      <main className="office-main">
        <header className="office-header">
          <h2>Welcome, Office</h2>
        </header>
        <section className="office-tiles">
          <DashboardTile title="Request Funds" image={RequestIcon} buttonText="Request" link="/office/funds" />
          <DashboardTile title="Fund Transfers" image={TransferIcon} buttonText="Transfer" link="/office/transfers" />
          <DashboardTile title="Budget Overview" image={BudgetIcon} buttonText="View Budget" link="/office/budget" />
          <DashboardTile title="Reports" image={ReportsIcon} buttonText="Open Reports" link="/office/reports" />
          <DashboardTile title="Office Info" image={OfficeInfoIcon} buttonText="Details" link="/office/info" />
          <DashboardTile title="Expenditure" image={ExpenditureIcon} buttonText="Check Expenditure" link="/office/expenditure" />
        </section>
      </main>
    </div>
  );
};

export default OfficeDashboard;
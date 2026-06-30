import React, { useState } from 'react';
import OfficeSidebar from '../components/OfficeSidebar';
import ReportCard from '../components/ReportCard';
import '../styles/OfficeReports.css';

import { generatePDF } from './pdfGenerator';

const OfficeReports = () => {
  const [filters, setFilters] = useState({
    fiscalYear: '',
    dateRange: '',
  });

  const getDateRange = (key) => {
    const today = new Date();
    if (key === 'Last 7 days') {
      const start = new Date(today);
      start.setDate(today.getDate() - 7);
      return { start: start.toISOString(), end: today.toISOString() };
    } else if (key === 'Last 30 days') {
      const start = new Date(today);
      start.setDate(today.getDate() - 30);
      return { start: start.toISOString(), end: today.toISOString() };
    } else if (key === 'This Year') {
      const start = new Date(today.getFullYear(), 0, 1);
      return { start: start.toISOString(), end: today.toISOString() };
    }
    return null;
  };

  const handleGenerateReport = async (type) => {
    try {
      const body = {
        reportType: type,
        fiscalYear: filters.fiscalYear,
        officeName: 'Budget Health Office',
        dateRange: getDateRange(filters.dateRange),
      };

      console.log("Sending report request body:", body);

      const response = await fetch('http://localhost:2000/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!Array.isArray(data)) {
        console.error('Invalid data received:', data);
        throw new Error('Report data is not in expected format.');
      }

      generatePDF(type, data, filters);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div className="reports-page">
      <OfficeSidebar />
      <div className="reports-content">
        <button
          className="back-dashboard-button"
          onClick={() => window.location.href = '/office'}
        >
          ⬅ Back to Dashboard
        </button>
        <h2 className="reports-title">Reports</h2>
        <div className="report-cards-container">
          <ReportCard
            title="Expenditures"
            icon="📊"
            onClick={() => handleGenerateReport('Expenditures')}
          />
          <ReportCard
            title="Office Activity"
            icon="💰"
            onClick={() => handleGenerateReport('Office Activity')}
          />
          <ReportCard
            title="Office Budget"
            icon="📋"
            onClick={() => handleGenerateReport('Office Budget')}
          />
        </div>

        <div className="filters-section">
          <select
            value={filters.fiscalYear}
            onChange={(e) => setFilters({ ...filters, fiscalYear: e.target.value })}
          >
            <option value="">Fiscal Year</option>
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
          </select>

          <select
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
          >
            <option value="">Date Range</option>
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="This Year">This Year</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OfficeReports;
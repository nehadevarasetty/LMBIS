import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import ReportCard from '../components/ReportCard';
import '../styles/ReportsPage.css';
import { generatePDF } from './pdfGenerator';

const ReportsPage = () => {
  const [ministries, setMinistries] = useState([]);
  const [offices, setOffices] = useState([]);
  const [filters, setFilters] = useState({
    fiscalYear: '',
    office: '',
    ministry: '',
    dateRange: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMinistries = await fetch('http://localhost:2000/ministries');
        const ministriesData = await resMinistries.json();
        setMinistries(ministriesData);

        const resOffices = await fetch('http://localhost:2000/offices');
        const officesData = await resOffices.json();
        setOffices(officesData);
      } catch (error) {
        console.error('Error fetching filter data:', error);
      }
    };
    fetchData();
  }, []);

  const handleGenerateReport = async (type) => {
    try {
      const body = {
        reportType: type,
        fiscalYear: filters.fiscalYear,
        office: filters.office,
        ministry: filters.ministry,
        dateRange: getDateRange(filters.dateRange),
      };

      const response = await fetch('http://localhost:2000/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      generatePDF(type, data, filters);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

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

  return (
    <div className="reports-page">
      <AdminSidebar />
      <div className="reports-content">
        <button
          className="back-dashboard-button"
          onClick={() => window.location.href = '/admin'}
        >
          ⬅ Back to Dashboard
        </button>
        <h2 className="reports-title">Reports</h2>
        <div className="report-cards-container">
          <ReportCard title="Fund Transfer" icon="📊" onClick={() => handleGenerateReport('Fund Transfer')} />
          <ReportCard title="Office Activity" icon="💰" onClick={() => handleGenerateReport('Office Activity')} />
          <ReportCard title="Ministry Information" icon="📋" onClick={() => handleGenerateReport('Ministry Budget')} />
        </div>

        <div className="filters-section">
          <select value={filters.fiscalYear} onChange={(e) => setFilters({ ...filters, fiscalYear: e.target.value })}>
            <option value="">Fiscal Year</option>
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
            <option value="2022-23">2022-23</option>
          </select>

          <select value={filters.office} onChange={(e) => setFilters({ ...filters, office: e.target.value })}>
            <option value="">Office</option>
            {offices.map((office) => (
              <option key={office.id || office.name} value={office.name}>{office.name}</option>
            ))}
          </select>

          <select value={filters.ministry} onChange={(e) => setFilters({ ...filters, ministry: e.target.value })}>
            <option value="">Ministry</option>
            {ministries.map((ministry) => (
              <option key={ministry.id || ministry.ministryName} value={ministry.ministryName}>{ministry.ministryName}</option>
            ))}
          </select>

          <select value={filters.dateRange} onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}>
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

export default ReportsPage;
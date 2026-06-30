import React, { useEffect, useState } from 'react';
import OfficeSidebar from '../components/OfficeSidebar';
import OfficeBudgetCard from '../components/OfficeBudgetCard';
import '../styles/OfficeBudget.css';

const OfficeBudget = () => {
  const [projects, setProjects] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchApprovedFunds = async () => {
      try {
        const response = await fetch('http://localhost:2000/funds');
        const data = await response.json();

        const approved = data.filter(
          item => item.status === 'approved' && item.officeName === 'Budget Health Office'
        );

        const grouped = approved.reduce((acc, curr) => {
          const key = curr.project;
          if (!acc[key]) {
            acc[key] = 0;
          }
          acc[key] += Number(curr.amount);
          return acc;
        }, {});

        const result = Object.entries(grouped).map(([title, budget]) => ({
          title,
          budget
        }));

        setProjects(result);
      } catch (error) {
        console.error('Error fetching project budgets:', error);
      }
    };

    fetchApprovedFunds();
  }, []);

  return (
    <div className="office-dashboard">
      <OfficeSidebar />
      <main className="office-main">
        <header className="office-header">
          <h2>Budget Overview</h2>
          <button className="back-button" onClick={() => window.location.href = '/office'}>
            &larr; Back to Dashboard
          </button>
        </header>
        <div className="office-budget-tiles">
          {projects.map((budget, index) => (
            <OfficeBudgetCard key={index} title={budget.title} budget={budget.budget} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default OfficeBudget;
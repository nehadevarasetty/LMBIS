

import React, { useEffect, useState } from 'react';
import OfficeSidebar from '../components/OfficeSidebar';
import ProjectCard from '../components/ProjectCard';
import '../styles/ExpenditureTracker.css';

const ExpenditureTracker = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:2000/projects/Budget%20Health%20Office');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleEditProject = (projectName) => {
    console.log(`Editing project: ${projectName}`);
  };

  return (
    <div className="office-dashboard">
      <OfficeSidebar />
      <main className="office-main">
        <header className="office-header">
          <h2>Expenditure Tracker</h2>
          <button className="back-button" onClick={() => window.location.href = '/office'}>
            &larr; Back to Dashboard
          </button>
        </header>
        <div className="project-cards-container">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              name={project.projectName}
              description={project.description}
              budgetAllocated={`₹${project.budgetAllocated?.toLocaleString?.() ?? project.budgetAllocated}`}
              remainingFunds={`₹${project.budgetRemaining?.toLocaleString?.() ?? project.budgetRemaining}`}
              onEdit={() => handleEditProject(project.projectName)}
            />
          ))}
        </div>
        <div className="add-project-section">
          <button className="add-project-button" onClick={() => window.location.href = '/office/expenditure/add'}>
            + Add Projects
          </button>
        </div>
      </main>
    </div>
  );
};

export default ExpenditureTracker;
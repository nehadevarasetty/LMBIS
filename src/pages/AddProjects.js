import React, { useState } from 'react';
import OfficeSidebar from '../components/OfficeSidebar';
import '../styles/AddProjects.css';

const AddProjects = () => {
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    budget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    const parsedBudget = parseFloat(projectData.budget);
    if (!projectData.name || !projectData.description || isNaN(parsedBudget)) {
      alert('Please fill in all fields correctly including a valid budget amount.');
      return;
    }

    try {
      const response = await fetch('http://localhost:2000/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: projectData.name,
          description: projectData.description,
          budgetAllocated: parsedBudget,
          officeName: 'Budget Health Office',
          ministryName: 'Ministry of Health',
          fiscalYear: '2024-25'
        })
      });

      if (response.ok) {
        // Trigger fund reduction
        await fetch('http://localhost:2000/fundreduction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            officeName: 'Budget Health Office',
            ministryName: 'Ministry of Health',
            fiscalYear: '2024-25',
            amount: parsedBudget
          })
        });

        alert('Project added successfully!');
        window.location.href = '/office/expenditure';
      } else {
        const errorText = await response.text();
        alert(`Failed to add project. Server says: ${errorText}`);
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('An unexpected error occurred while adding the project.');
    }
  };

  return (
    <div className="office-dashboard">
      <OfficeSidebar />
      <main className="office-main">
        <header className="office-header">
          <button
            className="back-button"
            onClick={() => window.location.href = '/office/expenditure'}
          >
            &larr; Back to Expenditure
          </button>
          <h2>Add Projects:</h2>
        </header>

        <div className="add-project-container">
          <h3>Add project:</h3>
          <div className="add-project-form">
            <label>
              Project Name:
              <input
                type="text"
                name="name"
                value={projectData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={projectData.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Set Budget:
              <input
                type="number"
                name="budget"
                value={projectData.budget}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="add-button-section">
            <button className="add-button" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProjects;

import React, { useState } from 'react';
import OfficeSidebar from '../components/OfficeSidebar';
import '../styles/EditEmployee.css';

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    designation: '',
    level: '',
    contact: '',
    dob: '',
    employeeId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleAdd = async () => {
    try {
      console.log('Sending employee data:', employeeData);
      const response = await fetch('http://localhost:2000/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: employeeData.name,
          designation: employeeData.designation,
          employeeId: employeeData.employeeId,
          level: employeeData.level,
          contact: employeeData.contact,
          dob: employeeData.dob,
          officeName: 'Budget Health Office'  // adjust as needed
        })
      });

      if (response.ok) {
        alert('Employee added successfully!');
        window.location.href = '/office/employee-info';
      } else {
        alert('Failed to add employee.');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('An error occurred while adding the employee.');
    }
  };

  return (
    <div className="office-dashboard">
      <OfficeSidebar />
      <main className="office-main">
        <header className="office-header">
          <button className="back-button" onClick={() => window.location.href = '/office/employee-info'}>
            &larr; Back to Employee Info
          </button>
          <h2>Add New Employee</h2>
        </header>
        <div className="edit-employee-container">
          <h3>Enter Employee details:</h3>
          <div className="edit-employee-form">
            <label>Employee Name:
              <input type="text" name="name" value={employeeData.name} onChange={handleChange} />
            </label>
            <label>Designation:
              <input type="text" name="designation" value={employeeData.designation} onChange={handleChange} />
            </label>
            <label>Employee ID:
              <input type="text" name="employeeId" value={employeeData.employeeId} onChange={handleChange} />
            </label>
            <label>Level:
              <input type="text" name="level" value={employeeData.level} onChange={handleChange} />
            </label>
            <label>Contact Details:
              <input type="text" name="contact" value={employeeData.contact} onChange={handleChange} />
            </label>
            <label>Date of Birth:
              <input type="date" name="dob" value={employeeData.dob} onChange={handleChange} />
            </label>
          </div>
          <div className="save-button-section">
            <button className="save-button" onClick={handleAdd}>
              Add Employee
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddEmployee;

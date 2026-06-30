import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OfficeSidebar from '../components/OfficeSidebar';
import '../styles/EditEmployee.css';

const EditEmployee = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({
    name: '',
    designation: '',
    level: '',
    contact: '',
    dob: '',
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:2000/employees/${id}`);
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:2000/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        alert('Employee updated successfully!');
        window.location.href = '/office/employee-info';
      } else {
        alert('Failed to update employee.');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('An error occurred while updating the employee.');
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
          <h2>Edit Employee Information</h2>
        </header>
        <div className="edit-employee-container">
          <h3>Edit Employee details:</h3>
          <div className="edit-employee-form">
            <label>Employee Name:
              <input type="text" name="name" value={employeeData.name} onChange={handleChange} />
            </label>
            <label>Designation:
              <input type="text" name="designation" value={employeeData.designation} onChange={handleChange} />
            </label>
            <label>Level:
              <input type="text" name="level" value={employeeData.level} onChange={handleChange} />
            </label>
            <label>Contact Details:
              <input type="text" name="contact" value={employeeData.contact} onChange={handleChange} />
            </label>
            <label>Date of birth:
              <input type="date" name="dob" value={employeeData.dob} onChange={handleChange} />
            </label>
          </div>
          <div className="save-button-section">
            <button className="save-button" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditEmployee;

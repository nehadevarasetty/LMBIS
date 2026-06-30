import React, { useEffect, useState } from 'react';
import OfficeSidebar from '../components/OfficeSidebar';
import EmployeeCard from '../components/EmployeeCard';
import '../styles/EmployeeInfo.css';

const EmployeeInfo = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:2000/employees/Budget%20Health%20Office');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    window.location.href = `/office/employee-info/edit/${id}`;
  };

  return (
    <div className="office-dashboard">
      <OfficeSidebar />
      <main className="office-main">
        <header className="office-header">
          <h2>Employee Information</h2>
          <button className="back-button" onClick={() => window.location.href = '/office/info'}>
            &larr; Back to Office Info
          </button>
        </header>

        <div className="employee-cards-container">
          {employees.length > 0 ? (
            employees.map((emp) => (
              <EmployeeCard
                key={emp.id}
                id={emp.id}
                name={emp.name || 'Unnamed'}
                designation={emp.designation || 'Not specified'}
                employeeId={emp.employeeId || 'N/A'}
                level={emp.level || 'N/A'}
                onEdit={() => handleEdit(emp.id)}
              />
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>No employees found.</p>
          )}
        </div>

        <div className="add-employee-button-container">
          <button className="add-employee-button" onClick={() => window.location.href = '/office/employee-info/add'}>
            + Add New Employee
          </button>
        </div>
      </main>
    </div>
  );
};

export default EmployeeInfo;
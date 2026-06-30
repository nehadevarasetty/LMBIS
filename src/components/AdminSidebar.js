import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/AdminSidebar.css';
import logo from '../assets/logo.png';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Pending Requests', path: '/pending-requests' },
    { name: 'Fund Transfers', path: '/fund-transfers' },
    { name: 'Budget Management', path: '/budget' },
    { name: 'Office', path: '/offices' },
    { name: 'Reports Page', path: '/reports' },
    { name: 'Manage Ministries', path: '/manage-ministries' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="LMBIS Logo" />
      </div>
      <div className="sidebar-header">QUICK STATS</div>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <button className="logout-button" onClick={() => window.location.href = '/'}>
        LOGOUT
      </button>
    </aside>
  );
};

export default AdminSidebar;
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/OfficeSidebar.css';
import logo from '../assets/logo.png';

const OfficeSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Request Funds', path: '/office/funds' },
    { name: 'Fund Transfers', path: '/office/transfers' },
    { name: 'Budget Overview', path: '/office/budget' },
    { name: 'Reports Page', path: '/office/reports' },
    { name: 'Office Info', path: '/office/info' },
    { name: 'Expenditure', path: '/office/expenditure' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Office Logo" />
      </div>
      <div className="sidebar-header">QUICK LINKS</div>
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

export default OfficeSidebar;
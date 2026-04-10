import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/predict', label: 'Prediction' },
    { path: '/about', label: 'About Project' }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="nav-overlay" onClick={closeNav}></div>}

      {/* Toggle Button */}
      <button 
        className={`nav-toggle ${isOpen ? 'open' : ''}`} 
        onClick={toggleNav}
        aria-label="Toggle Navigation"
      >
        <span className="hamburger"></span>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
      </button>

      {/* Sliding Navigation */}
      <nav className={`side-nav ${isOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <h2>Dashboard</h2>
          <button className="nav-close" onClick={closeNav}>✕</button>
        </div>

        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={closeNav}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
                {location.pathname === item.path && (
                  <span className="nav-indicator"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>

      </nav>
    </>
  );
};

export default Navigation;
// src/components/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AuthButtons from './AuthButtons.jsx';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">Create Exercise</Link></li>
      </ul>
      <div className="auth-buttons">
        <AuthButtons />
      </div>
    </nav>
  );
};

export default Navigation;
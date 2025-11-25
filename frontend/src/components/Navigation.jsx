import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AuthButtons from './AuthButtons.jsx';
import '../App.css';

const Navigation = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="navbar">
      <div className="nav-left">
        {isAuthenticated && (
          <Link to="/create" className="create-button">
            Create Exercise
          </Link>
        )}
      </div>

      <div className="nav-center">
        <Link to="/" className="home-button">
          Home
        </Link>
      </div>

      <div className="nav-right">
        <AuthButtons />
      </div>
    </nav>
  );
};

export default Navigation;
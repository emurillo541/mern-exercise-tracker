import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; 
import AuthButtons from './AuthButtons.jsx';

const Navigation = () => {
  const { isAuthenticated } = useAuth0(); 
  
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        
        {/* Conditional Rendering: Only show if the user is authenticated */}
        {isAuthenticated && (
          <li><Link to="/create">Create Exercise</Link></li>
        )}
      </ul>
      <div className="auth-buttons">
        <AuthButtons />
      </div>
    </nav>
  );
};

export default Navigation;
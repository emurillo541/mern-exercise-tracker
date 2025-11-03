import React, { useLayoutEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  useLayoutEffect(() => {
    if (!isLoading && !isAuthenticated) {
      
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]); 

  if (isAuthenticated) {
    return children;
  }

  return <div>Redirecting to login...</div>; 
};

export default ProtectedRoute;
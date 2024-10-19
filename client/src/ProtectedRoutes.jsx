import { useEffect } from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated(); // This returns a boolean, not a function
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // If not authenticated, return null (or a loading spinner)
  if (!isAuthenticated) {
    return null; // or return <LoadingSpinner />
  }

  // If authenticated, render the children (protected content)
  return children;
};

// Prop types validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
import React, { useEffect, useState } from 'react';

import ErrorPage from './ErrorPage';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  // This function updates state when an error is caught
  const updateErrorState = (errorObject) => {
    setError(errorObject);
    setHasError(true);
  };

  useEffect(() => {
    // This is a placeholder for error handling logic
    const handleError = (errorObject, errorInfo) => {
      console.error('Uncaught error:', errorObject, errorInfo);
    };

    // Example: Log something or clean up resources here
    return () => {
      // Cleanup actions if necessary
    };
  }, []);

  if (hasError) {
    return (
      <ErrorPage
        message="An Application Error Occurred. Please try again."
        actionText="Go back to Homepage"
        onAction={() => {
          const url = '/'; // Avoid direct assignment in return statement
          window.location.href = url;
        }}
      />
    );
  }

  return children;
}

export default ErrorBoundary;

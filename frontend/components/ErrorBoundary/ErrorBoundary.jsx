import React, { useEffect, useState } from 'react';

import NotFoundPage from '@/pages/404/index';
import ApplicationErrorPage from '@/pages/error-application';
import NetworkErrorPage from '@/pages/error-network';

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
      updateErrorState(errorObject);
    };

    return () => {
      // Cleanup actions if necessary
    };
  }, []);

  const handleRetry = () => {
    setHasError(false);
    setError(null);
    window.location.reload();
  };

  if (hasError) {
    if (error && error.message && error.message.includes('Network Error')) {
      return <NetworkErrorPage retry={handleRetry} />;
    }
    if (error && error.message && error.message.includes('404')) {
      return <NotFoundPage />;
    }
    return <ApplicationErrorPage />;
  }

  return children;
}

export default ErrorBoundary;

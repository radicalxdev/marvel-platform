import { useState } from 'react';

/**
 * Utiliy Function for managing alert state
 *
 * @returns the current alert state, setter function, and close handler function to be used by other components
 */
const AlertStateUtils = () => {
  // State hook for alert management with initial values
  const [alertState, setAlertState] = useState({
    open: false, // Indicates if the alert is visible
    message: '', // Message text to be displayed in the alert
    severity: '', // Severity level of the alert (e.g., 'error', 'success')
  });

  // Function to handle closing the alert
  const handleAlertClose = () => {
    setAlertState({
      ...alertState,
      open: false,
    });
  };

  return {
    alertState,
    setAlertState,
    handleAlertClose,
  };
};

export default AlertStateUtils;

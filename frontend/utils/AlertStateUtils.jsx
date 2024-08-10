import { useState } from 'react';

const AlertStateUtils = () => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    severity: '',
  });

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

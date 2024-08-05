import React, { useEffect, useState } from 'react';

import NetworkErrorPage from '@/pages/error-network';

const NetworkStatus = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);

  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Initial check
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  if (!isOnline) {
    return <NetworkErrorPage retry={() => window.location.reload()} />;
  }

  return children;
};

export default NetworkStatus;

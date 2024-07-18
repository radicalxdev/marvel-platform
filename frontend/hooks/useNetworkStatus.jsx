import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import ROUTES from '@/constants/routes';

/**
 * Custom hook for error routing and network status management.
 * Monitors network connectivity and checks if the current route is an error page.
 *
 * @returns {{
 *   isOnline: boolean // Current network connectivity status
 *   isErrorPage: boolean // Flag indicating whether the current route is an error page
 * }}
 */
const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isErrorPage, setIsErrorPage] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(window.navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  useEffect(() => {
    const isError =
      router.pathname === ROUTES.APP_ERROR ||
      router.pathname === ROUTES.NETWORK_ERROR ||
      router.pathname === ROUTES.FOUR_OH_FOUR_ERROR;

    setIsErrorPage(isError);
  }, [router.pathname]);

  return { isOnline, isErrorPage };
};

export default useNetworkStatus;

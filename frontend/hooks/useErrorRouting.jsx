import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import ROUTES from '@/constants/routes';

import { setLoading } from '@/redux/slices/authSlice';

/**
 * Custom hook for error routing and network status management.
 * Monitors network connectivity, application errors, and checks if the current route is an error page.
 *
 * @returns {{
 *   isOnline: boolean // Current network connectivity status
 *   showApplicationError: boolean // Flag indicating whether to display application error page
 *   isErrorPage: boolean // Flag indicating whether the current route is an error page
 * }}
 */
const useErrorRouting = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showApplicationError, setShowApplicationError] = useState(false);
  const [isErrorPage, setIsErrorPage] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
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
    if (!isOnline) return;

    if (auth.error || user.error) {
      dispatch(setLoading(false));
      setShowApplicationError(true);
    } else {
      setShowApplicationError(false);
    }
  }, [isOnline, auth.error, user.error, dispatch]);

  useEffect(() => {
    const isError =
      router.pathname === ROUTES.APP_ERROR ||
      router.pathname === ROUTES.NETWORK_ERROR ||
      router.pathname === ROUTES.FOUR_OH_FOUR_ERROR;

    setIsErrorPage(isError);
  }, [router.pathname]);

  return { isOnline, showApplicationError, isErrorPage };
};

export default useErrorRouting;

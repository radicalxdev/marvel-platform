import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  load as loadIntercom,
  boot as bootIntercom,
  update as updateIntercom,
} from './Intercom';

const IntercomProvider = ({ children, userData }) => {
  const { name, email, user_id } = userData;

  const router = useRouter();

  if (typeof window !== 'undefined') {
    loadIntercom();
    bootIntercom({ name, email, user_id, createAt: new Date() });
  }

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== 'undefined') {
        updateIntercom();
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return children;
};

export default IntercomProvider;

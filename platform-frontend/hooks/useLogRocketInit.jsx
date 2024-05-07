import { useEffect } from 'react';

import LogRocket from 'logrocket';

/**
 * Initializes the LogRocket library for capturing and tracking errors and user sessions.
 *
 * @return {undefined} No return value.
 */
const useLogRocketInit = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_APP_ID);
  }, []);
};

export default useLogRocketInit;

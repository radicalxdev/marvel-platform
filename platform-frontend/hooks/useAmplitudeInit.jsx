import { useEffect } from 'react';

export let amplitude;

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

/**
 * Initializes the Amplitude analytics library.
 *
 * @return {undefined} No return value.
 */
const useAmplitudeInit = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const initAmplitude = async () => {
      amplitude = await import('@amplitude/analytics-browser');
      amplitude.init(AMPLITUDE_API_KEY, undefined, {
        logLevel: amplitude.Types.LogLevel.Warn,
        defaultTracking: {
          sessions: true,
        },
      });
    };
    initAmplitude();
  }, []);
};

export default useAmplitudeInit;

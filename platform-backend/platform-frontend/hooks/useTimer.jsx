import { useEffect, useState } from 'react';

import moment from 'moment';

const DEFAULT_TIME = {
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00',
  progress: 0,
};

/**
 * Generates a countdown timer based on the given end time, start flag, and callback function.
 *
 * @param {Date} endTime - The end time of the countdown timer.
 * @param {boolean} start - Flag indicating whether the timer should start or not.
 * @param {function} cb - Callback function to be executed when the timer reaches zero.
 * @return {object} - The countdown object containing days, hours, minutes, and seconds.
 */
const useTimer = (endTime, start, cb, startTime) => {
  const [countdown, setCountdown] = useState(DEFAULT_TIME);
  let interval = null;

  const setCounter = () => {
    const timeRemaining = moment(endTime).diff(moment());
    const percentage = (timeRemaining / (endTime - startTime)) * 100;

    if (timeRemaining < 0) {
      cb();
      clearInterval(interval);
      return setCountdown(DEFAULT_TIME);
    }

    const duration = moment.duration(timeRemaining);

    return setCountdown({
      days: Math.floor(duration.asDays()).toString().padStart(2, '0'),
      hours: duration.hours().toString().padStart(2, '0'),
      minutes: duration.minutes().toString().padStart(2, '0'),
      seconds: duration.seconds().toString().padStart(2, '0'),
      percentage,
    });
  };

  useEffect(() => {
    setCounter();

    if (start) {
      interval = setInterval(() => setCounter(), 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [start]);

  return countdown;
};

export default useTimer;

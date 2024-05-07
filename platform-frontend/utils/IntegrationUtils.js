import { amplitude } from '@/hooks/useAmplitudeInit';

/**
 * Sets the behavior of the Intercom widget based on the specified action.
 *
 * @param {string} action - The action to perform on the Intercom widget. Possible values are 'hide', 'open', and 'scroll'.
 * @return {object} An object containing the observer used for scrolling.
 */
const setIntercom = (action) => {
  const frame = window.document.querySelector('body .intercom-messenger-frame');
  const launchers = window.document.querySelectorAll(
    '.intercom-launcher, .intercom-launcher-active, .intercom-507y44, .intercom-dfosxs'
  );
  const intercomLauncher = window.document.querySelector('.intercom-launcher');

  const clickIntercom = () => {
    if (intercomLauncher) {
      // open and close after a small delay otherwise the bubble can't be displayed properly
      intercomLauncher.click();
      setTimeout(() => intercomLauncher.click(), 10);
    }
  };

  // Define handleScroll function
  const handleScroll = () => {
    if (window.scrollY > 0) {
      if (frame) {
        frame.style.position = 'absolute';
      }

      launchers.forEach((launcher) => {
        launcher.style.position = 'absolute';
      });
    }
  };

  // Define observer
  const observer = new MutationObserver((mutationsList, obs) => {
    mutationsList.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.classList && node.classList.contains('intercom-launcher')) {
            clickIntercom();
            obs.disconnect();
          }
        });
      }
    });
  });

  switch (action) {
    case 'hide':
      if (frame) {
        frame.style.display = 'none';
      }
      launchers.forEach((launcher) => {
        launcher.style.display = 'none';
      });
      break;
    case 'open':
      if (!!frame && frame.style.display === 'none') {
        frame.style.display = 'block';
      }
      launchers.forEach((launcher) => {
        launcher.style.display = 'block';
      });
      break;
    case 'scroll':
      observer.observe(window.document.body, {
        childList: true,
        subtree: true,
      });

      if (window.scrollY > 0) {
        if (frame) {
          frame.style.position = 'absolute';
        }

        launchers.forEach((launcher) => {
          launcher.style.position = 'absolute';
        });
      }

      window.addEventListener('scroll', handleScroll);
      break;
    default:
      break;
  }

  return {
    observer,
  };
};

/**
 * Tracks an event using the Amplitude analytics service.
 *
 * @param {string} name - The name of the event to track.
 * @param {object} props - Additional properties to attach to the event.
 */
const amplitudeTracker = (name, props) => {
  amplitude.track(name, props);
};

/**
 * Formats a Stripe amount from cents to dollars and returns it as a formatted currency string.
 *
 * @param {number} unitAmount - The amount in cents to be formatted.
 * @return {string} The formatted currency string.
 */
const formatStripeAmount = (unitAmount) => {
  const amount = unitAmount / 100; // Convert from cents to dollars
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

/**
 * Sanitizes the given state object by excluding large or sensitive data.
 *
 * @param {Object} state - The state object to be sanitized.
 * @return {Object} The sanitized state object.
 */
const logRocketStateSanitizer = (state) => {
  // Exclude large or sensitive data
  const sanitizedState = { ...state };

  delete sanitizedState.auth;
  delete sanitizedState.chat;
  delete sanitizedState.internal;
  delete sanitizedState.challenges;
  delete sanitizedState.leaderboard;
  delete sanitizedState.enrolledChallenges;

  return sanitizedState;
};

export {
  setIntercom,
  amplitudeTracker,
  formatStripeAmount,
  logRocketStateSanitizer,
};

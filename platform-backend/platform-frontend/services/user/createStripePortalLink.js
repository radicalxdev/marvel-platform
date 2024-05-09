import { httpsCallable } from 'firebase/functions';

import { functions } from '@/redux/store';

/**
 * Creates a stripe customer portal link asynchronously.
 *
 * @return {string} The URL of the portal link.
 */
const createPortalLink = async () => {
  try {
    const portalLink = httpsCallable(
      functions,
      'ext-firestore-stripe-payments-createPortalLink'
    );

    const { data } = await portalLink({
      returnUrl: window.location.origin,
    });

    return data.url;
  } catch (error) {
    throw new Error('Failed to create portal link ');
  }
};

export default createPortalLink;

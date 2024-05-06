import { httpsCallable } from 'firebase/functions';
import { functions } from '@/redux/store';

/**
 * Creates a Stripe customer for the current user.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The user ID.
 * @param {string} props.email - The user's email.
 * @return {Promise} The response from creating the Stripe customer.
 */
const createStripeCustomer = async (props) => {
  try {
    const { id, email } = props;

    const createStripeCustomerForCurrentUsers = httpsCallable(
      functions,
      'createStripeCustomerForCurrentUsers'
    );

    const response = await createStripeCustomerForCurrentUsers({
      userId: id,
      email,
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default createStripeCustomer;

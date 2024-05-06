const admin = require("firebase-admin");
const { logger, https, firestore } = require("firebase-functions/v1");
const { onRequest, onCall } = require("firebase-functions/v1/https");
const { onCustomEventPublished } = require("firebase-functions/v2/eventarc");
const Stripe = require("stripe");
const stripeClient = Stripe(process.env.STRIPE_API_KEY);

const {
  SUBSCRIPTION_MONTHLY_DIAMONDS,
  STRIPE_EVENTS,
} = require("../constants");

const channel = process.env.STRIPE_EVENTS_CHANNEL;
const region = process.env.STRIPE_EVENTS_REGION;
const freePlanPriceId = process.env.FREE_PLAN_PRICE_ID;

/**
 * Stripe checkout session completed.
 * Adds diamonds to user based on the subscription plan.
 *
 * @param {object} event - Stripe checkout session completed
 * @param {string} event.data.customer - Stripe customer id
 * @param {number} event.data.amount_total - Total amount paid
 * @returns {void}
 */
const addGemsOnCheckoutSessionCompleted = onCustomEventPublished(
  {
    eventType: STRIPE_EVENTS.CHECKOUT_SESSION_COMPLETED,
    channel,
    region,
  },
  async (event) => {
    try {
      const { customer, amount_total } = event.data;

      process.env.DEBUG && logger.log("checkout session completed", event.data);

      // Retrieve user doc based on stripeId
      const userRef = await admin
        .firestore()
        .collection("users")
        .where("stripeId", "==", customer)
        .limit(1)
        .get();

      // If user doesn't exist
      if (userRef.empty) {
        logger.log(`User with ${customer} stripe id doesn't exist`);
        return;
      }

      const { diamonds } = userRef.docs[0].data();

      // If user has less diamonds than the subscription plan, top up diamonds
      if (diamonds < SUBSCRIPTION_MONTHLY_DIAMONDS[amount_total]) {
        // Add diamonds to user
        await userRef.docs[0].ref.update({
          diamonds: SUBSCRIPTION_MONTHLY_DIAMONDS[amount_total],
        });

        logger.log(
          `User with ${customer} stripe id has been updated with ${SUBSCRIPTION_MONTHLY_DIAMONDS[amount_total]} gems`
        );
      } else {
        logger.log(
          `User with ${customer} already has ${diamonds} gems or more`
        );
      }
    } catch (error) {
      logger.log("Error updating gems", error);
    }
  }
);

/**
 * Stripe customer subscription updated.
 * Adds diamonds to user based on the subscription plan.
 * If a user has less gems than the subscription plan, adds the difference
 *
 * @param {object} event - Stripe customer subscription updated
 * @param {string} event.data.customer - Stripe customer id
 * @param {number} event.data.amount - Total amount paid
 * @returns {void}
 */
const addGemsOnCustomerSubscriptionUpdated = onCustomEventPublished(
  {
    eventType: STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_UPDATED,
    channel,
    region,
  },
  async (event) => {
    try {
      const {
        customer,
        plan: { product },
      } = event.data;

      process.env.DEBUG && logger.log("checkout session updated", event.data);
      process.env.DEBUG && logger.log("plan", event.data.plan);

      // Retrieve user doc based on stripeId
      const userRef = await admin
        .firestore()
        .collection("users")
        .where("stripeId", "==", customer)
        .limit(1)
        .get();

      // If user doesn't exist
      if (userRef.empty) {
        logger.log(`User with ${customer} stripe id doesn't exist`);
        return;
      }

      const productRef = await admin
        .firestore()
        .collection("products")
        .doc(product)
        .get();

      if (!productRef.exists) {
        logger.log(`Product with id ${product} doesn't exist`);
        return;
      }

      process.env.DEBUG && logger.log("retrieved product", productRef.data());

      const {
        metadata: { gems },
      } = productRef.data();

      const { diamonds } = userRef.docs[0].data();

      // If user has less diamonds than the subscription plan, top up diamonds
      if (diamonds < parseInt(gems, 10)) {
        // Add diamonds to user
        await userRef.docs[0].ref.update({
          diamonds: parseInt(gems, 10),
        });

        logger.log(
          `User with ${customer} stripe id has been updated with ${parseInt(
            gems,
            10
          )} gems`
        );
      } else {
        logger.log(
          `User with ${customer} already has ${diamonds} gems or more`
        );
      }
    } catch (error) {
      logger.log("Error updating gems", error);
    }
  }
);

/**
 * Downgrades a user to the free plan when they cancel their free subscription.
 * The user should always be subscribed to the free plan.
 *
 * @return {Promise<void>} A promise that resolves when the downgrade is complete.
 */
const downgradeUserToFreePlanOnSubscriptionCancel = onCustomEventPublished(
  {
    eventType: STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_DELETED,
    channel,
    region,
  },
  async (event) => {
    try {
      const { customer } = event.data;

      // Re-subscribe user to free plan
      const subscription = await stripeClient.subscriptions.create({
        customer,
        items: [{ price: freePlanPriceId }],
      });
      logger.log("Re-subscribed user to free plan", subscription, customer);
    } catch (error) {
      logger.log("Error updating gems", error);
    }
  }
);

/**
 * Adds a new user to the free plan.
 *
 * @param {object} data - The data object containing the userId and customerId .
 * @param {object} context - The context object.
 * @return {object} An object with the status and message.
 */
const addNewUserToFreePlan = onRequest(async (req, res) => {
  try {
    logger.log("body", req.body);
    //the cloud function should not execute for any other event
    if (req.body.type === "customer.created") {
      const { data } = req.body;
      logger.log("data", data);

      if (!data.object.id || !data.object.metadata.firebaseUID) {
        return res
          .status(400)
          .json({ message: "customerId and userId are required" });
      }

      const subscription = await stripeClient.subscriptions.create({
        customer: data.object.id,
        items: [{ price: freePlanPriceId }],
      });

      logger.log("freePlanId", freePlanPriceId);
      logger.log("subs", subscription, data.object.id);

      return res
        .status(200)
        .json({ message: "Subscription created successfully" });
    } else {
      return res.status(200).json({ message: "Unhandled event type" });
    }
  } catch (error) {
    logger.error("error", error);
    return res.status(500).json({ message: error.message });
  }
});

/**
 * Create a customer object in Stripe when a user is created.
 *
 * @param {Object} props.email - The email of the user.
 * @param {Object} props.uid - The uid of the user.
 * @return {Object} The customer object.
 */
const createCustomerRecord = async ({ email, uid }) => {
  try {
    logger.log(`Creating customer record for ${uid}`);
    const customerData = {
      metadata: {
        firebaseUID: uid,
      },
    };

    if (email) customerData.email = email;
    const customer = await stripeClient.customers.create(customerData);

    // Add a mapping record in Cloud Firestore.
    const customerRecord = {
      email: customer.email,
      stripeId: customer.id,
      stripeLink: `https://dashboard.stripe.com${
        customer.livemode ? "" : "/test"
      }/customers/${customer.id}`,
    };

    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .set(customerRecord, { merge: true });
    logger.log(
      `Created stripe customer with ${customer.id} in ${customer.livemode}`
    );

    return customerRecord;
  } catch (error) {
    logger.log(`Error creating customer record for ${uid}`);
    logger.log(`Error: ${error}`);
    return null;
  }
};

/**
 * Create a stripe customer record when a new user doc is created on signup
 */
const createStripeCustomerOnUserCreated = firestore
  .document("/users/{id}")
  .onCreate(async (snap, context) => {
    const { email, fullName, id } = snap.data();
    logger.log("User created", id);
    try {
      if (!email || !id) {
        logger.log(`Error creating customer record for user ${id}`);
        return;
      }

      await createCustomerRecord({
        email,
        uid: id,
      });
    } catch (error) {
      logger.log(`Error creating customer record for user ${fullName} - ${id}`);
      logger.log(error);
      throw new https.HttpsError("internal", error.message);
    }
  });

/**
 * Create a Stripe customer for the user that already signed up and does not have a Stripe customer.
 * This function will only run if the user does not have a stripeId in their document.
 * The check for this prop will occur in the Frontend app.
 *
 * @param {object} data - The data passed to the function.
 *   @property {string} userId - The ID of the user.
 *   @property {string} email - The email of the user.
 * @param {object} context - The context object.
 * @return {object} - The response object.
 *   @property {number} status - The status code of the response.
 *   @property {string} message - The message of the response.
 */
const createStripeCustomerForCurrentUsers = onCall(async (data, context) => {
  try {
    const { userId, email } = data;

    if (userId !== context.auth.uid) {
      logger.log("Auth Error", "Unauthorized access");
      throw new https.HttpsError("unauthenticated", "Unauthorized access");
    }

    await createCustomerRecord({
      email,
      uid: userId,
    });

    logger.log("freePlanId", freePlanPriceId);
    return { status: 200, message: "Subscription created successfully" };
  } catch (error) {
    logger.error("error", error);
    return { status: 500, message: error.message };
  }
});

module.exports = {
  addGemsOnCheckoutSessionCompleted,
  addGemsOnCustomerSubscriptionUpdated,
  addNewUserToFreePlan,
  downgradeUserToFreePlanOnSubscriptionCancel,
  createStripeCustomerOnUserCreated,
  createStripeCustomerForCurrentUsers,
};

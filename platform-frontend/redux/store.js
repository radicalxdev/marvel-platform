import { getStripePayments } from '@invertase/firestore-stripe-payments';
import { configureStore } from '@reduxjs/toolkit';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

import LogRocket from 'logrocket';

import authReducer from './slices/authSlice';
import challengesReducer from './slices/challengesSlice';
import enrolledChallengesReducer from './slices/enrolledChallengesSlice';
import internalReducer from './slices/internalSlice';
import userReducer from './slices/userSlice';

import firebaseConfig from '@/firebase/config';
import { logRocketStateSanitizer } from '@/utils/IntegrationUtils';

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);
const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'users',
});

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    enrolledChallenges: enrolledChallengesReducer,
    challenges: challengesReducer,
    internal: internalReducer,
  },
  middleware: (gDM) =>
    gDM({ serializableCheck: false }).concat(
      LogRocket.reduxMiddleware({ stateSanitizer: logRocketStateSanitizer })
    ),
});

export { auth, firestore, payments, functions };

export default store;

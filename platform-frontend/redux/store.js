import { configureStore } from '@reduxjs/toolkit';
import LogRocket from 'logrocket';
import { getStripePayments } from '@invertase/firestore-stripe-payments';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

import { initializeApp } from 'firebase/app';

import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import enrolledChallengesReducer from './slices/enrolledChallengesSlice';
import challengesReducer from './slices/challengesSlice';
import internalReducer from './slices/internalSlice';

import { logRocketStateSanitizer } from '@/utils/IntegrationUtils';

import firebaseConfig from '@/firebase/config';

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

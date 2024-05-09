import { configureStore } from '@reduxjs/toolkit';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

import LogRocket from 'logrocket';

import authReducer from './slices/authSlice';
import toolsReducer from './slices/toolsSlice';
import userReducer from './slices/userSlice';

import firebaseConfig from '@/firebase/config';
import { logRocketStateSanitizer } from '@/utils/IntegrationUtils';

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tools: toolsReducer,
  },
  middleware: (gDM) =>
    gDM({ serializableCheck: false }).concat(
      LogRocket.reduxMiddleware({ stateSanitizer: logRocketStateSanitizer })
    ),
});

export { auth, firestore, functions };

export default store;

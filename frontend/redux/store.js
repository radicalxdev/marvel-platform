import { configureStore } from '@reduxjs/toolkit';

import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import toolsReducer from './slices/toolsSlice';
import userReducer from './slices/userSlice';

import firebaseConfig from '@/firebase/config';

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);

// Connect to Firebase Emulators if running locally
if (
  typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname)
) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tools: toolsReducer,
    chat: chatReducer,
  },
});

export { auth, firestore, functions };
export default store;

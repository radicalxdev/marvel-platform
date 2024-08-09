import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import { storage } from '../store';

// Thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  'userData/fetch',
  async ({ firestore, id }) => {
    try {
      const userQuery = query(
        collection(firestore, 'users'),
        where('id', '==', id)
      );

      const userDocSnapshot = await getDocs(userQuery);

      if (userDocSnapshot.empty) return null;

      const user = userDocSnapshot.docs[0].data();

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Thunk for submitting onboarding data
export const updateUserData = createAsyncThunk(
  'onboarding/submitOnboardingData',
  async ({ firestore, data }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const userId = user?.data?.id;

      const userDocRef = doc(firestore, 'users', userId);

      await setDoc(userDocRef, data, { merge: true });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// This function assumes that all user Data is stored in an object, that does not have the profileImage property yet.
export const uploadImage = async(userObj, imageFile) => {

  try {

//   // Create a reference to a location in Firebase Storage where the profile image will be uploaded in the db
//   // use the fullName to ensure uniqueness
  const storageRef = ref(storage, `users/${userObj.fullName}/${imageFile.name}`);

   // Upload the profile image file to the specified reference in Firebase Storage
   await uploadBytes(storageRef, imageFile);

   // download URL for the uploaded image
   const profileImageUrl = await getDownloadURL(storageRef);

   return profileImageUrl

 } catch (error) {
   console.log("There was an error: ", error);
 }

 }

export default fetchUserData;

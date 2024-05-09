import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';

const fetchUserData = createAsyncThunk(
  'userData/fetch',
  async ({ firestore, id }) => {
    // Query for user doc by id in users collection
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

export default fetchUserData;

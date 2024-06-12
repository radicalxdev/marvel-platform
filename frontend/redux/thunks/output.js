import { createAsyncThunk } from '@reduxjs/toolkit';
import 'firebase/firestore';

const fetchOutput = createAsyncThunk(
  'tools/fetch',
  async ({ firestore, uid }) => {
    try {
      const hists = await firestore
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('outputs')
        .get();
      return hists.docs.map((doc) => doc.data());
    } catch (error) {
      throw new Error(error);
    }
  }
);

export default fetchOutput;

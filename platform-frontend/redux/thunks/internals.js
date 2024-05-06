import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';

const fetchInternals = createAsyncThunk(
  'internal/config',
  async (firestore) => {
    // Get reference to internals collection
    const internalRef = query(
      collection(firestore, 'internal'),
      where('id', '==', 'config')
    );

    // Get snapshot of internals collection
    const internalSnapshot = await getDocs(internalRef);

    if (internalSnapshot.empty) return null;

    const internalData = internalSnapshot.docs[0].data();

    return internalData;
  }
);

export default fetchInternals;

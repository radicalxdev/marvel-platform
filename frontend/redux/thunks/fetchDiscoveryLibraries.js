import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

/**
 * Async thunk to fetch Discovery Libraries from Firestore.
 *
 * @returns {Promise<Array>} An array of Discovery Library objects.
 */
export const fetchDiscoveryLibraries = createAsyncThunk(
  'chat/fetchDiscoveryLibraries', // Unique string used to identify this thunk
  async () => {
    const firestore = getFirestore(); // Get Firestore instance

    const discoveryLibrariesCollection = collection(
      firestore,
      'discoveryLibraries'
    ); // Get reference to Discovery Libraries collection

    const discoveryLibrariesSnapshot = await getDocs(
      discoveryLibrariesCollection
    ); // Get snapshot of Discovery Libraries documents

    // Map snapshot documents to Discovery Library objects and return
    return discoveryLibrariesSnapshot.docs.map((doc) => doc.data());
  }
);

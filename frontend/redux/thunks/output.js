// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { collection, getDocs } from 'firebase/firestore';

// import { firestore } from '../store'; // Import Firestore from the store

// // Thunk to fetch data from Firestore
// export const fetchOutputHistory = createAsyncThunk(
//   'outputHistory/fetchOutputHistory',
//   async (_, { rejectWithValue }) => {
//     try {
//       const querySnapshot = await getDocs(collection(firestore, 'outputs'));
//       const outputData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       return outputData;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

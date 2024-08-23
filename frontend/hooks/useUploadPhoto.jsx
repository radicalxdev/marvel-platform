import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const useUploadPhoto = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [photoURL, setPhotoURL] = useState('');

  const uploadPhoto = async (file, uid, oldPhotoURL) => {
    setUploading(true);
    setError(null);
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `photos/${uid}/${file.name}`);

      // Upload the file
      await uploadBytes(storageRef, file);

      // Get the download URL
      const url = await getDownloadURL(storageRef);
      setPhotoURL(url);

      // If there's an old photo, delete it
      if (oldPhotoURL) {
        const oldPhotoRef = ref(storage, oldPhotoURL);
        await deleteObject(oldPhotoRef);
      }

      setUploading(false);
      return url;
    } catch (err) {
      console.error('Error uploading photo:', err);
      setError('Failed to upload the photo. Please try again.');
      setUploading(false);
      throw err;
    }
  };

  return { uploading, error, photoURL, uploadPhoto };
};

export default useUploadPhoto;

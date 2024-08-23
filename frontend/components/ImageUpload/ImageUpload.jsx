import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useController } from 'react-hook-form';
import useUploadPhoto from '../../hooks/useUploadPhoto';

const ImageUpload = ({ name, control, uid, initialPhotoURL }) => {
  const { field } = useController({ name, control });
  const [preview, setPreview] = useState(initialPhotoURL || null); // Initialize with existing photo URL
  const [errorMessage, setErrorMessage] = useState('');
  const { uploading, error, uploadPhoto } = useUploadPhoto();

  // Load the existing photo on page load
  useEffect(() => {
    if (initialPhotoURL) {
      setPreview(initialPhotoURL);
      field.onChange(initialPhotoURL);
    }
  }, [initialPhotoURL, field]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      // Check if file size is less than 1 MB
      if (file.size <= 1048576) {
        try {
          // Upload the file and get the URL
          const url = await uploadPhoto(file, uid, field.value); // Pass old URL for deletion

          field.onChange(url); // Update the form field with the new URL
          setPreview(url); // Update the preview
          setErrorMessage(''); // Clear any previous error messages
        } catch (uploadError) {
          console.error('Error uploading file:', uploadError);
          setErrorMessage('Failed to upload the image.');
          field.onChange(''); // Clear the field value on error
          setPreview(null); // Clear the preview on error
        }
      } else {
        // File is too large, set an error message
        setPreview(null);
        setErrorMessage('File size must be less than 1 MB.');
      }
    }
  }, [field, uploadPhoto, uid]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
        border: '2px dashed',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <input {...getInputProps()} />
      <CloudUpload sx={{ fontSize: 48, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Drag & Drop OR Upload an Image
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Formats: JPG, PNG | Upto 1 MB
      </Typography>
      <Button variant="contained" component="span" disabled={uploading}>
        {uploading ? 'Uploading...' : 'SELECT FILE'}
      </Button>
      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {errorMessage || error}
        </Typography>
      )}
      {preview && (
        <Box mt={2}>
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200 }} />
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;

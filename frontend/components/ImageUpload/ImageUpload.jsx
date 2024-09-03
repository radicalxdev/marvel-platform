import { useCallback, useEffect, useState } from 'react';

import { CloudUpload } from '@mui/icons-material';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';

import { useController } from 'react-hook-form';

import useUploadFile from '../../hooks/useUploadFile';

const ImageUpload = ({ name, control, uid, initialPhotoURL }) => {
  const { field } = useController({ name, control });
  const [preview, setPreview] = useState(initialPhotoURL || null);
  const [errorMessage, setErrorMessage] = useState('');
  const { uploading, error, progress, uploadFile } = useUploadFile();

  // Load the existing photo on page load
  useEffect(() => {
    if (initialPhotoURL) {
      setPreview(initialPhotoURL);
    }
  }, [initialPhotoURL]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        // Check if file size is less than 1 MB
        if (file.size <= 1048576) {
          try {
            // Upload the file and get the URL
            const url = await uploadFile(file, uid, 'photos', field.value);

            // Update the form field with the new URL
            field.onChange(url);
            setPreview(url);
            setErrorMessage('');
          } catch (uploadError) {
            setErrorMessage('Failed to upload the image.');
            field.onChange('');
            setPreview(null);
          }
        } else {
          // File is too large, set an error message
          setPreview(null);
          setErrorMessage('File size must be less than 1 MB.');
        }
      }
    },
    [field, uploadFile, uid]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
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
        borderRadius: 2,
        position: 'relative',
      }}
    >
      <input {...getInputProps()} />
      <CloudUpload sx={{ fontSize: 48, mb: 2, color: 'text.primary' }} />
      <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
        Drag & Drop OR Upload an Image
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ mb: 3 }}>
        Formats: JPG, PNG | Upto 1 MB
      </Typography>
      <Button variant="contained" component="span" disabled={uploading}>
        {uploading ? 'Uploading...' : 'SELECT FILE'}
      </Button>
      {uploading && (
        <Box sx={{ mt: 2, width: '100%' }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            progress
          )}%`}</Typography>
        </Box>
      )}
      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {errorMessage || error}
        </Typography>
      )}
      {preview && (
        <Box mt={2}>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: 200 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;

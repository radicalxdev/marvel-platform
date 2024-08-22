import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useController } from 'react-hook-form';

const ImageUpload = ({ name, control }) => {
  const { field } = useController({ name, control });
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      // Check if file size is less than 1 MB
      if (file.size <= 1048576) {
        field.onChange(file); // Notify react-hook-form about the file
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result);
          setErrorMessage(''); // Clear any previous error messages
        };
        reader.readAsDataURL(file);
      } else {
        // File is too large, set an error message
        setPreview(null);
        setErrorMessage('File size must be less than 1 MB.');
      }
    }
  }, [field]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
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
      <Button variant="contained" component="span">
        SELECT FILE
      </Button>
      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {errorMessage}
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

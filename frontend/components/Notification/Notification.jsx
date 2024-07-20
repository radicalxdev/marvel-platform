import { Snackbar, Button, Alert } from '@mui/material';
import styles from './styles';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SuccessNotification = ({ message, open }) => (
    <Snackbar
        open={open}
        autoHideDuration={6000}
        // onClose={onClose}
        message={message}
    />
);

const ErrorNotification = ({ message, open, onClose }) => {
    const closeButton = (
        <React.Fragment>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
        </React.Fragment>
    );

    return (
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        action={closeButton}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={{
            position: 'absolute',
            top: '7%',
            // height: '200px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%', // Adjust the max-width as needed

            
            // maxWidth: '50%', // Adjust the max-width as needed
            // minWidth: '100px', // Adjust the min-width as needed
          }}
    >
        <Alert
            onClose={onClose}
            severity='error'
            variant='filled'
            style={{
                backgroundColor: '#3D252B',
                color: '#FE6167', // Text color
                padding: '12px, 20px, 12px, 20px',
                borderRadius: '8px',
                height: '95px',
                fontSize: '16px',
                fontFamily: 'Satoshi, sans-serif', // Using Satoshi for the main message
                border: '1px solid #FE6167', // Border color and width
                backgroundColor: 'rgba(211, 47, 47, 0.3)', // Semi-transparent background color
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.35)', // Adjust blur and transparency here
                
                // backgroundColor: 'rgba(255, 255, 255, 0.336)', // Background color with opacity

                // backdropFilter: 'blur(10px)', // Adjust blur intensity as needed
                // backgroundColor: 'rgba(255, 255, 255, 0.336)', // Background color with opacity
              }}
            
        >
            {message}
        </Alert>

    </Snackbar>
    );
};
export { SuccessNotification, ErrorNotification }
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
            severity="error"
            variant="filled"
            style={{...styles.ErrorNotification}}
        >
            {message}
        </Alert>

    </Snackbar>
    );
};
export { SuccessNotification, ErrorNotification }
import { Snackbar, Button, Alert } from '@mui/material';
import styles from './styles';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';

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
        TransitionComponent={(props) => <Fade {...props} timeout={{ enter: 500, exit: 500 }} />}
        onClose={onClose}
        action={closeButton}
        {...styles.ErrorNotification}
    >
        <Alert
            onClose={onClose}
            {...styles.AlertNotification}
        >
            {message}
        </Alert>

    </Snackbar>
    );
};
export { SuccessNotification, ErrorNotification }
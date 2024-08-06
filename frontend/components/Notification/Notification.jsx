import { Snackbar, Button, Alert, SnackbarContent } from '@mui/material';
import styles from './styles';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SuccessNotification = (props) => {

    const {
        message,
        open,
        onClose,
        ...snackbarProps
      } = props;

    
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
        {...snackbarProps}
    >
        <SnackbarContent
                    action={closeButton}
                    onClose={onClose}
            {...styles.successNotification}
            message={message}
        ></SnackbarContent>
    </Snackbar>
    )
};

const ErrorNotification = (props) => {

    const {
        message,
        open,
        onClose,
        ...snackbarProps
      } = props;

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
        {...snackbarProps}
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
import { Snackbar, Button } from '@mui/material';

const SuccessNotification = ({ message, open, onClose }) => (
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        message={message}
    />
);

const ErrorNotification = ({ message, open, onClose }) => (
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        message={message}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        action={
            <Button color="secondary" size="small" onClick={onClose}>
                Dismiss
            </Button>
        }
    />
);
export { SuccessNotification, ErrorNotification };

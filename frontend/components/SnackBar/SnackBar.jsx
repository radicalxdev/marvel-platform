import { Alert, AlertTitle, Snackbar } from '@mui/material';

import ALERT_COLORS from '@/constants/notification';

/**
 * Renders a Snackbar component with alert messages.
 *
 * @return {ReactElement} The rendered Snackbar component.
 */
const SnackBar = (props) => {
  const {
    open,
    handleClose,
    message,
    severity = ALERT_COLORS.ERROR,
    title,
    direction = ['top', 'right'],
  } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: direction[0], horizontal: direction[1] }}
    >
      <Alert severity={severity} onClose={handleClose}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;

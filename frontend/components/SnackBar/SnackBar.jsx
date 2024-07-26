import { Alert, Snackbar } from '@mui/material';

import ALERT_COLORS from '@/constants/notification';

/**
 * Renders a Snackbar component with alert messages.
 *
 * @param {Object} props - The properties for the component.
 * @param {boolean} props.htmlMessage - Determines if the message should be rendered as HTML.
 * @return {ReactElement} The rendered Snackbar component.
 */
const SnackBar = (props) => {
  const { open, handleClose, message, severity, htmlMessage } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      color={ALERT_COLORS[severity]}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={severity} onClose={handleClose}>
        {htmlMessage ? (
          <div dangerouslySetInnerHTML={{ __html: message }} />
        ) : (
          message
        )}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import styles from './styles';

/**
 * Function component for rendering an alert dialog.
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.open - Controls the visibility of the dialog.
 * @param {Function} props.handleClose - Function to handle dialog close.
 * @param {string} props.titleContent - Content to be displayed as the dialog title.
 * @param {string} props.bodyContent - Content to be displayed in the dialog body.
 * @param {string} props.buttonOneContent - Content for the first button in the dialog.
 * @param {string} props.buttonTwoContent - Content for the second button in the dialog.
 * @param {Function} props.handleConfirmation - Function to handle the confirmation button click.
 * @returns {JSX.Element} A Dialog component with the specified content and functionality.
 */
const AlertDialog = (props) => {
  const {
    open,
    handleClose,
    titleContent,
    bodyContent,
    buttonOneContent,
    buttonTwoContent,
    handleConfirmation,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...styles.dialogProps}
    >
      <DialogTitle id="alert-dialog-title" {...styles.dialogTitleProps}>
        {titleContent}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          {...styles.dialogContentProps}
        >
          {bodyContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 16px',
        }}
      >
        <Button onClick={handleClose} {...styles.dialogButtonProps}>
          {buttonOneContent}
        </Button>
        <Button onClick={handleConfirmation} {...styles.dialogButtonProps}>
          {buttonTwoContent}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;

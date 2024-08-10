import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import styles from './styles';

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

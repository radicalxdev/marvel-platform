import { Grid, Typography, Button } from '@mui/material';

import styles from './styles';

/**
 * Renders an error component with a message and button to retry.
 *
 * @param {string} message - The error message to display.
 * @param {function} onRetry - The function to call when the retry button is clicked.
 * @returns {JSX.Element} The rendered error component.
 */
const ErrorCard = (props) => {
  const { message, buttonText, onRetry } = props;

  const renderMessage = () => {
    return <Typography {...styles.messageProps}>{message}</Typography>;
  };

  const renderButton = () => {
    return (
      <Button {...styles.buttonProps} onClick={onRetry}>
        {buttonText}
      </Button>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderMessage()}
      {renderButton()}
    </Grid>
  );
};

export default ErrorCard;

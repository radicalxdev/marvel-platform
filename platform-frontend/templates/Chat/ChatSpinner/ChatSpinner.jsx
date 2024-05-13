import { useEffect, useState } from 'react';

import { Box, Fade, Grid } from '@mui/material';

import styles from './styles';

const ChatSpinner = () => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSpinner(true);
    }, 1000); // add your desired delay in milliseconds here

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Fade in={showSpinner} direction="up">
      <Grid id="message" {...styles.mainGridProps}>
        <Grid {...styles.messageWrapperProps(false)}>
          <Box {...styles.mainProps} />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default ChatSpinner;

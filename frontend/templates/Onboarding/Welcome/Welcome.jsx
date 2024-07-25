import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import styles from './styles';

const Welcome = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push('/onboarding/1');
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Typography {...styles.titleProps}>
        Welcome to <span style={{ color: '#8653FF' }}>Kai</span> 👋
      </Typography>
      <Typography
        color="#fff"
        fontWeight={400}
        fontSize="24px"
        {...styles.descriptionProps}
      >
        Let’s get started with your onboarding process.
      </Typography>
      <Button onClick={handleStart} {...styles.buttonProps}>
        Start Here
      </Button>
    </Grid>
  );
};

export default Welcome;

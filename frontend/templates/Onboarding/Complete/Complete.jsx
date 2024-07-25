import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Complete = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Grid sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Onboarding Complete!
      </Typography>
      <Typography variant="body1" paragraph>
        Congrats! the onboarding is complete, continue to go to homepage
      </Typography>
      <Button variant="contained" onClick={handleGoHome}>
        Continue
      </Button>
    </Grid>
  );
};

export default Complete;

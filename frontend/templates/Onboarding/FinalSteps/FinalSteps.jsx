import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const FinalSteps = () => {
  const router = useRouter();

  const handleFinish = () => {
    router.push('/onboarding/4');
  };

  return (
    <Grid sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Final Steps
      </Typography>
      <Typography variant="body1" paragraph>
        Review your information and complete the setup process.
      </Typography>
      <Button variant="contained" onClick={handleFinish}>
        Continue
      </Button>
    </Grid>
  );
};

export default FinalSteps;

import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const SystemConfigs = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding/3');
  };

  return (
    <Grid sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        System Configurations
      </Typography>
      <Typography variant="body1" paragraph>
        Configure your system settings to optimize your experience.
      </Typography>
      <Button variant="contained" onClick={handleNext}>
        Finish
      </Button>
    </Grid>
  );
};

export default SystemConfigs;

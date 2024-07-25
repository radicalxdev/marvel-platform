import { useState } from 'react';

import { Button, Grid, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const ProfileSetupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/onboarding/2');
  };

  return (
    <Grid sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Profile Setup
      </Typography>
      <Typography>Get started by setting up your profile</Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Next
      </Button>
    </Grid>
  );
};

export default ProfileSetupForm;

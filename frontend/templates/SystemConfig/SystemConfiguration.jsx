import React, { useContext, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';

import { useDispatch } from 'react-redux';

import { updateTheme } from '@/redux/slices/themeSlice';
import { ColorModeContext } from '@/theme/theme';

const SystemConfiguration = ({ onSubmit }) => {
  const [preferenceData, setPreferenceData] = useState({
    email: false,
    push: false,
    reminders: false,
    theme: false,
  });

  const dispatch = useDispatch();
  const { toggleColorMode } = useContext(ColorModeContext);

  const handleToggle = (event) => {
    const { name, checked } = event.target;
    setPreferenceData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    if (name === 'theme') {
      toggleColorMode();
    }
  };

  // useEffect to handle theme changes based on preferenceData.theme
  useEffect(() => {
    if (preferenceData.theme) {
      dispatch(updateTheme('dark'));
    } else {
      dispatch(updateTheme('light'));
    }
  }, [preferenceData.theme, dispatch]);

  const onSubmitForm = async () => {
    try {
      await onSubmit(preferenceData);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', paddingTop: '40px' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 1, color: 'text.primary' }}
      >
        System Configurations
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ mb: 1, color: 'text.primary' }}
      >
        We need some permissions to get you started
      </Typography>

      <Box
        sx={{
          textAlign: 'left',
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <FormControlLabel
          labelPlacement="start"
          control={
            <Switch
              name="email"
              checked={preferenceData.email}
              onChange={handleToggle}
            />
          }
          label="Enable Email Notifications"
          sx={{
            marginBottom: '15px',
            justifyContent: 'space-between',
          }}
        />
        <FormControlLabel
          labelPlacement="start"
          control={
            <Switch
              name="push"
              checked={preferenceData.push}
              onChange={handleToggle}
            />
          }
          label="Enable Push Notifications"
          sx={{
            marginBottom: '15px',
            justifyContent: 'space-between',
          }}
        />
        <FormControlLabel
          labelPlacement="start"
          control={
            <Switch
              name="reminders"
              checked={preferenceData.reminders}
              onChange={handleToggle}
            />
          }
          label="Enable Reminders"
          sx={{
            marginBottom: '15px',
            justifyContent: 'space-between',
          }}
        />
        <FormControlLabel
          labelPlacement="start"
          control={
            <Switch
              name="theme"
              checked={preferenceData.theme}
              onChange={handleToggle}
              text={'"dark"'}
            />
          }
          label="Theme Selection"
          sx={{
            marginBottom: '15px',
            justifyContent: 'space-between',
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          marginTop: '30px',
          backgroundColor: '#946EFF',
          borderRadius: '30px',
        }}
        onClick={() => {
          onSubmitForm(preferenceData);
        }}
      >
        Finish
      </Button>
    </Container>
  );
};

export default SystemConfiguration;

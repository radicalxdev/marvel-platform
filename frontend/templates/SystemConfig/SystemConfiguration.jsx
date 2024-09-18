import React, { useContext, useEffect, useState } from 'react';

import {
  Box,
  Container,
  FormControlLabel,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';

import { useDispatch } from 'react-redux';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import styles from './styles';

import { updateTheme } from '@/redux/slices/themeSlice';
import { ColorModeContext } from '@/theme/theme';

const SystemConfiguration = ({ onSubmit }) => {
  const theme = useTheme();
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
    <Container maxWidth="xs" sx={{ textAlign: 'center' }}>
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
      <GradientOutlinedButton
        bgcolor={theme.palette.Dark_Colors.Dark[1]}
        textColor={theme.palette.Common.White['100p']}
        clickHandler={() => {
          onSubmitForm(preferenceData);
        }}
        text="Finish"
        {...styles.submitButtonProps}
      />
    </Container>
  );
};

export default SystemConfiguration;

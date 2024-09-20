import React, { useContext, useEffect, useState } from 'react';

import { Brightness4, Brightness7 } from '@mui/icons-material';
import {
  Box,
  Container,
  FormControlLabel,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import styles from './styles';

import { updateUserTheme } from '@/redux/slices/userSlice';
import { ColorModeContext } from '@/theme/theme';

const SystemConfiguration = ({ onSubmit }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { toggleColorMode } = useContext(ColorModeContext);
  const userData = useSelector((state) => state.user.data);

  const [preferenceData, setPreferenceData] = useState({
    email: false,
    push: false,
    reminders: false,
    theme: false,
  });

  useEffect(() => {
    if (userData && userData.systemConfig) {
      setPreferenceData(userData.systemConfig);
    }
  }, [userData]);

  const handleToggle = (event) => {
    const { name, checked } = event.target;
    setPreferenceData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    if (name === 'theme') {
      toggleColorMode();
      dispatch(updateUserTheme(checked));
    }
  };

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
              icon={<Brightness4 />} // Dark icon
              checkedIcon={<Brightness7 />} // Light icon
            />
          }
          label="Dark Mode"
          sx={{
            marginBottom: '15px',
            justifyContent: 'space-between',
          }}
        />
      </Box>
      <GradientOutlinedButton
        bgcolor={theme.palette.Dark_Colors.Dark[1]}
        textColor={theme.palette.Common.White['100p']}
        clickHandler={onSubmitForm}
        text="Finish"
        {...styles.submitButtonProps}
      />
    </Container>
  );
};

export default SystemConfiguration;

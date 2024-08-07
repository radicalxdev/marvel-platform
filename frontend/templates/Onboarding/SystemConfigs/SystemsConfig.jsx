import { useState } from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import { useRouter } from 'next/router';

import styles from './styles';

const NotificationToggle = ({
  label,
  checked,
  onChange,
  labelStyle = styles.labelProps,
  currentStyles = styles,
  showDivider = true,
}) => (
  <>
    <Grid {...currentStyles.mainGrid}>
      <Typography {...labelStyle}>{label}</Typography>
      <Box {...currentStyles.boxSwitch}>
        <Switch
          checked={checked}
          onChange={onChange}
          size="large"
          {...currentStyles.switch}
        />
      </Box>
    </Grid>
    {showDivider && <Divider {...currentStyles.divider} />}
  </>
);

const SystemConfigs = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [reminders, setReminders] = useState(false);
  const [theme, setTheme] = useState(false);

  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding/3');
  };

  const handleSwitchChange = (setState, value) => {
    setState(value);
  };

  const renderTitle = () => (
    <Grid {...styles.titleGrid}>
      <Typography {...styles.titleProps}>System Configurations</Typography>
      <Typography {...styles.descriptionProps}>
        We need some permissions to get you started
      </Typography>
    </Grid>
  );

  const renderSubmitButton = () => (
    <Grid>
      <Button onClick={handleNext} {...styles.buttonProps}>
        Finish
      </Button>
    </Grid>
  );

  const renderEmailNotifications = () => (
    <NotificationToggle
      label="Enable Email Notifications"
      checked={emailNotifications}
      onChange={(e) =>
        handleSwitchChange(
          setEmailNotifications,
          e.target.checked,
          'Email Notifications'
        )
      }
    />
  );

  const renderPushNotifications = () => (
    <NotificationToggle
      label="Enable Push Notifications"
      checked={pushNotifications}
      onChange={(e) =>
        handleSwitchChange(
          setPushNotifications,
          e.target.checked,
          'Push Notifications'
        )
      }
    />
  );

  const renderReminders = () => (
    <NotificationToggle
      label="Enable Reminders"
      checked={reminders}
      onChange={(e) =>
        handleSwitchChange(setReminders, e.target.checked, 'Reminders')
      }
    />
  );

  const renderTheme = () => (
    <NotificationToggle
      label="Theme Selection"
      checked={theme}
      onChange={(e) => handleSwitchChange(setTheme, e.target.checked, 'Theme')}
      currentStyles={styles}
      showDivider={false}
    />
  );

  return (
    <Grid>
      {renderTitle()}
      {renderEmailNotifications()}
      {renderPushNotifications()}
      {renderReminders()}
      {renderTheme()}
      {renderSubmitButton()}
    </Grid>
  );
};

export default SystemConfigs;

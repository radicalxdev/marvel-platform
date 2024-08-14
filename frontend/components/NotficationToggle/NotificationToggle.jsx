import { Box, Divider, Grid, Switch, Typography } from '@mui/material';

import styles from './styles';

const NotificationToggle = ({
  label,
  checked,
  onChange,
  labelStyle = styles.labelProps,
  currentStyles = styles,
  showDivider = true,
}) => {
  return (
    <>
      <Grid {...currentStyles.mainGrid}>
        <Typography {...labelStyle}>{label}</Typography>
        <Box {...currentStyles.boxSwitch}>
          <Switch
            checked={checked}
            onChange={onChange}
            {...currentStyles.switch}
          />
        </Box>
      </Grid>
      {showDivider && <Divider {...currentStyles.divider} />}
    </>
  );
};

export default NotificationToggle;

import { useState } from 'react';

import { Grid, Typography, useTheme } from '@mui/material';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import ChangePassword from './ChangePassword';
import ProfileForm from './ProfileForm';

import styles from './styles';

/**
 * Renders the settings component.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.open - Determines if the is open.
 * @param {function} props.handleCloseSettings - The function to close the settings.
 * @return {JSX.Element} The rendered settings component.
 */
const Settings = () => {
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const theme = useTheme();

  const togglePasswordModal = () => setOpenPasswordModal((prev) => !prev);

  const renderProfile = () => {
    return (
      <Grid {...styles.profileGridProps}>
        <Grid {...styles.titleGridProps}>
          <Typography {...styles.titleProps}>Settings</Typography>
        </Grid>
        <Grid {...styles.profileHeaderGridProps}>
          <Typography {...styles.profileHeaderProps}>User Profile</Typography>
        </Grid>
        <Grid {...styles.profileFormGridProps}>
          <ProfileForm />
        </Grid>
      </Grid>
    );
  };

  const renderChangePassword = () => {
    return (
      <Grid {...styles.passwordGridProps}>
        <Typography {...styles.passwordHeaderProps}>Change Password</Typography>
        <Typography {...styles.passwordBodyProps}>
          Your RadicalX account is a treasure trove of insights and
          collaborations. Reinforce its barrier by choosing a new password,
          enhancing security and peace of mind.
        </Typography>
        <GradientOutlinedButton
          color="green2"
          text="Change Password"
          inverted
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          clickHandler={togglePasswordModal}
          {...styles.secondaryButtonProps}
        />
      </Grid>
    );
  };

  return (
    <Grid {...styles.cardGridProps}>
      {renderProfile()}
      {renderChangePassword()}
      <ChangePassword
        open={openPasswordModal}
        handleCloseModal={togglePasswordModal}
      />
    </Grid>
  );
};

export default Settings;

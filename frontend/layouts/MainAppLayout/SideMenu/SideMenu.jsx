import { LogoutOutlined } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';

import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

import KAIAvatar from '@/assets/svg/KAIAvatar.svg';

import ROUTES from '@/constants/routes';

import NavMenu from '../NavMenu';

import styles from './styles';

import { auth } from '@/redux/store';

/**
 * Renders the Side Menu.
 *
 * @return {ReactNode} The rendered Side Menu.
 */
const SideMenu = () => {
  const router = useRouter();

  const handleSignOutUser = () => {
    signOut(auth);
  };

  const renderLogo = () => {
    return (
      <Grid onClick={() => router.push(ROUTES.HOME)} {...styles.logoGridProps}>
        <Grid {...styles.logoImageGridProps}>
          <KAIAvatar />
        </Grid>
        <Grid {...styles.titleGridProps}>
          <Typography {...styles.subtitleProps}>
            AI Teaching Assistant
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderProfileImage = () => {
    return (
      <Grid {...styles.profileImageGridProps}>
        <Grid {...styles.logoImageGridProps}>
          <KAIAvatar />
        </Grid>
        <Grid {...styles.titleGridProps}>
          <Typography {...styles.subtitleProps} color="#9E94A5">
            Alysa Myers
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderLogout = () => {
    return (
      <Grid {...styles.logoutGridProps}>
        <Button
          onClick={handleSignOutUser}
          endIcon={
            <LogoutOutlined
              sx={{
                background: '#24272F',
                borderRadius: '6px',
                height: '24px',
                width: '24px',
              }}
            />
          }
          {...styles.logoutButtonProps}
        />
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderLogo()}
      <NavMenu />
      {renderProfileImage()}
      {renderLogout()}
    </Grid>
  );
};

export default SideMenu;

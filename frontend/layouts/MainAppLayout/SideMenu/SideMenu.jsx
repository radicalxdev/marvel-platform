import { LogoutOutlined } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';

import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

import MarvelAILogo from '@/assets/svg/MarvelAIFrame.svg';

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
          <MarvelAILogo />
        </Grid>
      </Grid>
    );
  };

  const renderLogout = () => {
    return (
      <Grid {...styles.logoutGridProps}>
        <Button
          onClick={handleSignOutUser}
          startIcon={<LogoutOutlined />}
          {...styles.logoutButtonProps}
        >
          Logout
        </Button>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderLogo()}
      <NavMenu />
      {renderLogout()}
    </Grid>
  );
};

export default SideMenu;

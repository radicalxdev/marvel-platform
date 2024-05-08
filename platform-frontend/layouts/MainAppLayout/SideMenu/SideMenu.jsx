import { BookOutlined } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';

import { useRouter } from 'next/router';

import LargeLogo from '@/assets/svg/Radical_AI.svg';

import ROUTES from '@/constants/routes';

import NavMenu from '../NavMenu';

import styles from './styles';

/**
 * Renders the Header component with the given props.
 *
 * @return {ReactNode} The rendered Header component.
 */
const SideMenu = () => {
  const router = useRouter();

  const renderLogo = () => {
    return (
      <Grid onClick={() => router.push(ROUTES.HOME)} {...styles.logoGridProps}>
        <LargeLogo />
      </Grid>
    );
  };

  const renderLogout = () => {
    return (
      <Grid {...styles.logoutGridProps}>
        <Button
          onClick={() => {}}
          startIcon={<BookOutlined />}
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

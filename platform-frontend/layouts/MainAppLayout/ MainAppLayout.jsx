import { useEffect } from 'react';

import { Grid, useMediaQuery } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import AppDisabled from '@/components/AppDisabled';

import Loader from '@/components/Loader';
import StatisticChip from '@/components/StatisticChip';

import CoinIcon from '@/assets/svg/coin2.svg';
import DiamondIcon from '@/assets/svg/diamond2.svg';
import LargeLogo from '@/assets/svg/Radical_AI.svg';

import ROUTES from '@/constants/routes';

import AccountAvatar from './AccountAvatar';
import Header from './Header';
import MobileNavMenu from './MobileNavMenu';
import NavMenu from './NavMenu';

import styles from './styles';
import SystemAlert from './SystemAlert';

import { setLoading } from '@/redux/slices/authSlice';

/**
 * Renders the main application layout.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child components to render.
 * @param {Object} props.extraContentProps - The additional properties for the extra content.
 * @param {boolean} props.isPaymentPage - Indicates if the page is a payment page.
 * @param {boolean} props.removeNav - Indicates if the navigation should be removed.
 * @param {string} props.backButtonUrl - The URL to navigate to when the back button is clicked.
 * @param {boolean} props.isMissionWorkspace - Indicates if the workspace is a mission workspace.
 * @param {boolean} props.isLessonWorkspace - Indicates if the workspace is a lesson workspace.
 * @param {boolean} props.isHackathonWorskpace - Indicates if the workspace is a hackathon workspace.
 * @return {ReactNode} The rendered main application layout.
 */
const MainAppLayout = (props) => {
  const { children, extraContentProps, isPaymentPage, removeNav } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const isTabletScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('laptop')
  );

  const alertActive = false;
  const isLoading = auth.loading || !user.data || !auth.data;
  const shouldShowFaviconLogo = isPaymentPage;
  const disableNavMenu = true;

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  if (isLoading) return <Loader />;

  const renderLargeLogo = () => {
    if (isTabletScreen || shouldShowFaviconLogo) return null;
    return <LargeLogo />;
  };

  const renderCompanyLogo = () => {
    return (
      <Grid onClick={() => router.push(ROUTES.HOME)} {...styles.logoGridProps}>
        {renderLargeLogo()}
      </Grid>
    );
  };

  const renderMenu = () => {
    if (disableNavMenu) return null;

    if (isPaymentPage && isTabletScreen) return null;

    return (
      <>
        <MobileNavMenu />
        <NavMenu />
      </>
    );
  };

  const renderLogout = () => {
    return (
      <Grid {...styles.accountDetailsGridProps}>
        <Grid item>
          <StatisticChip
            stat={user?.data?.diamonds}
            icon={<DiamondIcon />}
            {...styles.diamondProps}
          />
        </Grid>
        <Grid item>
          <StatisticChip
            stat={user?.data?.coins}
            icon={<CoinIcon />}
            {...styles.coinsProps}
          />
        </Grid>
        <AccountAvatar />
        {/* Place the logout UI here */}
      </Grid>
    );
  };

  const renderHead = () => {
    return (
      <Head>
        <title>Kai AI</title>
      </Head>
    );
  };

  const HeaderItems = {
    logo: renderCompanyLogo(),
    menu: renderMenu(),
    logout: renderLogout(),
  };

  const renderApp = () => {
    return (
      <>
        <SystemAlert active={alertActive} />
        {!removeNav && <Header {...HeaderItems} />}
        <Grid {...styles.contentGridProps(extraContentProps)}>{children}</Grid>
      </>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderHead()}
      {isTabletScreen && <AppDisabled head={renderHead()} />}
      {!isTabletScreen && renderApp()}
    </Grid>
  );
};

export default MainAppLayout;

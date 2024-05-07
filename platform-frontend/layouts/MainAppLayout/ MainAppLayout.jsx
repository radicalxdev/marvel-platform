import { useEffect } from 'react';

import { ArrowBack } from '@mui/icons-material';
import { Button, Grid, useMediaQuery } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import AppDisabled from '@/components/AppDisabled';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import Loader from '@/components/Loader';
import StatisticChip from '@/components/StatisticChip';

import ArrowLeft from '@/assets/svg/arrowLeftGreenGradient.svg';
import CoinIcon from '@/assets/svg/coin2.svg';
import DiamondIcon from '@/assets/svg/diamond2.svg';
import LargeLogo from '@/assets/svg/Radical_AI.svg';
import FaviconLogo from '@/assets/svg/RadicalXFavicon.svg';
import RadicalXMobileLogo from '@/assets/svg/RadicalXMobileLogo';

import ROUTES from '@/constants/routes';

import AccountAvatar from './AccountAvatar';
import Header from './Header';
import MobileNavMenu from './MobileNavMenu';
import NavMenu from './NavMenu';

import styles from './styles';
import SystemAlert from './SystemAlert';
import WorkspaceHeader from './WorkspaceHeader';

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
  const {
    children,
    extraContentProps,
    isPaymentPage,
    removeNav,
    backButtonUrl,
    isMissionWorkspace,
    isLessonWorkspace,
    isHackathonWorskpace,
  } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    query: { questId, missionId, level },
  } = router;

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const isTabletScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('laptop')
  );

  const isMobileSmallScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('mobile')
  );

  const alertActive = false;
  const isLoading = auth.loading || !user.data || !auth.data;
  const shouldShowFaviconLogo = isPaymentPage;
  const disableNavMenu = true;

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  if (isLoading) return <Loader />;

  const handleRouteToQuiz = () => router.push(`/${questId}/${level}`);
  const handleGoToDashboard = () => router.push(`/${missionId}`);

  const handleClick = () => router.push(backButtonUrl);

  const setHeaderHeight = () => {
    if (alertActive) return 164;
    if (isMissionWorkspace || isLessonWorkspace || isHackathonWorskpace)
      return 72;
    if (removeNav) return 0;
    return 96;
  };

  const setWorkspaceButtonTitle = () => {
    if (isHackathonWorskpace) return 'Back Home';
    if (isMissionWorkspace) return 'Back To Mission';
    return 'Quest Dashboard';
  };

  const renderMobileLogo = () => {
    if (isTabletScreen && !shouldShowFaviconLogo && !isHackathonWorskpace)
      return (
        <RadicalXMobileLogo
          width={isMobileSmallScreen ? '28' : '36'}
          height={isMobileSmallScreen ? '28' : '36'}
        />
      );
    return null;
  };

  const renderLargeLogo = () => {
    if (isTabletScreen || shouldShowFaviconLogo) return null;
    return <LargeLogo />;
  };

  const renderBackButton = () => {
    if (isMissionWorkspace || isLessonWorkspace || isHackathonWorskpace)
      return (
        <Grid {...styles.backButtonGridProps}>
          <Button
            variant="outlined"
            onClick={handleGoToDashboard}
            startIcon={
              <ArrowBack
                sx={{
                  color: (theme) => theme.palette.Background.gradient.grey,
                }}
              />
            }
            {...styles.backToMissionButtonProps}
          >
            {setWorkspaceButtonTitle()}
          </Button>
        </Grid>
      );

    return (
      <Grid {...styles.backButtonGridProps}>
        <GradientOutlinedButton
          icon={<ArrowLeft />}
          text="Back"
          clickHandler={handleClick}
          {...styles.backButtonProps}
        />
        <Grid
          onClick={() => router.push(ROUTES.HOME)}
          {...styles.faviconGridProps}
        >
          <FaviconLogo />
        </Grid>
      </Grid>
    );
  };

  const renderCompanyLogo = () => {
    return (
      <Grid onClick={() => router.push(ROUTES.HOME)} {...styles.logoGridProps}>
        {renderMobileLogo()}
        {renderLargeLogo()}
      </Grid>
    );
  };

  const renderMenu = () => {
    const isWorkspace =
      isMissionWorkspace || isLessonWorkspace || isHackathonWorskpace;

    if (disableNavMenu && !isWorkspace) return null;

    if (isWorkspace)
      return (
        <WorkspaceHeader
          isHackathonWorskpace={isHackathonWorskpace}
          isLessonWorkspace={isLessonWorkspace}
          isMissionWorkspace={isMissionWorkspace}
        />
      );

    if (isPaymentPage && isTabletScreen) return null;

    return (
      <>
        <MobileNavMenu />
        <NavMenu />
      </>
    );
  };

  const renderAccountDetails = () => {
    if (isMissionWorkspace) return <Grid {...styles.backButtonGridProps} />;

    if (isLessonWorkspace)
      return (
        <Grid {...styles.backButtonGridProps}>
          <Button onClick={handleRouteToQuiz} {...styles.startQuizButtonProps}>
            Start Quiz
          </Button>
        </Grid>
      );

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
      </Grid>
    );
  };

  const renderHead = () => {
    return (
      <Head>
        <title>Radical AI</title>
      </Head>
    );
  };

  const renderContent = () => {
    return (
      <Grid {...styles.contentGridProps(extraContentProps, setHeaderHeight())}>
        {children}
      </Grid>
    );
  };

  const HeaderItems = {
    back: renderBackButton(),
    logo: renderCompanyLogo(),
    menu: renderMenu(),
    height: setHeaderHeight(),
    account: renderAccountDetails(),
    isPaymentPage,
    isMissionWorkspace,
    isLessonWorkspace,
    isHackathonWorskpace,
  };

  const renderApp = () => {
    return (
      <>
        <SystemAlert active={alertActive} />
        {!removeNav && <Header {...HeaderItems} />}
        {renderContent()}
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

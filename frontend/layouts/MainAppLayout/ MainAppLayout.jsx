import { useEffect } from 'react';

import { Grid, useMediaQuery } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import AppDisabled from '@/components/AppDisabled';
import Loader from '@/components/Loader';

import ROUTES from '@/constants/routes';

import SideMenu from './SideMenu';
import styles from './styles';

import { setLoading } from '@/redux/slices/authSlice';

/**
 * Renders the main application layout.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child components to render.
 * @param {Object} props.extraContentProps - The additional properties for the extra content.
 * @param {boolean} props.isToolPage - Indicates if the layout is for a tool page.
 * @return {ReactNode} The rendered main application layout.
 */
const MainAppLayout = (props) => {
  const { children, extraContentProps, isToolPage } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const isTabletScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('laptop')
  );

  const isLoading = auth.loading || !user.data || !auth.data;

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  if (isLoading) return <Loader />;

  const renderHead = () => (
    <Head>
      <title>Marvel AI</title>
    </Head>
  );

  const renderAppContent = () => (
    <Grid {...styles.contentGridProps(extraContentProps, isToolPage)}>
      {children}
    </Grid>
  );

  const renderApp = () => {
    const isErrorPage = [
      ROUTES.FOUR_OH_FOUR_ERROR,
      ROUTES.SERVER_ERROR,
    ].includes(router.pathname);

    return (
      <>
        {!isErrorPage && <SideMenu />}
        {renderAppContent()}
      </>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderHead()}
      {isTabletScreen ? <AppDisabled head={renderHead()} /> : renderApp()}
    </Grid>
  );
};

export default MainAppLayout;

import React, { useEffect, useState } from 'react';

import { Grid, useMediaQuery } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import useNetworkStatus from '@/hooks/useNetworkStatus';

import AppDisabled from '@/components/AppDisabled';
import Loader from '@/components/Loader';

import ROUTES from '@/constants/routes';

import SideMenu from './SideMenu';
import styles from './styles';

import NetworkError from '@/pages/network-error';
import { setLoading } from '@/redux/slices/authSlice';

const MainAppLayout = (props) => {
  const { children, extraContentProps, isToolPage } = props;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const isTabletScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('laptop')
  );

  const { isOnline } = useNetworkStatus();
  const [isErrorPage, setIsErrorPage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const isError =
      router.pathname === ROUTES.APP_ERROR ||
      router.pathname === ROUTES.NETWORK_ERROR ||
      router.pathname === ROUTES.FOUR_OH_FOUR_ERROR;

    setIsErrorPage(isError);
  }, [router.pathname]);

  const renderHead = () => (
    <Head>
      <title>Kai AI</title>
    </Head>
  );

  const renderSideMenu = () => {
    return !isErrorPage && isOnline && <SideMenu />;
  };

  if (!isOnline) {
    return <NetworkError />;
  }

  const isLoading = auth.loading || !user.data || !auth.data;

  if (isLoading) return <Loader />;

  return (
    <Grid {...styles.mainGridProps}>
      {renderHead()}
      {isTabletScreen && <AppDisabled head={renderHead()} />}
      {!isTabletScreen && (
        <>
          {renderSideMenu()}
          <Grid {...styles.contentGridProps(extraContentProps, isToolPage)}>
            {children}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default MainAppLayout;

import React from 'react';

import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppDisabled from '@/components/AppDisabled';

import ProgressBar from './ProgressBar';
import styles from './styles';

const OnboardingLayout = (props) => {
  const { children } = props;
  const isTabletScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('laptop')
  );
  const router = useRouter();
  const { onboardingId } = router.query;

  const renderHead = () => (
    <Head>
      <title>Kai AI</title>
    </Head>
  );

  const renderApp = () => (
    <Grid {...styles.contentGrid}>
      <Grid>{children}</Grid>
    </Grid>
  );

  return (
    <Grid {...styles.mainGrid}>
      <Grid {...styles.progressBarContainer}>
        <ProgressBar currentStep={Number(onboardingId)} />
      </Grid>
      {renderHead()}
      {isTabletScreen && <AppDisabled head={renderHead()} />}
      {!isTabletScreen && renderApp()}
    </Grid>
  );
};

export default OnboardingLayout;

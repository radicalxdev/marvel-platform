import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';

import { useRouter } from 'next/router';

import AppDisabled from '@/components/AppDisabled';

import ProgressBar from './ProgressBar';
import styles from './styles';

const onboardingSteps = [
  { label: 'Welcome' },
  { label: 'Profile Setup' },
  { label: 'System Configurations' },
  { label: 'Final Steps' },
];

const OnboardingLayout = (props) => {
  const router = useRouter();
  const { children } = props;
  const isTabletScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('laptop')
  );

  const { onboardingId } = router.query;

  const shouldHideProgressBar = Number(onboardingId) === onboardingSteps.length;

  const renderHead = () => (
    <Head>
      <title>Kai AI</title>
    </Head>
  );

  const renderApp = () => <Grid {...styles.contentGrid}>{children}</Grid>;

  return (
    <Grid {...styles.mainGrid}>
      <Grid {...styles.progressBarContainer}>
        {!shouldHideProgressBar && (
          <ProgressBar onboardingSteps={onboardingSteps} />
        )}
      </Grid>
      {renderHead()}
      {isTabletScreen && <AppDisabled head={renderHead()} />}
      {!isTabletScreen && renderApp()}
    </Grid>
  );
};

export default OnboardingLayout;

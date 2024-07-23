import { Grid, useMediaQuery } from '@mui/material';
import Head from 'next/head';

import AppDisabled from '@/components/AppDisabled';

import ProgressBar from './ProgressBar';

const OnboardingLayout = (props) => {
  const { children } = props;
  const isTabletScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('laptop')
  );

  const renderHead = () => {
    return (
      <Head>
        <title>Kai AI</title>
      </Head>
    );
  };

  const renderApp = () => {
    return (
      <>
        <ProgressBar />
        <Grid>{children}</Grid>
      </>
    );
  };

  return (
    <Grid>
      {renderHead()}
      {isTabletScreen && <AppDisabled head={renderHead()} />}
      {!isTabletScreen && renderApp()}
    </Grid>
  );
};

export default OnboardingLayout;

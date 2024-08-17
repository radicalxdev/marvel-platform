import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import ProgressBarMenu from '@/components/ProgressBarMenu';

import styles from './styles';

const OnboardingLayout = (props) => {
  const { children } = props;
  const [activeStep, setActiveStep] = useState(0);

  // const renderHead = () => {
  //   return (
  //     <Grid {...styles.headGridProps}>
  //       <ProgressBarMenu activeStep={activeStep} />
  //     </Grid>
  //   );
  // };
  const renderApp = () => {
    return <Grid {...styles.appGridProps}>{children}</Grid>;
  };
  return (
    <Grid {...styles.mainGridProps}>
      {/* {renderHead()} */}
      {renderApp()}
    </Grid>
  );
};

export default OnboardingLayout;

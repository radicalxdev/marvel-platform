import { useState } from 'react';

import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

import CheckList from '../CheckList';

import styles from './styles';

const ProgressBar = ({ onboardingSteps }) => {
  const currentStep = useSelector((state) => state.onboarding.step);
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {expanded && <div style={{ ...styles.blurredBackground }} />}
      <Grid {...styles.mainGridProps}>
        <CheckList
          expanded={expanded}
          handleChange={handleChange}
          currentStep={currentStep}
          onboardingSteps={onboardingSteps}
        />
      </Grid>
    </>
  );
};

export default ProgressBar;

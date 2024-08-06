import { useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Step,
  StepButton,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  useStepContext,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

import styles from './styles';

const CustomStepConnector = () => {
  const { active, completed } = useStepContext();
  return <StepConnector {...styles.stpConnector(active, completed)} />;
};

const StepIcon = ({ active, completed }) => (
  <Grid {...styles.gridProps}>
    <Grid {...styles.containerProps}>
      {completed ? (
        <Grid {...styles.stepCircleCompleted} />
      ) : (
        <Grid {...styles.getStepCircleStyle(active)} />
      )}
    </Grid>
  </Grid>
);

const CustomStepper = ({ currentStep, onboardingSteps }) => (
  <Stepper
    activeStep={currentStep}
    connector={<CustomStepConnector />}
    {...styles.stepperProps}
  >
    {onboardingSteps.map((step, index) => (
      <Step key={index}>
        <StepButton>
          <StepLabel StepIconComponent={StepIcon} />
        </StepButton>
      </Step>
    ))}
  </Stepper>
);

const CustomAccordion = ({
  expanded,
  handleChange,
  currentStep,
  onboardingSteps,
}) => (
  <Accordion
    expanded={expanded === 'panel'}
    onChange={handleChange('panel')}
    {...styles.accordionProps}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon {...styles.expandMoreIconProps} />}
      {...styles.accordionSummaryProps}
    >
      <CustomStepper
        currentStep={currentStep}
        onboardingSteps={onboardingSteps}
      />
    </AccordionSummary>
    <AccordionDetails {...styles.accordionDetailsProps}>
      {onboardingSteps.map((step, key) => (
        <Grid key={key} {...styles.accordionDetailsGridProps}>
          <StepIcon
            active={key === currentStep}
            completed={key < currentStep}
          />
          <Typography key={key} {...styles.stepLabelProps}>
            {step.label}
          </Typography>
        </Grid>
      ))}
    </AccordionDetails>
  </Accordion>
);

const ProgressBar = ({ onboardingSteps }) => {
  const currentStep = useSelector((state) => state.onboarding.step);
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {expanded && <div style={styles.blurredBackground} />}
      <Grid {...styles.mainGridProps}>
        <CustomAccordion
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

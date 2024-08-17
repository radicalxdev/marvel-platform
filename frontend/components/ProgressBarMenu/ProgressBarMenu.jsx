/* eslint-disable */
import { useState } from 'react';

import { Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';

import { styled } from '@mui/material/styles';

import StatusIcon from '@/templates/WelcomeScreen/StatusIcon';

import ArrowDropDown from '@/assets/svg/DropDown.svg';

import styles from './styles.js';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    // top: 8,
    // left: "calc(-50% + 16px)",
    // right: "calc(50% + 16px)",
    width: 140,
    position: 'static',
    marginRight: 8,
    marginLeft: 8,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? '#444154' : '#eaeaf0',
    borderTopWidth: 8,
    borderRadius: 11,
    // display: 'flex'
  },
}));
const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
}));
function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <StatusIcon status="done" />
      ) : active ? (
        <StatusIcon status="doing" />
      ) : (
        <StatusIcon status="undo" />
      )}
    </QontoStepIconRoot>
  );
}

/**
 * Renders Stepmenu List
 *
 */
const ProgressBarMenu = (props) => {
  const { steps: propsSteps, activeStep } = props;

  const [steps, setSteps] = useState(
    propsSteps || [
      'Welcome',
      'Profile Setup',
      'System Configuration',
      'Final Steps',
    ]
  );
  const [isExpand, setIsExpand] = useState(false);

  return (
    <Grid {...styles.mainGridProps}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label} {...styles.stepItemProps}>
            <StepLabel
              StepIconComponent={QontoStepIcon}
              {...styles.stepLabelProps}
            >
              {}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      &emsp;
      <ArrowDropDown cursor="pointer" onClick={() => {}} />
    </Grid>
  );
};

export default ProgressBarMenu;

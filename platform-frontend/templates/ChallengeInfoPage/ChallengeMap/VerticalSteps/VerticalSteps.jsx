import {
  Grid,
  Step,
  StepConnector,
  Stepper,
  styled,
  Typography,
} from '@mui/material';
import { stepConnectorClasses } from '@mui/material/StepConnector';

import Trophy from '@/assets/svg/trophy.svg';

import STATUS from '@/constants/mission';

import ChallengeContent from './ChallengeContent';
import ChallengeStepLabel from './ChallengeStepLabel';
import { CustomStepLabel } from './ChallengeStepLabel/ChallengeStepLabel';

import styles from './styles';

const CustomStepConnnector = styled((props) => (
  <StepConnector
    sx={{ ml: { laptop: '21px', desktop: '23px', desktopMedium: '25px' } }}
    {...props}
  />
))(({ theme }) => ({
  span: {
    borderLeftWidth: '3px',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.Background.green,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.Background.green,
    },
  },
}));

const VerticalSteps = (props) => {
  const {
    activeStep,
    challengeDoc,
    challengeDetails,
    practiceStatus,
    isActive: challengeActive,
    isPreEnroll,
    challengeIsComplete,
    startMissionTask,
  } = props;

  const challengeIsInProgress = !isPreEnroll && challengeActive;

  const challengeMapDetails = challengeDetails?.data?.filter(
    (detail) => detail.order === 2
  )?.[0].items;

  const renderChallengeCompleteStep = () => {
    const renderCompleteIcon = () => {
      return (
        <Grid
          bgcolor={
            challengeIsComplete && challengeActive ? '#FFC700' : '#757575'
          }
          {...styles.completeIconGridProps}
        >
          <Trophy />
        </Grid>
      );
    };

    return (
      <Step
        active={challengeIsComplete && challengeActive}
        complete={challengeIsComplete && challengeActive}
        key="Challenge Complete"
      >
        <CustomStepLabel icon={renderCompleteIcon()}>
          <Typography {...styles.challengeCompleteProps}>
            Mission Complete
          </Typography>
        </CustomStepLabel>
      </Step>
    );
  };

  return (
    <Grid {...styles.stepperGridProps}>
      <Stepper
        activeStep={challengeIsInProgress ? activeStep : -1}
        connector={<CustomStepConnnector />}
        orientation="vertical"
        sx={{ width: '100%' }}
      >
        {challengeMapDetails.map((step, index) => {
          // check if step is complete
          const isComplete =
            [STATUS.COMPLETED, STATUS.INCOMPLETE].includes(
              practiceStatus[index + 1]
            ) && challengeIsInProgress;

          // check if step is active
          const isActive =
            practiceStatus[index + 1] === STATUS.IN_PROGRESS &&
            challengeIsInProgress;

          const isLastStep = index + 1 === challengeMapDetails?.length;

          // check if step is to be started next
          const start =
            [STATUS.COMPLETED, STATUS.INCOMPLETE].includes(
              practiceStatus[index + 1 - 1]
            ) &&
            practiceStatus[index + 1] === STATUS.NOT_STARTED &&
            challengeIsInProgress;

          return (
            <Step
              id={`level-${index + 1}`}
              expanded
              active={isActive && challengeIsInProgress}
              completed={isComplete}
              key={index}
            >
              <ChallengeStepLabel
                active={isActive}
                complete={isComplete}
                start={start}
                details={step}
                type={challengeDoc?.type}
                isLastStep={isLastStep}
                challengeActive={challengeIsInProgress}
                step={index + 1}
                startMissionTask={startMissionTask}
              />
              <ChallengeContent
                active={isActive}
                complete={isComplete}
                start={start}
                challengeActive={challengeIsInProgress}
                challengeDoc={challengeDoc}
                details={step}
                step={index + 1}
              />
            </Step>
          );
        })}
        {renderChallengeCompleteStep()}
      </Stepper>
    </Grid>
  );
};

export default VerticalSteps;

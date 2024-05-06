import { Grid, Typography } from '@mui/material';

import VerticalSteps from './VerticalSteps';

import STATUS from '@/constants/mission';

import styles from './styles';

const ChallengeMap = (props) => {
  const {
    isPreEnroll,
    challengeDetails,
    challengeDoc,
    totalLevels,
    practiceStatus,
    isActive,
    ...challengeMapProps
  } = props;

  const activeStep = Object.keys(practiceStatus)?.find(
    (key) => practiceStatus[key] === STATUS.IN_PROGRESS
  );

  const challengeIsComplete = Object.values(practiceStatus)?.every(
    (status) => status === STATUS.COMPLETED || status === STATUS.INCOMPLETE
  );

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>Mission Map</Typography>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      <VerticalSteps
        activeStep={activeStep - 1}
        challengeDoc={challengeDoc}
        challengeDetails={challengeDetails}
        totalLevels={totalLevels}
        challengeIsComplete={challengeIsComplete}
        isActive={isActive}
        isPreEnroll={isPreEnroll}
        practiceStatus={practiceStatus}
        {...challengeMapProps}
      />
    </Grid>
  );
};

export default ChallengeMap;

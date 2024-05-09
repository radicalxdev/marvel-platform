import { useState } from 'react';

import { Button, Grid, Typography } from '@mui/material';
import moment from 'moment';

import Certificate from './Certificate';
import ChallengeInfoHeader from './ChallengeInfoHeader';
import ChallengeMap from './ChallengeMap';
import ChallengeScenario from './ChallengeScenario';
import IntroVideo from './IntroVideo';

import styles from './styles';

import sharedStyles from '@/styles/shared/sharedStyles';

/**
 * Renders the Challenge Info Page component, which displays information about a specific challenge.
 *
 * @param {Object} props - The properties object containing the following:
 *   @param {object} challengeDoc - The document object containing details about the challenge.
 *   @param {object} challengeDetails - Additional details about the challenge.
 *   @param {object} enrolledChallenge - Information about the enrolled challenge.
 *   @param {boolean} isMission - A boolean indicating whether the challenge is a mission.
 *   @param {string} totalLevels - The total number of levels in the challenge.
 *   @param {boolean} isPreEnroll - A boolean indicating whether the user has pre-enrolled in the challenge.
 *   @param {boolean} timeUp - A boolean indicating whether the time for the challenge has expired.
 *   @param {object} challengeMapProps - Additional properties related to the challenge map.
 *
 * @return {JSX.Element} The rendered Challenge Info Page component.
 */ const ChallengeInfoPage = (props) => {
  const {
    challengeDoc,
    challengeDetails,
    enrolledChallenge,
    isMission,
    isPreEnroll,
    timeUp,
    ...challengeMapProps
  } = props;

  const challengeMapDetails = challengeDetails?.data?.filter(
    (detail) => detail.order === 2
  )?.[0]?.items;

  const isMissionComplete = isMission && challengeMapProps?.isCompleted;
  const endTime = moment(enrolledChallenge?.endTime || Date.now()).format(
    'MMMM Do YYYY'
  );

  const [open, setOpen] = useState(false);

  const toggleCertificate = () => setOpen((prev) => !prev);

  const renderHeader = () => (
    <ChallengeInfoHeader
      isPreEnroll={isPreEnroll}
      challengeDoc={challengeDoc}
      currentLevel={challengeMapProps?.currentLevel}
      nextLevel={challengeMapProps?.nextLevel}
      completed={isMissionComplete}
      totalLevels={challengeMapDetails?.length}
      isActive={!!enrolledChallenge}
      challengeDetails={challengeDetails?.data}
      timeUp={timeUp}
    />
  );

  const renderIntro = () => (
    <Grid {...styles.challengeIntroGridProps}>
      <ChallengeScenario
        details={challengeDetails?.data}
        challengeDoc={challengeDoc}
      />
      <IntroVideo challengeDoc={challengeDoc} />
    </Grid>
  );

  const renderCertificate = () => (
    <Grid {...styles.certficateGridProps}>
      <Grid {...styles.textGridProps}>
        <Typography {...styles.certificateTitleProps}>
          You’ve Finished this Mission!
        </Typography>
        <Typography {...styles.subtitleProps}>
          {`Congratulations! You finished this mission on ${endTime}.`}
        </Typography>
      </Grid>
      <Grid {...styles.buttonGridProps}>
        <Button onClick={toggleCertificate} {...styles.certificateButtonProps}>
          See Certificate
        </Button>
      </Grid>
      <Certificate
        open={open}
        toggleOpen={toggleCertificate}
        enrolledChallenge={enrolledChallenge}
      />
    </Grid>
  );

  const renderChallengeMap = () => {
    return (
      <ChallengeMap
        isPreEnroll={isPreEnroll}
        challengeDetails={challengeDetails}
        challengeDoc={challengeDoc}
        practiceStatus={challengeMapProps?.practiceStatus}
        isMissionComplete={isMissionComplete}
        totalLevels={challengeMapDetails?.length}
        isActive={!!enrolledChallenge}
        {...challengeMapProps}
      />
    );
  };

  return (
    <Grid {...sharedStyles.commonMainGridProps}>
      {renderHeader()}
      {!isMissionComplete && renderIntro()}
      {isMissionComplete && renderCertificate()}
      {renderChallengeMap()}
    </Grid>
  );
};

export default ChallengeInfoPage;

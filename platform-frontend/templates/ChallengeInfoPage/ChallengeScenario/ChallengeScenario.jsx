import { Grid, Typography } from '@mui/material';

import CHALLENGES from '@/constants/challenges';

import styles from './styles';

const ChallengeScenario = (props) => {
  const { details, challengeDoc } = props;

  const description = details[0]?.description;

  const setChallengeTitle = () => {
    if (challengeDoc?.type === CHALLENGES.QUEST) return 'Quest';
    if (challengeDoc?.type === CHALLENGES.MISSION) return 'Mission';
    if (challengeDoc?.type === CHALLENGES.HACKATHON) return 'Hackathon';
    return 'Journey';
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Grid {...styles.innerGridProps}>
        <Typography
          {...styles.titleProps}
        >{`${setChallengeTitle()} Scenario`}</Typography>
        <Typography {...styles.textProps}>{description}</Typography>
      </Grid>
    </Grid>
  );
};

export default ChallengeScenario;

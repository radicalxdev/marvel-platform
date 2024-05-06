import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import MissionChat from '../MissionChat';
import MissionInfo from './MissionInfo';
import HackathonOverview from './HackathonOverview';

import styles from './styles';

/**
 * Generates the workspace for a challenge.
 *
 * @param {Object} props - The properties passed to the function.
 * @param {Object} props.details - The details of the challenge.
 * @param {Object} props.challengeDoc - The documentation of the challenge.
 * @param {boolean} props.isHackathon - Indicates if the challenge is a hackathon.
 * @param {boolean} props.isLesson - Indicates if the challenge is a lesson.
 * @return {JSX.Element} The generated workspace for the challenge.
 */
const ChallengeWorkspace = (props) => {
  const {
    details,
    challengeDoc,
    isHackathon,
    isLesson,
    totalLevels,
    setIsSuccessScreen,
    levelComplete,
    practiceStatus,
  } = props;

  const router = useRouter();
  const {
    query: { level },
  } = router;

  const tasks = details[2]?.items;
  const taskStatus = practiceStatus[parseInt(level, 10)];

  return (
    <Grid {...styles.mainGridProps}>
      {isHackathon && <HackathonOverview challengeDoc={challengeDoc} />}
      {!isHackathon && (
        <MissionInfo
          tasks={tasks}
          isLesson={isLesson}
          totalLevels={totalLevels}
          taskStatus={taskStatus}
          setIsSuccessScreen={setIsSuccessScreen}
          levelComplete={levelComplete}
        />
      )}
      <MissionChat isHackathon={isHackathon} isLesson={isLesson} />
    </Grid>
  );
};

export default ChallengeWorkspace;

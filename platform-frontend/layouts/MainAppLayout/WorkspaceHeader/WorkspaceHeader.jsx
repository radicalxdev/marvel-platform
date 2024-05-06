import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Grid, Skeleton, Typography } from '@mui/material';
import { shimmerEffect, toBase64 } from '@/utils/MiscellaneousUtils';

import CHALLENGES from '@/constants/challenges';

import styles from './styles';

/**
 * Generates the header component for the workspace.
 *
 * @param {object} props - The properties passed to the component.
 * @param {boolean} props.isLessonWorkspace - Indicates if the workspace is a lesson workspace.
 * @param {boolean} props.isMissionWorkspace - Indicates if the workspace is a mission workspace.
 * @param {boolean} props.isHackathonWorskpace - Indicates if the workspace is a hackathon workspace.
 * @return {JSX.Element} - The generated header component.
 */
const WorkspaceHeader = (props) => {
  const { isLessonWorkspace, isMissionWorkspace, isHackathonWorskpace } = props;
  const {
    query: { hackathonId, missionId, questId, level },
  } = useRouter();

  const challengeType = () => {
    if (isHackathonWorskpace) return CHALLENGES.HACKATHON;
    if (isLessonWorkspace) return CHALLENGES.QUEST;
    return CHALLENGES.MISSION;
  };

  const { data, loading } = useSelector(
    (state) => state.challenges[challengeType()]
  );

  const currentChallenge = data?.find((challenge) => {
    if (isLessonWorkspace) return challenge.maskedId === questId;
    if (isMissionWorkspace) return challenge.maskedId === missionId;
    return challenge.maskedId === hackathonId;
  });

  const setChallengeItemName = () => {
    if (isHackathonWorskpace) return `${currentChallenge?.name}`;
    if (isLessonWorkspace) return `${currentChallenge?.name}: Lesson ${level}`;
    return `${currentChallenge?.name}: Task ${level}`;
  };

  const renderSkeleton = () => {
    return (
      <Grid {...styles.menuGridProps}>
        <Grid {...styles.logoGridProps}>
          <Skeleton {...styles.skeletonLogoProps} />
        </Grid>
        <Grid {...styles.headerTitleGridProps}>
          <Skeleton {...styles.skeletonTitleProps} />
        </Grid>
      </Grid>
    );
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.menuGridProps}>
        <Grid {...styles.logoGridProps}>
          <Image
            src={currentChallenge?.logo}
            {...styles.logoProps}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmerEffect(100, 100)
            )}`}
          />
        </Grid>
        <Grid {...styles.headerTitleGridProps}>
          <Typography {...styles.headerTitleProps}>
            {setChallengeItemName()}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {loading ? renderSkeleton() : renderTitle()}
    </Grid>
  );
};

export default WorkspaceHeader;

import { Divider, Grid, Skeleton } from '@mui/material';

import leaderListStyles from '../LeaderListItem/styles';
import styles from './styles';

/**
 * Renders a leader list item.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.leader - The leader object.
 * @param {number} props.index - The index of the leader.
 * @return {JSX.Element} The rendered leader list item.
 */
const LeaderListItemSkeleton = () => {
  const renderName = () => {
    return (
      <Grid item mobileSmall>
        <Skeleton
          width="calc(100% - 24px)"
          {...styles.skeletonLeaderNameProps}
        />
      </Grid>
    );
  };

  const renderAvatarIcon = () => {
    return (
      <Grid item mobileSmall="auto">
        <Skeleton {...styles.skeletonLeaderAvatarProps} />
      </Grid>
    );
  };

  const renderPosition = () => {
    return (
      <Grid item mobileSmall="auto">
        <Skeleton {...styles.skeletonLeaderPositionProps} />
      </Grid>
    );
  };

  const renderDivider = () => {
    return <Divider variant="fullWidth" />;
  };

  const renderUserDetails = () => {
    return (
      <Grid {...leaderListStyles.leaderDetailsGridProps}>
        {renderPosition()}
        {renderAvatarIcon()}
        {renderName()}
      </Grid>
    );
  };

  const renderCorrectAnswers = () => {
    return (
      <Grid {...leaderListStyles.correctAnswersGridProps}>
        <Skeleton width={100} {...styles.skeletonLeaderNameProps} />
      </Grid>
    );
  };

  const renderTime = () => {
    return (
      <Grid {...leaderListStyles.durationGridProps}>
        <Skeleton width={100} {...styles.skeletonLeaderNameProps} />
      </Grid>
    );
  };

  const renderScore = () => {
    return (
      <Grid {...leaderListStyles.leaderScoreGridProps}>
        <Skeleton {...styles.skeletonLeaderScoreProps} />
      </Grid>
    );
  };

  return (
    <Grid {...leaderListStyles.leaderItemGridProps}>
      <Grid {...leaderListStyles.leaderItemDetailsGridProps}>
        {renderUserDetails()}
        {renderCorrectAnswers()}
        {renderTime()}
        {renderScore()}
      </Grid>
      <Grid {...leaderListStyles.dividerGridProps}>{renderDivider()}</Grid>
    </Grid>
  );
};

export default LeaderListItemSkeleton;

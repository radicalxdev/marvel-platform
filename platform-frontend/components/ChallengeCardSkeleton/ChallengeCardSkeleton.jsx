import { Grid, Skeleton } from '@mui/material';

import questCardStyles from '../ChallengeCard/styles';

import styles from './styles';

/**
 * Renders a skeleton component for a challenge card with image, title, and details.
 *
 * @return {JSX.Element} The challenge card skeleton component.
 */
const ChallengeCardSkeleton = (props) => {
  const { index } = props;
  const isMiddleCard = (index - 2) % 3 === 0;

  const renderImage = () => {
    return (
      <Grid {...questCardStyles.imageGridProps}>
        <Skeleton {...styles.skeletonImage} />
        <Grid {...questCardStyles.challengeDetailsGridProps}>
          <Grid {...questCardStyles.chipGridProps}>
            <Skeleton {...styles.skeletonChipProps} />
          </Grid>
          <Grid {...questCardStyles.chipGridProps}>
            <Skeleton {...styles.skeletonChipProps} />
          </Grid>
          <Grid {...questCardStyles.chipGridProps}>
            <Skeleton {...styles.skeletonChipProps} />
          </Grid>
        </Grid>
        <Skeleton {...styles.skeletonTitleProps} />
      </Grid>
    );
  };

  const renderDescription = () => (
    <Grid {...questCardStyles.detailsGridProps}>
      <Skeleton {...styles.skeletonDescription} />
    </Grid>
  );

  const renderOtherDetails = () => {
    return (
      <Grid {...questCardStyles.otherDetailsGridProps}>
        <Grid {...questCardStyles.detailItemGridProps}>
          <Skeleton {...styles.skeletonDurationProps} />
        </Grid>
        <Grid {...questCardStyles.detailItemGridProps}>
          <Skeleton {...styles.skeletonIconProps} />
        </Grid>
        <Grid {...questCardStyles.detailItemGridProps}>
          <Skeleton {...styles.skeletonButtonProps} />
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...questCardStyles.mainGridProps(isMiddleCard)}>
      <Grid {...questCardStyles.mainCardGridProps}>
        {renderImage()}
        {renderDescription()}
        {renderOtherDetails()}
      </Grid>
    </Grid>
  );
};

export default ChallengeCardSkeleton;

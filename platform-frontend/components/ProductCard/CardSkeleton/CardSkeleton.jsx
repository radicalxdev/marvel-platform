import React from 'react';

import { Grid, Skeleton } from '@mui/material';

import productCardStyles from '../styles';

import styles from './styles';

const CardSkeleton = (props) => {
  const { isMiddleCard } = props;
  const renderPrice = () => {
    return (
      <Grid {...productCardStyles.priceGridProps}>
        <Skeleton {...styles.priceSkeletonProps} />
      </Grid>
    );
  };

  const renderDescription = () => {
    return (
      <Grid {...productCardStyles.descriptionGridProps}>
        <Grid {...productCardStyles.descriptionTitleGridProps}>
          <Skeleton {...styles.skeletonTitleDescriptionProps} />
        </Grid>
        <Grid {...productCardStyles.detailGridProps}>
          <Skeleton {...styles.checkmarkSkeletonProps} />
          <Skeleton {...styles.skeletonFeatureProps} />
        </Grid>
        <Grid {...productCardStyles.detailGridProps}>
          <Skeleton {...styles.checkmarkSkeletonProps} />
          <Skeleton {...styles.skeletonFeatureProps} />
        </Grid>
        <Grid {...productCardStyles.detailGridProps}>
          <Skeleton {...styles.checkmarkSkeletonProps} />
          <Skeleton {...styles.skeletonFeatureProps} />
        </Grid>
        <Grid {...productCardStyles.detailGridProps}>
          <Skeleton {...styles.checkmarkSkeletonProps} />
          <Skeleton {...styles.skeletonFeatureProps} />
        </Grid>
        <Grid {...productCardStyles.buttonGridProps}>
          <Skeleton {...styles.skeletonButtonProps} />
        </Grid>
      </Grid>
    );
  };

  const renderImage = () => {
    return (
      <Grid {...productCardStyles.imageGridProps}>
        <Skeleton {...styles.imageSkeletonProps} />
      </Grid>
    );
  };

  const renderContent = () => {
    return (
      <Grid {...productCardStyles.contentGridProps}>
        {renderPrice()}
        {renderDescription()}
      </Grid>
    );
  };

  return (
    <Grid {...productCardStyles.mainGridProps(isMiddleCard)}>
      <Grid {...productCardStyles.mainCardGridProps}>
        {renderImage()}
        {renderContent()}
      </Grid>
    </Grid>
  );
};

export default CardSkeleton;

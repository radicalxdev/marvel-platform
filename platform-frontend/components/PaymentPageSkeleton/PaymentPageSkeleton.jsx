import { Grid, Skeleton } from '@mui/material';
import React from 'react';

import sharedStyles from '@/styles/shared/sharedStyles';
import styles from './styles';

const PaymentPageSkeleton = () => {
  const renderHeaderSkeleton = () => {
    return (
      <Grid {...styles.paymentPageHeader}>
        <Grid {...styles.paymentPageHeaderInnerGrid}>
          <Grid {...styles.bannerGridProps}>
            <Skeleton {...styles.paymentHeaderImageSkeleton} />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderEssentialsSkeleton = () => {
    return (
      <Grid {...styles.paymentJackpotSkeletonContainer}>
        <Skeleton {...styles.paymentJackpotSkeleton} />
      </Grid>
    );
  };

  return (
    <Grid {...sharedStyles.commonMainGridProps}>
      {renderHeaderSkeleton()}
      {renderEssentialsSkeleton()}
    </Grid>
  );
};

export default PaymentPageSkeleton;

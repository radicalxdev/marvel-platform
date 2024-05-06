import { Grid, Skeleton } from '@mui/material';
import React from 'react';

import styles from './styles';

const WorkspacePageSkeleton = () => {
  const renderMissionInfoSkeleton = () => {
    return (
      <Grid {...styles.missionInfoSkeletonGridProps}>
        <Grid container item mobileSmall>
          <Skeleton {...styles.mainInfoSkeletonProps} />
        </Grid>
        <Grid container item width="100%">
          <Skeleton {...styles.submitSkeletonProps} />
        </Grid>
      </Grid>
    );
  };

  const renderReXChatSkeleton = () => {
    return (
      <Grid {...styles.chatSkeletonGridProps}>
        <Skeleton {...styles.missionInfoSkeleton} />
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderMissionInfoSkeleton()}
      {renderReXChatSkeleton()}
    </Grid>
  );
};

export default WorkspacePageSkeleton;

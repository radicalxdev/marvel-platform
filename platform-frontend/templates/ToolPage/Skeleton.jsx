import { Grid, Skeleton, useTheme } from '@mui/material';

import styles from './styles';

const ToolPageSkeleton = () => {
  const theme = useTheme();

  const renderBackButton = () => {
    return (
      <Grid {...styles.backButtonGridProps}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{
            borderRadius: '50px',
            bgcolor: theme.palette.Common.Black['30p'],
            height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
            width: '120px',
          }}
        />
      </Grid>
    );
  };

  const renderForm = () => {
    return (
      <Grid {...styles.formGridProps}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{
            borderRadius: '50px',
            bgcolor: theme.palette.Common.Black['30p'],
            height: '500px',
            width: '100%',
          }}
        />
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderBackButton()}
      {renderForm()}
    </Grid>
  );
};

export default ToolPageSkeleton;

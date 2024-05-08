import { Grid, Typography } from '@mui/material';

import styles from './styles';

const HomePage = () => {
  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>
          Welcome to{' '}
          <Typography {...styles.highlightTextProps}>Kai Tools</Typography> 👋
        </Typography>
        <Typography {...styles.subtitleProps}>
          Made for{' '}
          <Typography {...styles.highlightTextProps}>educators</Typography>
        </Typography>
      </Grid>
    );
  };

  return <Grid {...styles.mainGridProps}>{renderTitle()}</Grid>;
};
export default HomePage;

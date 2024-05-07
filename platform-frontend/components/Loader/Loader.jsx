import { CircularProgress, Grid } from '@mui/material';

import styles from './styles';

/**
 * Returns a React component that renders a loader with a circular progress bar.
 *
 * @return {JSX.Element} A React component.
 */
const Loader = () => {
  return (
    <Grid {...styles.mainGridProps}>
      <CircularProgress disableShrink size={75} color="primary" />
    </Grid>
  );
};

export default Loader;

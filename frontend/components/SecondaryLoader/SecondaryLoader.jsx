import { CircularProgress, Grid } from '@mui/material';

import styles from './styles';

/**
 * Renders a secondary loader component.
 *
 * @return {JSX.Element} The secondary loader component.
 */
const SecondaryLoader = (props) => {
  const { size } = props;

  return (
    <Grid {...styles.loaderGridProps}>
      <CircularProgress size={size || 50} {...styles.loaderProps} />
    </Grid>
  );
};

export default SecondaryLoader;

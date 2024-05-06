import { Grid, Typography } from '@mui/material';

import styles from './styles';

const SystemAlert = (props) => {
  const { active } = props;

  if (!active) return null;

  return (
    <Grid {...styles.mainGridProps}>
      <Typography {...styles.alertTextProps}>
        ⚠️ 🔄 Attention Beta Users! 🔄 ⚠️ We&apos;re currently experiencing some
        server snags. Please bear with us and return to the platform shortly.
      </Typography>
    </Grid>
  );
};

export default SystemAlert;

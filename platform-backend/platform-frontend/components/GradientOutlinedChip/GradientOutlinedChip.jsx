import { Button, Grid } from '@mui/material';

import styles from './styles';

const GradientOutlinedChip = (props) => {
  const { color, text, bgcolor, icon, size, gap } = props;

  return (
    <Grid {...styles.mainGridProps(color, size)}>
      <Button {...styles.buttonProps(bgcolor, gap)}>
        <span>{icon}</span>
        {text}
      </Button>
    </Grid>
  );
};

export default GradientOutlinedChip;

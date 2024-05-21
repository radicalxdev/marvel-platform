import { Button, Fade, Grid } from '@mui/material';

import styles from './styles';

const Options = (props) => {
  const { options, onQuickReply, show } = props;

  if (!show) return null;

  return (
    <Fade in direction="up">
      <Grid {...styles.optionsGridProps}>
        {options?.map(
          (option, index) =>
            !(index > 1) && (
              <Grid key={index} {...styles.buttonGridProps}>
                <Button
                  onClick={() => onQuickReply(option)}
                  {...styles.buttonProps}
                >
                  {option}
                </Button>
              </Grid>
            )
        )}
      </Grid>
    </Fade>
  );
};

export default Options;

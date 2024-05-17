/* eslint-disable @next/next/no-img-element */
import { Fade, Grid } from '@mui/material';

import styles from './styles';

const ImageMessage = (props) => {
  const { link } = props;
  return (
    <Fade in direction="up">
      <Grid id="message" {...styles.mainGridProps}>
        <Grid {...styles.messageWrapperProps(false)}>
          <img
            src={link}
            alt={link}
            width="100%"
            height="100%"
            style={{
              objectFit: 'contain',
              borderRadius: '18px',
            }}
          />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default ImageMessage;

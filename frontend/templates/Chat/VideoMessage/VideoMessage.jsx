import { useState } from 'react';

import { Fade, Grid, Skeleton } from '@mui/material';

import PlayIcon from '@/assets/svg/PlayIcon.svg';

import styles from './styles';

const VideoMessage = (props) => {
  const { link } = props;

  const [loading, setLoading] = useState(true);

  const renderLoader = () => {
    return (
      <>
        <Skeleton {...styles.skeletonVideoProps} />
        <Grid {...styles.skeletonIconGridProps}>
          <PlayIcon />
        </Grid>
      </>
    );
  };

  return (
    <Fade in direction="up">
      <Grid id="message" {...styles.mainGridProps}>
        <Grid {...styles.messageWrapperProps(false, loading)}>
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            title="video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setLoading(false)}
            src={link}
            frameBorder={0}
          />
          {loading && renderLoader()}
        </Grid>
      </Grid>
    </Fade>
  );
};

export default VideoMessage;

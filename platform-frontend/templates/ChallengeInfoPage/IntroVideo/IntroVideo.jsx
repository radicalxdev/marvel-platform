import { Grid, Typography } from '@mui/material';

import DefaultVideo from '@/assets/svg/defaultVideo.svg';

import styles from './styles';

const IntroVideo = (props) => {
  const { challengeDoc } = props;

  return (
    <Grid {...styles.mainGridProps}>
      <Typography {...styles.titleProps}>Introduction Video</Typography>
      <Grid {...styles.videoGridProps}>
        {challengeDoc?.introVideoUrl && (
          <iframe
            title="intro-video"
            allowFullScreen
            src={challengeDoc?.introVideoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        )}
        {!challengeDoc?.introVideoUrl && <DefaultVideo />}
      </Grid>
    </Grid>
  );
};

export default IntroVideo;

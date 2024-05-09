import { useState } from 'react';

import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import BackDropModal from '@/components/BackDropModal';

import styles from './styles';

/**
 * Generates the introduction video modal.
 *
 * @return {JSX.Element} The introduction video component.
 */
const IntroVideo = () => {
  const { data: user } = useSelector((state) => state.user);
  const videoOpened = localStorage.getItem(`introVideoShown-${user.id}`);

  const [open, setOpen] = useState(!videoOpened);

  const closeVideo = () => {
    setOpen(false);
    localStorage.setItem(`introVideoShown-${user.id}`, true);
  };

  const renderVideo = () => {
    return (
      <Grid {...styles.videoGridProps}>
        <Grid {...styles.innerVideoGridProps}>
          <Grid {...styles.iframeGridProps}>
            <iframe
              title="intro-video"
              allowFullScreen
              src="https://www.youtube.com/embed/nRhbPCNa9_I?si=JuOkNAq-fM7mbBAI"
              {...styles.iframeProps}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <BackDropModal
      open={open}
      handleClose={closeVideo}
      {...styles.backdropProps}
    >
      <Grid {...styles.introVideoGridProps}>{renderVideo()}</Grid>
    </BackDropModal>
  );
};

export default IntroVideo;

import { Grid, Typography } from '@mui/material';

import Image from 'next/image';

import ImageURLs from '@/assets/urls';

import styles from './styles';

const CenterChatContentNoMessages = () => {
  const renderProfilePic = () => {
    return (
      <Grid {...styles.profileGridProps}>
        <Grid {...styles.profileProps}>
          <Image
            src={ImageURLs.MarvelCircleAvatar}
            alt="marvel-profile"
            {...styles.imageProps}
          />
        </Grid>
        <Grid {...styles.introGridProps}>
          <Typography {...styles.introTextProps}>
            Hello! I’m Marvel. 👋
          </Typography>
          <Typography {...styles.subIntroTextProps}>
            Made for
            <Typography {...styles.highlightTextProps}>educators.</Typography>
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderDescription = () => {
    return (
      <Grid {...styles.descriptionGridProps}>
        <Typography {...styles.descriptionProps}>
          Hello! I’m Marvel, your AI teaching assistant. You can ask any
          questions realted to best practices in teaching, or working with your
          students. Feel free to ask me for ideas for your classroom, and the
          more specific your questions, the better my responses will be. How can
          I help you today?
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Grid {...styles.noMessagesGridProps}>
        {renderProfilePic()}
        {renderDescription()}
      </Grid>
    </Grid>
  );
};
export default CenterChatContentNoMessages;

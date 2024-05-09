import { useState } from 'react';

import { Divider, Grid, IconButton, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';

import AvatarPlaceholder from '@/assets/images/AvatarPlaceholder.png';

import styles from './styles';

import {
  generateRandomColour,
  getUserAvatarImage,
} from '@/utils/MiscellaneousUtils';

/**
 * Renders a leader list item.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.leader - The leader object.
 * @param {number} props.index - The index of the leader.
 * @return {JSX.Element} The rendered leader list item.
 */
const LeaderListItem = (props) => {
  const { leader, index, isQuest } = props;
  const { fullName, totalScore, avatarId, duration } = leader;

  const [isLoading, setIsLoading] = useState(true);

  const setPosition = () => {
    if (index + 1 === 1) return '🥇';
    if (index + 1 === 2) return '🥈';
    if (index + 1 === 3) return '🥉';
    return index + 1;
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const renderAvatarImage = () => {
    if (isLoading) {
      <Image src={AvatarPlaceholder} {...styles.avatarConfig} />;
    }

    return (
      <Image
        src={getUserAvatarImage(avatarId)}
        {...styles.avatarConfig}
        onLoadingComplete={handleLoad}
      />
    );
  };

  const renderName = () => {
    return (
      <Grid container item mobileSmall={7}>
        <Typography {...styles.leaderNameProps}>{fullName}</Typography>
      </Grid>
    );
  };

  const renderAvatar = () => {
    return (
      <Grid item>
        <IconButton
          {...styles.iconButtonProps(!!avatarId, generateRandomColour())}
        >
          {renderAvatarImage()}
        </IconButton>
      </Grid>
    );
  };

  const renderPosition = () => {
    return (
      <Grid {...styles.positionGridProps}>
        <Typography {...styles.positionProps}>{setPosition()}</Typography>
      </Grid>
    );
  };

  const renderUserDetails = () => {
    return (
      <Grid {...styles.leaderDetailsGridProps}>
        {renderPosition()}
        {renderAvatar()}
        {renderName()}
      </Grid>
    );
  };

  const renderCorrectAnswers = () => {
    return (
      <Grid {...styles.correctAnswersGridProps}>
        <Typography {...styles.positionProps}>
          {isQuest && `${totalScore / 4}/25`}
        </Typography>
      </Grid>
    );
  };

  const renderTime = () => {
    return (
      <Grid {...styles.durationGridProps}>
        <Typography {...styles.positionProps}>
          {isQuest &&
            `${moment(duration).format('mm')}m ${moment(duration).format(
              'ss'
            )}s`}
        </Typography>
      </Grid>
    );
  };

  const renderScore = () => {
    return (
      <Grid {...styles.leaderScoreGridProps}>
        <Typography {...styles.leaderScoreProps}>
          {totalScore.toFixed(0)}
        </Typography>
      </Grid>
    );
  };

  const renderDivider = () => {
    return <Divider variant="fullWidth" />;
  };

  return (
    <Grid {...styles.leaderItemGridProps}>
      <Grid {...styles.leaderItemDetailsGridProps}>
        {renderUserDetails()}
        {renderCorrectAnswers()}
        {renderTime()}
        {renderScore()}
      </Grid>
      <Grid {...styles.dividerGridProps}>{renderDivider()}</Grid>
    </Grid>
  );
};

export default LeaderListItem;

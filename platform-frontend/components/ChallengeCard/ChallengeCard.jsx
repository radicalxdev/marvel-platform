import { Button, Chip, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

import useTimer from '@/hooks/useTimer';

import CHALLENGES from '@/constants/challenges';

import GradientOutlinedButton from '../GradientOutlinedButton';

import styles from './styles';

import { useQuestData } from '@/context/QuestContext';
import { shimmerEffect, toBase64 } from '@/utils/MiscellaneousUtils';

/**
 * Renders a challenge card component with an image, title, and overview.
 *
 * @return {JSX.Element} The challenge card component.
 */
const ChallengeCard = () => {
  const theme = useTheme();
  const router = useRouter();

  const {
    coverImageUrl,
    logo,
    name,
    type,
    maskedId,
    overview,
    difficulty,
    questActive,
    questComplete,
    length,
    timeUp,
    preEnroll,
    endTime,
    startTime,
    category,
    isMiddleCard,
  } = useQuestData();

  const counterEndTime = preEnroll ? startTime : endTime;

  const isMission = type === CHALLENGES.MISSION;
  const { days, hours, minutes } = useTimer(
    counterEndTime,
    true,
    () => {},
    startTime
  );

  const handlePreviewClick = () => {
    if (isMission) return router.push(`/${maskedId}`);
    return router.push(`/hackathons/${maskedId}`);
  };

  const renderTimer = () => {
    return (
      <Grid {...styles.timerGridProps}>
        <Grid item mobileSmall="auto">
          ✨
        </Grid>
        <Grid {...styles.timerTextGridProps}>
          <Typography position="absolute" fontSize="6px">
            {preEnroll ? 'Starts in' : 'Ends in'}
          </Typography>
          <Typography
            sx={{ marginTop: '8px', lineHeight: '16px' }}
          >{`${days}:${hours}:${minutes}`}</Typography>
        </Grid>
      </Grid>
    );
  };

  const renderImage = () => {
    return (
      <Grid {...styles.imageGridProps}>
        <Image
          src={coverImageUrl}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmerEffect(800, 118)
          )}`}
          {...styles.imageProps}
        />
        <Grid {...styles.challengeDetailsGridProps}>
          {!timeUp && (
            <Grid {...styles.chipGridProps}>
              <Chip
                {...styles.chipProps(preEnroll ? 'green' : 'red', {
                  height: '32px',
                })}
                label={renderTimer()}
              />
            </Grid>
          )}
          <Grid {...styles.chipGridProps}>
            <Chip {...styles.chipProps('yellow_2')} label={difficulty} />
          </Grid>
          <Grid {...styles.chipGridProps}>
            <Chip {...styles.chipProps('purple')} label={category} />
          </Grid>
        </Grid>
        <Typography {...styles.titleProps(name)}>{name}</Typography>
      </Grid>
    );
  };

  const renderDescription = () => (
    <Grid {...styles.detailsGridProps}>
      <Typography {...styles.descriptionProps}>{overview}</Typography>
    </Grid>
  );

  const renderOtherDetails = () => {
    return (
      <Grid {...styles.otherDetailsGridProps}>
        <Grid {...styles.detailItemGridProps}>
          <Typography {...styles.lengthProps}>
            <span>{length}</span> Hours
          </Typography>
        </Grid>
        <Grid {...styles.detailItemGridProps}>
          <Image src={logo} width={36} height={36} {...styles.logoProps} />
        </Grid>
        <Grid {...styles.detailItemGridProps}>
          {((!questActive && !questComplete) || preEnroll) && (
            <GradientOutlinedButton
              bgcolor={theme.palette.Dark_Colors.Dark[1]}
              clickHandler={handlePreviewClick}
              {...styles.previewButtonProps}
            />
          )}
          {(questActive || questComplete) && !preEnroll && (
            <Button
              onClick={handlePreviewClick}
              {...styles.continueButtonProps(questComplete)}
            >
              {questComplete ? 'Review' : 'Continue'}
            </Button>
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps(isMiddleCard)}>
      <Grid {...styles.mainCardGridProps}>
        {renderImage()}
        {renderDescription()}
        {renderOtherDetails()}
      </Grid>
    </Grid>
  );
};

export default ChallengeCard;

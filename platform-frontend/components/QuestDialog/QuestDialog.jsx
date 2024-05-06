import { useEffect } from 'react';
import Image from 'next/image';
import {
  Button,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { CancelRounded } from '@mui/icons-material';

import GradientOutlinedChip from '../GradientOutlinedChip';
import GradientOutlinedButton from '../GradientOutlinedButton';
import QuestOutlinedButton from './QuestOutlinedButton';

import ReXAvatar from '@/assets/images/ReXAvatarDialog.png';

import { disableScroll } from '@/utils/MiscellaneousUtils';

import styles from './styles';
import sharedStyles from '@/styles/shared/sharedStyles';

/**
 * Renders a dialog component for a quest.
 *
 * @param {Object} props - The props for the component.
 * @param {function} props.handleClose - The function to handle closing the dialog.
 * @param {boolean} props.open - Flag to indicate if the dialog is open.
 * @param {boolean} props.loading - Flag to indicate if the dialog is in a loading state.
 * @param {string} props.chipLabel - The label for the chip component.
 * @param {string} props.secondaryButtonText - The text for the secondary button.
 * @param {string} props.primaryButtonText - The text for the primary button.
 * @param {function} props.primaryButtonClickHandler - The function to handle the primary button click.
 * @param {function} props.secondaryButtonClickHandler - The function to handle the secondary button click.
 * @param {function} props.handleStartLesson - The function to handle starting the lesson.
 * @param {function} props.handleStartGame - The function to handle starting the game.
 * @param {string} props.mainText - The main text for the dialog.
 * @param {string} props.contentText - The content text for the dialog.
 * @param {boolean} props.timeUp - Flag to indicate if time is up.
 * @param {boolean} props.success - Flag to indicate if the quest is successful.
 * @param {boolean} props.showScore - Flag to indicate if the score should be shown.
 * @param {Object} props.scoreDetails - The details of the score.
 * @param {boolean} props.disableExit - Flag to indicate if the exit button should be disabled.
 * @param {boolean} props.isDashboard - Flag to indicate if the dialog is being used in a dashboard.
 * @param {boolean} props.disabledAIFeatures - Flag to indicate if AI features are disabled.
 * @return {JSX.Element} The rendered dialog component.
 */
const QuestDialog = (props) => {
  const {
    handleClose,
    open,
    loading,
    chipLabel,
    secondaryButtonText,
    primaryButtonText,
    primaryButtonClickHandler,
    secondaryButtonClickHandler,
    handleStartLesson,
    handleStartGame,
    mainText,
    contentText,
    timeUp,
    success,
    showScore,
    scoreDetails,
    disableExit,
    isDashboard,
    disabledAIFeatures,
  } = props;

  const theme = useTheme();
  const disablePlayGame = true;

  useEffect(() => {
    disableScroll(open);
  }, [open]);

  const setBoxShadowColor = () => {
    if (timeUp || success) return 'basicPurple';
    return 'error';
  };

  const setTopBgColor = () => {
    if (timeUp || success) return 'basicPurple';
    return 'error';
  };

  const setSecondaryButtonColor = () => {
    if (timeUp || success) return 'purple2';
    return 'error';
  };

  const renderLoader = () => {
    return (
      <Grid {...sharedStyles.secondaryLoaderGridProps}>
        <CircularProgress color="secondary" size={35} />
      </Grid>
    );
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.headerGridProps}>
        <Typography {...styles.headerProps}>{chipLabel}</Typography>
      </Grid>
    );
  };

  const renderPrimaryButton = () => {
    return (
      <Grid
        mobileSmall={disabledAIFeatures ? 12 : 6}
        {...styles.primaryButtonGridProps}
      >
        <Button
          onClick={primaryButtonClickHandler}
          disabled={loading}
          {...styles.primaryButtonProps}
        >
          {loading ? renderLoader() : primaryButtonText}
        </Button>
      </Grid>
    );
  };

  const renderSecondaryButton = () => {
    return (
      <Grid {...styles.buttonGridProps}>
        <GradientOutlinedButton
          color={setSecondaryButtonColor()}
          text={<span>{secondaryButtonText}</span>}
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          clickHandler={secondaryButtonClickHandler}
          {...styles.secondaryButtonProps}
        />
      </Grid>
    );
  };

  const renderTertiaryButton = () => {
    if (disablePlayGame)
      return (
        <Grid {...styles.buttonGridProps}>
          <GradientOutlinedButton
            color="purple2"
            text={<span>Learn 📚</span>}
            bgcolor={theme.palette.Dark_Colors.Dark[1]}
            clickHandler={handleStartLesson}
            {...styles.secondaryButtonProps}
          />
        </Grid>
      );

    return (
      <Grid {...styles.tertiaryButtonGridProps}>
        <QuestOutlinedButton
          color={setSecondaryButtonColor()}
          text={<span>Learn 📚</span>}
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          clickHandler={handleStartLesson}
          {...styles.secondaryButtonProps}
        />
        <QuestOutlinedButton
          color="purple2Reverse"
          text={<span>Play 🎮</span>}
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          clickHandler={handleStartGame}
          disabled
          left
          {...styles.secondaryButtonProps}
        />
      </Grid>
    );
  };

  const renderButtons = () => {
    return (
      <Grid {...styles.actionGridProps}>
        {renderPrimaryButton()}
        {!isDashboard && renderSecondaryButton()}
        {isDashboard && !disabledAIFeatures && renderTertiaryButton()}
      </Grid>
    );
  };

  const renderScores = () => {
    return (
      <Grid {...styles.scoreGridProps}>
        <Grid {...styles.scoreChipGridProps}>
          <GradientOutlinedChip
            color="blue2"
            bgcolor={theme.palette.Dark_Colors.Dark[1]}
            text={`🎯 Score: ${scoreDetails?.score}`}
            size={2}
          />
        </Grid>
        <Grid {...styles.scoreChipGridProps}>
          <GradientOutlinedChip
            color="blue2"
            bgcolor={theme.palette.Dark_Colors.Dark[1]}
            text={`✅ Questions: ${scoreDetails?.questionsCorrect}/25`}
            size={2}
          />
        </Grid>
        <Grid {...styles.scoreChipGridProps}>
          <GradientOutlinedChip
            color="blue2"
            bgcolor={theme.palette.Dark_Colors.Dark[1]}
            text={`⏰ Time: ${scoreDetails?.time}`}
            size={2}
          />
        </Grid>
      </Grid>
    );
  };

  const renderBottomText = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Typography {...styles.contentTextProps}>{contentText}</Typography>
      </Grid>
    );
  };

  const renderMainText = () => {
    return (
      <Grid {...styles.mainTextGridProps}>
        <Typography {...styles.mainTextProps}>{mainText}</Typography>
      </Grid>
    );
  };

  const renderTop = () => {
    return (
      <Grid {...styles.topGridProps(setTopBgColor())}>
        <Grid {...styles.titleGridProps}>
          {renderTitle()}
          {renderMainText()}
        </Grid>
        <Grid {...styles.imageGridProps}>
          <Image src={ReXAvatar} {...styles.imageProps} />
        </Grid>
        {!disableExit && (
          <IconButton onClick={handleClose} {...styles.iconButtonProps}>
            <CancelRounded {...styles.cancelIconProps} />
          </IconButton>
        )}
      </Grid>
    );
  };

  const renderBottom = () => {
    return (
      <Grid {...styles.bottomGridProps}>
        {showScore && renderScores()}
        {renderBottomText()}
        {renderButtons()}
      </Grid>
    );
  };

  return (
    <Dialog
      disableEscapeKeyDown={disableExit}
      onClose={!disableExit && handleClose}
      open={open}
      {...styles.dialogProps(setBoxShadowColor())}
    >
      <Grid {...styles.mainGridProps}>
        {renderTop()}
        {renderBottom()}
      </Grid>
    </Dialog>
  );
};

export default QuestDialog;

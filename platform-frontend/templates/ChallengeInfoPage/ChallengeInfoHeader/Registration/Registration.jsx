import { useContext, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, useTheme } from '@mui/material';

import PrimaryDialog from '@/components/PrimaryDialog';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import StatisticChip from '@/components/StatisticChip';

import startChallenge from '@/services/challenges/startChallenge';
import { AuthContext } from '@/providers/GlobalProvider';

import { firestore } from '@/redux/store';
import fetchUserData from '@/redux/thunks/user';
import { updateChallengeDoc } from '@/redux/slices/challengesSlice';
import fetchEnrolledChallenges from '@/redux/thunks/enrolledChallenges';
import { reset as resetEnrolledChallenges } from '@/redux/slices/enrolledChallengesSlice';

import CoinIcon from '@/assets/svg/coin2.svg';
import DiamondIcon from '@/assets/svg/diamond2.svg';
import RobotIcon from '@/assets/svg/robotIcon.svg';
import DevIcon from '@/assets/svg/DevIcon.svg';
import ImageURLs from '@/assets/urls';

import ALERT_COLORS from '@/constants/notification';
import { EXPEDITIONS } from '@/constants/quests';

import styles from './styles';

const Registration = (props) => {
  const { open, toggleOpen, isPreEnroll, isActive, challengeDoc } = props;
  const { name, entryFee, prizePool, type, id, categoryId, difficulty } =
    challengeDoc;

  const theme = useTheme();
  const dispatch = useDispatch();

  const { data: authData } = useSelector((state) => state.auth);
  const [enrolling, setEnrolling] = useState(false);

  const { handleOpenSnackBar } = useContext(AuthContext);

  const setPrimaryButtonText = () => {
    if (isPreEnroll) return 'Pre-Register';
    return 'Enroll Now';
  };

  const handleFetchEnrolledChallenges = async () => {
    dispatch(resetEnrolledChallenges());
    dispatch(fetchEnrolledChallenges({ firestore, id: authData.uid }));
  };

  const handleEnrollNow = async () => {
    if (isActive) return;
    if (enrolling) return;
    try {
      setEnrolling(true);

      await startChallenge({
        userId: authData.uid,
        isPreEnroll,
        challengeDoc,
      });

      handleOpenSnackBar(
        ALERT_COLORS.SUCCESS,
        'Successfully enrolled in Mission'
      );

      dispatch(updateChallengeDoc({ id, challengeType: type }));
      handleFetchEnrolledChallenges();
      dispatch(fetchUserData({ firestore, id: authData?.uid }));

      toggleOpen();
    } catch (error) {
      setEnrolling(false);
      handleOpenSnackBar(ALERT_COLORS.ERROR, error.message);
    }
  };

  const renderPills = () => {
    return (
      <Grid {...styles.pillsGridProps}>
        <StatisticChip
          stat={`$${prizePool} IN PRIZES`}
          color="yellow"
          icon={<CoinIcon />}
          {...styles.pillProps}
        />
        <StatisticChip
          stat={`${entryFee} ENTRY FEE`}
          color="blue"
          icon={<DiamondIcon />}
          {...styles.pillProps}
        />
        <StatisticChip
          stat={EXPEDITIONS?.[categoryId]?.name}
          icon={<DevIcon />}
          color="brightRed"
          {...styles.pillProps}
        />
        <StatisticChip
          stat={difficulty}
          icon={<RobotIcon />}
          color="darkGreen"
          {...styles.pillProps}
        />
      </Grid>
    );
  };

  const renderContent = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Grid {...styles.textGridProps}>
          <Typography {...styles.titleProps}>
            Do you want to enroll in the{' '}
            <Typography {...styles.challengeNameProps}>{name}</Typography>{' '}
            mission?
          </Typography>
        </Grid>
        <Grid {...styles.descriptionGridProps}>
          <Typography {...styles.descriptionProps}>
            {`This will cost a ${entryFee} entrance fee, and the mission will start
            immediately upon enrollment. All enrollment fees are not refundable.`}
          </Typography>
        </Grid>
        <Grid {...styles.actionButtonProps}>
          <GradientOutlinedButton
            id="register-btn"
            bgcolor={theme.palette.Dark_Colors.Dark[3]}
            inverted
            text={setPrimaryButtonText()}
            clickHandler={handleEnrollNow}
            loading={enrolling}
            disabled={enrolling}
            textColor={theme.palette.Background.green}
            {...styles.enrollButtonProps}
          />
          <GradientOutlinedButton
            id="cancel-btn"
            bgcolor={theme.palette.Dark_Colors.Dark[3]}
            textColor={theme.palette.Dark_Colors.Dark[3]}
            text="Cancel"
            clickHandler={toggleOpen}
            {...styles.cancelButtonProps}
          />
        </Grid>
      </Grid>
    );
  };

  const renderImage = () => {
    return (
      <Grid {...styles.imageGridProps}>
        <Image src={ImageURLs.RegistrationImage} {...styles.imageProps} />
      </Grid>
    );
  };

  return (
    <PrimaryDialog
      title="Registration"
      open={open}
      toggleOpen={toggleOpen}
      extraMainGridProps={styles.extraMainGridProps}
      extraContentGridProps={styles.extraContentGridProps}
    >
      <Grid {...styles.mainGridProps}>
        {renderPills()}
        <Grid container item mobileSmall>
          <Grid container item mobileSmall={12} height="100%">
            {renderContent()}
            {renderImage()}
          </Grid>
        </Grid>
      </Grid>
    </PrimaryDialog>
  );
};

export default Registration;

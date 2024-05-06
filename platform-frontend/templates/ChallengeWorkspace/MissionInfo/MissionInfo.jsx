import { useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { Publish } from '@mui/icons-material';

import { firestore } from '@/redux/store';
import { updateEnrolledChallenge } from '@/redux/slices/enrolledChallengesSlice';

import updateEnrolPlayerDoc from '@/services/chatbot/updateEnrolPlayerDoc';
import generateCertificate from '@/services/challenges/generateCertificate';
import fetchEnrolledChallenges from '@/redux/thunks/enrolledChallenges';

import OverviewPanel from '../OverviewPanel';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import { AuthContext } from '@/providers/GlobalProvider';

import CHALLENGES from '@/constants/challenges';
import STATUS from '@/constants/mission';
import ALERT_COLORS from '@/constants/notification';

import styles from './styles';

const MissionInfo = (props) => {
  const { tasks, isLesson, taskStatus, setIsSuccessScreen, totalLevels } =
    props;

  const router = useRouter();
  const dispatch = useDispatch();

  const {
    query: { level, missionId, questId },
  } = router;
  const windowRef = useRef(window);
  const theme = useTheme();

  const challengeType = isLesson ? CHALLENGES.QUEST : CHALLENGES.MISSION;
  const currentTask = tasks[parseInt(level, 10) - 1];
  const isTaskComplete = taskStatus === STATUS.COMPLETED;
  const disableTabs = true;

  const { handleOpenSnackBar } = useContext(AuthContext);

  const { data: user } = useSelector((state) => state.user);
  const { data: missions } = useSelector(
    (state) => state.challenges[challengeType]
  );
  const { data: enrolledChallenges } = useSelector(
    (state) => state.enrolledChallenges
  );

  const [currentTab, setCurrentTab] = useState(0);
  const [slideDimensions, setSlideDimensions] = useState(null);

  const currentChallenge = missions?.find((mission) => {
    if (isLesson) return mission.maskedId === questId;
    return mission.maskedId === missionId;
  });
  const currentEnrolledChallenge = enrolledChallenges?.[currentChallenge?.id];

  const loadTallyAsync = () => {
    const script = windowRef.current.document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    script.onload = () => {
      // eslint-disable-next-line no-console
      console.log('Tally loaded');
    };
    script.onerror = () => {
      // eslint-disable-next-line no-console
      console.log('Error loading Tally');
    };

    // eslint-disable-next-line no-console
    if (windowRef.current.Tally) return console.log('Tally already loaded');
    return windowRef.current.document.body.appendChild(script);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadTallyAsync();
    }
  }, []);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOnFormSubmit = async () => {
    try {
      const isLastTask = parseInt(level, 10) === totalLevels;

      const updatedTasks = currentEnrolledChallenge?.practice?.map((task) => {
        if (parseInt(task.level, 10) === parseInt(level, 10)) {
          return {
            ...task,
            status: STATUS.COMPLETED,
            endTime: Timestamp.fromDate(new Date()),
          };
        }
        return task;
      });

      await updateEnrolPlayerDoc(firestore, user?.id, currentChallenge?.id, {
        practice: updatedTasks,
        ...(isLastTask && {
          status: STATUS.COMPLETED,
          endTime: Timestamp.fromDate(new Date()),
        }),
      });

      if (isLastTask) {
        await generateCertificate({
          userId: user?.id,
          challengeDoc: currentChallenge,
          fullName: user?.fullName,
        });

        dispatch(fetchEnrolledChallenges({ firestore, id: user?.id }));
      }

      dispatch(
        updateEnrolledChallenge({
          challengeId: currentEnrolledChallenge?.challengeId,
          updatedData: {
            ...currentEnrolledChallenge,
            practice: updatedTasks,
            ...(isLastTask && {
              status: STATUS.COMPLETED,
              endTime: Timestamp.fromDate(new Date()),
            }),
          },
        })
      );

      setIsSuccessScreen(true);
    } catch (error) {
      handleOpenSnackBar(ALERT_COLORS.ERROR, 'Error submitting form');
    } finally {
      windowRef.current.Tally.closePopup(currentChallenge?.tallyFormUrl);
    }
  };

  const tabProps = (index) => ({
    id: `tabpanel-${index}`,
    'aria-controls': `tabpanel-${index}`,
  });

  const handleTallyPopUp = () => {
    windowRef.current.Tally.openPopup(currentChallenge?.tallyFormUrl, {
      key: `task-${level}`,
      layout: 'modal',
      width: '800px',
      emoji: {
        text: '👋',
        animation: 'wave',
      },
      showOnce: false,
      hiddenFields: {
        accountEmail: user?.email,
        id: user?.id,
        name: user?.fullName,
        challengeName: currentChallenge?.id,
        challengeId: currentChallenge?.id,
        challengeMaskedId: missionId,
        task: level,
      },
      onSubmit: (payload) => handleOnFormSubmit(payload),
    });
  };

  const renderTabs = () => {
    if (isLesson || disableTabs) return null;
    return (
      <Grid {...styles.tabsGridProps}>
        <Grid {...styles.innerTabsGridProps}>
          <Tabs
            value={currentTab}
            onChange={handleChange}
            {...styles.tabsContainerProps}
          >
            <Tab {...styles.tabProps} label="Overview 🔭" {...tabProps(0)} />
            <Tab {...styles.tabProps} label="Setup 🛠️" {...tabProps(1)} />
            <Tab {...styles.tabProps} label="Resources 🤑" {...tabProps(2)} />
          </Tabs>
        </Grid>
      </Grid>
    );
  };

  const renderTitle = () => {
    return (
      <Grid pl={5} {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>Instructional Deck</Typography>
      </Grid>
    );
  };

  const renderSubmitTask = () => {
    return (
      <Grid {...styles.submitGridProps(isTaskComplete)}>
        <Grid {...styles.submitTitleGridProps}>
          <Typography
            {...styles.submitTitleProps(isTaskComplete)}
          >{`Submit Task ${level}`}</Typography>
        </Grid>
        <Grid {...styles.buttonGridProps}>
          {!isTaskComplete && (
            <GradientOutlinedButton
              bgcolor={theme.palette.Dark_Colors.Dark[1]}
              text="Submit"
              clickHandler={handleTallyPopUp}
              icon={
                <Publish
                  sx={{
                    color: theme.palette.Dark_Colors.Dark[1],
                    width: 20,
                    height: 20,
                  }}
                />
              }
              textColor={theme.palette.Dark_Colors.Dark[1]}
              {...styles.submitButtonProps()}
            />
          )}
          {isTaskComplete && (
            <Button disabled={isTaskComplete} {...styles.continueButtonProps()}>
              Submitted
            </Button>
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderTabs()}
      {renderTitle()}
      <OverviewPanel
        value={currentTab}
        index={0}
        details={currentTask?.workspace?.[0]}
        slideDimensions={slideDimensions}
        setSlideDimensions={setSlideDimensions}
        isLesson={isLesson}
      />
      {!isLesson && renderSubmitTask()}
    </Grid>
  );
};

export default MissionInfo;

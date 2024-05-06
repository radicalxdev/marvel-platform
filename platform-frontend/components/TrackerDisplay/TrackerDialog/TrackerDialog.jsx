import { useState } from 'react';
import { useRouter } from 'next/router';

import QuestDialog from '@/components/QuestDialog';

import { ASSESSMENT_DIALOG_STATES } from '@/constants/assessment';
import ROUTES from '@/constants/routes';

const TrackerDialog = (props) => {
  const {
    toggleOpen,
    open,
    dialogState,
    scoreDetails,
    resetQuiz,
    setSelectedValue,
    setSelected,
    isPractice,
  } = props;

  const router = useRouter();
  const {
    query: { questId, level },
  } = router;

  const [loading, setLoading] = useState(false);

  const setMainText = () => {
    if (isPractice)
      return 'You\u0027ve done so much already, and I truly value all your effort and progress. 🌟';

    return 'Starting an assessment is a big step! I\u0027d advise against stepping out midway. 🚫';
  };

  const setExitContentText = () => {
    if (isPractice)
      return 'Hey there! 👋 If you decide to exit now, rest assured your progress is safe with me. 😊 You\u0027re always welcome to jump back in and continue the quiz anytime. I\u0027ve got your back!';
    return 'Hey there! 👋 Just a heads up: if you step out now, that timer won\u0027t take a break and keeps on ticking. ⏰ Feel free to return whenever you wish, but make sure there\u0027s some time left. I\u0027m cheering you on! 🎉';
  };

  const setSecondaryButtonText = () => {
    if (parseInt(level, 10) === 4) return 'Dive into Probe 🚀';
    return 'Dive into Next Level 🚀';
  };

  const handleRedoQuiz = () => {
    setLoading(true);
    resetQuiz()
      .then(() => {
        setSelectedValue(null);
        setSelected(null);
        toggleOpen();
      })
      .finally(() => setLoading(false));
  };

  const handleGoToDashboard = () => {
    router.push(`/${questId}/dashboard`);
  };

  const handleGoHome = () => {
    router.push(ROUTES.HOME);
  };

  const ExitAssessmentDialogProps = {
    handleClose: toggleOpen,
    open,
    primaryButtonClickHandler: toggleOpen,
    secondaryButtonClickHandler: handleGoToDashboard,
    primaryButtonText: 'Stay & Shine 🌟',
    secondaryButtonText: 'Exit for Now 🦋 ',
    contentText: setExitContentText(),
    mainText: setMainText(),
    chipLabel: isPractice ? 'Exit Quiz' : 'Exit Assessment',
    success: false,
    disableExit: false,
  };

  const PracticeAllDoneDialogProps = {
    handleClose: toggleOpen,
    open,
    singleButton: false,
    primaryButtonText: 'Redo Quiz 🔄',
    secondaryButtonText: setSecondaryButtonText(),
    primaryButtonClickHandler: handleRedoQuiz,
    secondaryButtonClickHandler: handleGoToDashboard,
    contentText:
      'Every challenge makes us grow, and you just soared a little higher today. Keep the learning vibes strong! 💪',
    mainText: 'You\u0027ve danced through those questions like a pro! 🕺',
    chipLabel: 'Quiz-tastic!',
    success: true,
    loading,
    showScore: false,
    disableExit: true,
  };

  const AllDoneDialogProps = {
    handleClose: toggleOpen,
    open,
    singleButton: false,
    primaryButtonText: 'View Certificate 👀',
    secondaryButtonText: 'Go Home 🚀',
    primaryButtonClickHandler: handleGoToDashboard,
    secondaryButtonClickHandler: handleGoHome,
    contentText:
      'Can\u0027t wait to see where you stand in the final leaderboard! I\u0027ve got my fingers crossed for you. 🤞',
    mainText:
      'Hats off to you, web warrior! 🎩 You\u0027ve conquered the Grand Finale.',
    chipLabel: 'All Done',
    success: true,
    showScore: true,
    disableExit: true,
  };

  const TimeUpDialogProps = {
    handleClose: toggleOpen,
    open,
    singleButton: false,
    primaryButtonClickHandler: handleGoToDashboard,
    secondaryButtonClickHandler: handleGoHome,
    primaryButtonText: 'View Certificate 👀',
    secondaryButtonText: 'Go Home 🚀',
    contentText:
      'Don\u0027t worry, it happens to the best of us. You\u0027ll get another shot to conquer the assessment in 30 days. 📅',
    mainText:
      'Oops, seems like you ran out of time before you could complete the assessment',
    chipLabel: 'Time\u0027s Over',
    timeUp: true,
    success: false,
    showScore: true,
    disableExit: true,
  };

  const setDialogProps = () => {
    if (dialogState === ASSESSMENT_DIALOG_STATES.EXIT)
      return ExitAssessmentDialogProps;
    if (dialogState === ASSESSMENT_DIALOG_STATES.TIME_UP)
      return TimeUpDialogProps;
    if (dialogState === ASSESSMENT_DIALOG_STATES.QUIZ_DONE)
      return PracticeAllDoneDialogProps;

    return AllDoneDialogProps;
  };

  return <QuestDialog scoreDetails={scoreDetails} {...setDialogProps()} />;
};

export default TrackerDialog;

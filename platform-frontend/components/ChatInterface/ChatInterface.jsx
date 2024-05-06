import { useEffect } from 'react';
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Slide,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import MasterChat from '@/templates/MasterChat';
import OptionItem from './OptionItem';

import ReXIconAvatar from '@/assets/images/RexIconAvatar.png';
import { shimmerEffect, toBase64 } from '@/utils/MiscellaneousUtils';

import styles from './styles';
import sharedStyles from '@/styles/shared/sharedStyles';

/**
 * Renders the chat interface component.
 *
 * @param {Object} props - The props object containing the necessary data for rendering the component.
 * @param {string} props.question - The question to be displayed in the chat interface.
 * @param {string} props.questionId - The ID of the question.
 * @param {Array} props.choices - An array of choices for the question.
 * @param {Function} props.handleSubmitAnswer - The function to handle submitting the answer.
 * @param {boolean} props.isPractice - Indicates if the chat interface is in practice mode.
 * @param {boolean} props.selected - Indicates if a choice has been selected.
 * @param {string} props.selectedValue - The value of the selected choice.
 * @param {boolean} props.submitLoading - Indicates if the submit button is in a loading state.
 * @param {boolean} props.enrolledQuest - Indicates if the user is enrolled in the quest.
 * @param {Object} props.questDoc - The document object for the quest.
 * @param {boolean} props.openChat - Indicates if the chat is open.
 * @param {Function} props.setStart - The function to set the start state.
 * @param {boolean} props.isQuestionsLoading - Indicates if the questions are in a loading state.
 * @param {boolean} props.explanationOpened - Indicates if the explanation is opened.
 * @param {Object} props.levelDetails - The details of the level.
 * @param {boolean} props.isComplete - Indicates if the chat interface is complete.
 * @param {Object} props.user - The user object.
 * @param {Object} props.optionItemProps - The props for the OptionItem component.
 * @return {JSX.Element} The rendered chat interface component.
 */
const ChatInterface = (props) => {
  const {
    question,
    questionId,
    choices,
    handleSubmitAnswer,
    isPractice,
    selected,
    selectedValue,
    submitLoading,
    enrolledQuest,
    questDoc,
    openChat,
    setStart,
    isQuestionsLoading,
    explanationOpened,
    levelDetails,
    isComplete,
    user,
    ...optionItemProps
  } = props;

  useEffect(() => {
    setStart(true);
  }, []);

  const renderLoader = () => {
    return (
      <Grid {...sharedStyles.secondaryLoaderGridProps}>
        <CircularProgress color="secondary" size={35} />
      </Grid>
    );
  };

  const renderBgImage = () => {
    return (
      <Grid {...styles.imageGridProps}>
        <Image
          src={levelDetails?.quizBackground}
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmerEffect('100%', '100%')
          )}`}
          {...styles.bgImageProps}
        />
      </Grid>
    );
  };

  const renderAvatar = () => {
    return (
      <Grid {...styles.avatarGridProps}>
        <Avatar {...styles.avatarProps}>
          <Image
            placeholder="blur"
            src={ReXIconAvatar}
            {...styles.avatarImgProps}
          />
        </Avatar>
      </Grid>
    );
  };

  const renderQuestion = () => {
    return (
      <Grid {...styles.textGridProps}>
        <Typography {...styles.textProps}>{question}</Typography>
      </Grid>
    );
  };

  const renderQuestionHeader = () => {
    return (
      <Grid {...styles.headerGridProps(isPractice)}>
        <Grid {...styles.questionGridProps}>
          {renderAvatar()}
          {renderQuestion()}
        </Grid>
      </Grid>
    );
  };

  const renderOptions = () => {
    return (
      <Grid {...styles.optionsGridProps(explanationOpened)}>
        {choices?.map((option, index) => (
          <OptionItem
            key={`option-${option.id}`}
            text={option.value}
            index={index}
            explanationOpened={explanationOpened}
            selected={selected}
            {...optionItemProps}
          />
        ))}
      </Grid>
    );
  };

  const renderSubmit = () => {
    return (
      <Grid {...styles.submitGridProps}>
        <Button
          onClick={handleSubmitAnswer}
          disabled={!selected || submitLoading}
          {...styles.submitProps}
        >
          {submitLoading ? renderLoader() : 'Submit Answer'}
        </Button>
      </Grid>
    );
  };

  const renderMainContent = () => {
    return (
      <Slide {...styles.chatSlideProps(openChat)}>
        <Grid {...styles.chatGridProps(isComplete)}>
          {renderQuestionHeader()}
          {renderOptions()}
          {!isPractice && renderSubmit()}
        </Grid>
      </Slide>
    );
  };

  const renderMasterChat = () => {
    return (
      <Slide {...styles.masterChatSlideProps(openChat)}>
        <Grid {...styles.workspaceGridProps}>
          <MasterChat />
        </Grid>
      </Slide>
    );
  };

  const renderChat = () => {
    return (
      <>
        {renderBgImage()}
        {renderMainContent()}
        {isPractice && renderMasterChat()}
      </>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {isQuestionsLoading && renderLoader()}
      {!isQuestionsLoading && renderChat()}
    </Grid>
  );
};

export default ChatInterface;

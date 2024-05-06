import moment from 'moment';

import STATUS from '@/constants/mission';
import {
  DIFFICULTY_LEVELS,
  EXPEDITION_TYPES,
  QUEST_FILTERS,
} from '@/constants/quests';

/**
 * Generates an object with information about the enrolled quest's practice status.
 *
 * @param {Object} enrolledQuest - The enrolled quest object.
 * @return {Object} - An object containing information about the quest's practice status.
 */
const getMapProps = (enrolledQuest) => {
  const practiceStatus = {};
  const practiceTitles = {};

  enrolledQuest?.practice?.forEach((item) => {
    if (!practiceStatus[item.level])
      practiceStatus[item.level] = STATUS.NOT_STARTED;
  });

  const practiceStatusKeys = Object.keys(practiceStatus);

  practiceStatusKeys.forEach((key) => {
    const isIncomplete = enrolledQuest?.practice
      .filter((answers) => parseInt(answers.level, 10) === parseInt(key, 10))
      .some((answer) => answer.status === STATUS.INCOMPLETE);

    const isComplete = enrolledQuest?.practice
      .filter((answers) => parseInt(answers.level, 10) === parseInt(key, 10))
      .every((answer) => answer.status === STATUS.COMPLETED);

    const levelStarted = enrolledQuest?.practice
      .filter((answers) => parseInt(answers.level, 10) === parseInt(key, 10))
      .some((answer) => answer.status === STATUS.IN_PROGRESS);

    const setStatus = () => {
      if (isIncomplete) return STATUS.INCOMPLETE;
      if (isComplete) return STATUS.COMPLETED;
      if (levelStarted) return STATUS.IN_PROGRESS;
      return STATUS.NOT_STARTED;
    };

    practiceStatus[key] = setStatus();
  });

  const practiceComplete = Object.keys(practiceStatus).every(
    (key) =>
      practiceStatus[key] === STATUS.COMPLETED ||
      practiceStatus[key] === STATUS.INCOMPLETE
  );

  const questIsComplete = [STATUS.COMPLETED, STATUS.INCOMPLETE].includes(
    enrolledQuest?.status
  );

  const assessmentStarted = [STATUS.IN_PROGRESS].includes(
    enrolledQuest?.status
  );

  const currentLevel = Object.keys(practiceStatus).find(
    (key) => practiceStatus[key] === STATUS.IN_PROGRESS
  );

  const nextLevel = Object.keys(practiceStatus).find(
    (key) => practiceStatus[key] === STATUS.NOT_STARTED
  );

  return {
    isCompleted: questIsComplete,
    practiceIsComplete: practiceComplete,
    practiceStatus,
    currentLevel,
    nextLevel,
    assessmentStarted,
    practiceTitles,
    totalLevels: practiceStatusKeys.length,
  };
};

/**
 * Retrieves the current assessment question and its associated details.
 *
 * @param {Object} assessments - The assessments object containing the questions.
 * @param {string} questionId - The id of the current question.
 * @return {Object} An object containing the order, question, choices, and updateProgress of the current question.
 */
const getCurrentAssessment = (assessments, questionId) => {
  const currentQuestion = assessments?.[questionId];

  if (!currentQuestion)
    return {
      order: 0,
      question: null,
      choices: null,
      updateProgress: 0,
    };

  const { order, question, choices } = currentQuestion;

  const progressBaseUnit = Math.floor(100 / 25);
  const updateProgress = order * progressBaseUnit;

  return {
    order,
    question,
    choices,
    updateProgress,
  };
};

/**
 * Retrieves the current practice question based on the provided parameters.
 *
 * @param {Array} practiceLevelQuestions - An array of practice level questions.
 * @param {number} currentQuestion - The ID of the current question.
 * @param {number} correctQuestions - The number of correct questions.
 * @return {Object} An object containing information about the current practice question.
 */
const getCurrentPractice = (
  practiceLevelQuestions,
  currentQuestion,
  correctQuestions
) => {
  const currentPracticeQuestion = practiceLevelQuestions?.find(
    (question) => question.id === currentQuestion
  );

  if (!currentPracticeQuestion)
    return {
      lastQuestion: false,
      questionsCorrect: 0,
      question: null,
      choices: null,
      updateProgress: 0,
    };

  const { question, choices, solution, explanation, id } =
    currentPracticeQuestion;

  const progressBaseUnit = Math.floor(100 / 10);
  const updateProgress = correctQuestions * progressBaseUnit;

  return {
    isLastQuestion: correctQuestions >= 9,
    question,
    choices,
    explanation,
    solution,
    updateProgress,
    id,
  };
};

/**
 * Generates a formatted date range string.
 *
 * @param {Date} startTime - The start time of the range.
 * @param {Date} endTime - The end time of the range.
 * @return {string} The formatted date range string.
 */
const formatDateRange = (startTime, endTime) => {
  const startFormatted = `${moment(startTime).format('MMM')} ${moment(
    startTime
  ).format('DD')}`;
  const endFormatted = `${moment(endTime).format('MMM')} ${moment(
    endTime
  ).format('DD')}`;

  return `${startFormatted} - ${endFormatted}`;
};

/**
 * Formats a number by adding a suffix for thousands, millions, billions, or trillions.
 *
 * @param {number} num - The number to be formatted.
 * @return {string} The formatted number with a suffix.
 */
const formatPrizePool = (num) => {
  if (num === 0) return '0';
  if (!num) return null;
  if (num < 1000) return num;

  const units = ['K', 'M', 'B', 'T'];
  const unit = Math.floor((num.toFixed(0).length - 1) / 3) * 3;
  let numStr = (num / `1e${unit}`).toFixed(1);
  const unitName = units[(unit - 3) / 3];

  if (num >= 100000) numStr = Math.round(numStr);

  return `${parseFloat(numStr)}${unitName}`;
};

/**
 * Filters challenges based on the given status, difficulty, category, and sets the filtered challenges.
 *
 * @param {Array} challenges - The array of challenges to filter.
 * @param {string} status - The status to filter by. Possible values are "LIVE", "UPCOMING", "PAST".
 * @param {string} difficulty - The difficulty level to filter by. Possible values are "beginner", "intermediate", "advanced".
 * @param {string} category - The category to filter by. Possible values are "AI", "DEV", "PM", "DES", "DATA".
 * @param {function} setFilteredChallenges - The function to set the filtered challenges.
 */
const filterChallenges = (
  challenges,
  status,
  difficulty,
  category,
  setFilteredChallenges
) => {
  const currentTime = Date.now();
  let filteredChallenges;

  switch (status) {
    case QUEST_FILTERS.LIVE:
      filteredChallenges = challenges
        .filter(
          (challenge) =>
            currentTime >= challenge.startTime &&
            currentTime <= challenge.endTime
        )
        .sort((a, b) => b.startTime - a.startTime);
      break;
    case QUEST_FILTERS.UPCOMING:
      filteredChallenges = challenges
        .filter((challenge) => currentTime < challenge.startTime)
        .sort((a, b) => a.startTime - b.startTime);
      break;
    case QUEST_FILTERS.PAST:
      filteredChallenges = challenges
        .filter((challenge) => currentTime > challenge.endTime)
        .sort((a, b) => b.endTime - a.endTime);
      break;
    default:
      filteredChallenges = challenges;
  }

  switch (difficulty) {
    case DIFFICULTY_LEVELS.BEGINNER.id:
      filteredChallenges = filteredChallenges.filter(
        (challenge) => challenge.difficulty === DIFFICULTY_LEVELS.BEGINNER.id
      );
      break;
    case DIFFICULTY_LEVELS.INTERMEDIATE.id:
      filteredChallenges = filteredChallenges.filter(
        (challenge) =>
          challenge.difficulty === DIFFICULTY_LEVELS.INTERMEDIATE.id
      );
      break;
    case DIFFICULTY_LEVELS.ADVANCED.id:
      filteredChallenges = filteredChallenges.filter(
        (challenge) => challenge.difficulty === DIFFICULTY_LEVELS.ADVANCED.id
      );
      break;
    default:
      break;
  }

  switch (category) {
    case EXPEDITION_TYPES.AI:
      filteredChallenges = filteredChallenges.filter(
        (challenge) => challenge.categoryId === EXPEDITION_TYPES.AI
      );
      break;
    case EXPEDITION_TYPES.DEV:
      filteredChallenges = filteredChallenges.filter(
        (challenge) => challenge.categoryId === EXPEDITION_TYPES.DEV
      );
      break;
    case EXPEDITION_TYPES.PM:
      filteredChallenges = filteredChallenges.filter(
        (challenge) => challenge.categoryId === EXPEDITION_TYPES.PM
      );
      break;
    case EXPEDITION_TYPES.DES:
      filteredChallenges = filteredChallenges.filter(
        (challenge) => challenge.categoryId === EXPEDITION_TYPES.DES
      );
      break;
    case EXPEDITION_TYPES.DATA:
      filteredChallenges = filteredChallenges.filter(
        (challenge) => challenge.categoryId === EXPEDITION_TYPES.DATA
      );
      break;
    default:
      break;
  }

  setFilteredChallenges(filteredChallenges);
};

export {
  getMapProps,
  getCurrentAssessment,
  getCurrentPractice,
  formatDateRange,
  formatPrizePool,
  filterChallenges,
};

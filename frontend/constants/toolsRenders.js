import FlashCardList from '@/templates/History/FlashCardList';
import MultipleChoiceResponse from '@/templates/History/MultipleChoiceResponse';

import TOOLS_ID from './tools';

const TOOLS_RENDERS = {
  [TOOLS_ID.GEMINI_DYNAMO]: FlashCardList,
  [TOOLS_ID.GEMINI_QUIZIFY]: MultipleChoiceResponse,
};

export default TOOLS_RENDERS;

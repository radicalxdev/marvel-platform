import TOOLS_ID from './tools';

import FlashCardListUtils from '@/utils/ToolSessionResponseUtils/FlashCardListUtils';
import MultipleChoiceResponseUtils from '@/utils/ToolSessionResponseUtils/MultipleChoiceResponseUtils';

const TOOLS_SESSION_UTILS_TYPE = {
  [TOOLS_ID.GEMINI_DYNAMO]: FlashCardListUtils,
  [TOOLS_ID.GEMINI_QUIZIFY]: MultipleChoiceResponseUtils,
};

export default TOOLS_SESSION_UTILS_TYPE;

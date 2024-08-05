import TOOLS_ID from './tools';

import FlashCardListUtils from '@/utils/ToolsHistoryUtils/FlashCardListUtils';
import MultipleChoiceResponseUtils from '@/utils/ToolsHistoryUtils/MultipleChoiceResponseUtils';

const TOOLS_RENDERS = {
  [TOOLS_ID.GEMINI_DYNAMO]: FlashCardListUtils,
  [TOOLS_ID.GEMINI_QUIZIFY]: MultipleChoiceResponseUtils,
};

export default TOOLS_RENDERS;

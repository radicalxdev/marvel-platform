import FlashCardsOutput from '@/components/ToolOutputHistoryDrawer/toolRenderers/FlashCardsOutput';
import MultipleChoiceQuizOutput from '@/components/ToolOutputHistoryDrawer/toolRenderers/MultipleChoiceQuizOutput';

import TOOLS_ID from './tools';

const TOOL_RENDERS = {
  [TOOLS_ID.GEMINI_DYNAMO]: FlashCardsOutput,
  [TOOLS_ID.GEMINI_QUIZIFY]: MultipleChoiceQuizOutput,
};

export default TOOL_RENDERS;

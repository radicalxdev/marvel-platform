import FlashCardPreview from '@/components/ToolsSessionHistoryPreviewDrawer/FlashCardPreview';
import MultipleChoicePreview from '@/components/ToolsSessionHistoryPreviewDrawer/MultipleChoicePreview';

import TOOLS_ID from './tools';

const TOOLS_PREVIEWS = {
  [TOOLS_ID.GEMINI_DYNAMO]: FlashCardPreview,
  [TOOLS_ID.GEMINI_QUIZIFY]: MultipleChoicePreview,
};

export default TOOLS_PREVIEWS;

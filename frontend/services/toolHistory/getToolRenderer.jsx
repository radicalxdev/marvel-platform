import { TOOL_NAMES } from '@/constants/tool_IDs';

const TOOL_RENDERERS = {};
const req = require.context(
  '../../components/ToolOutputHistoryDrawer/toolRenderers',
  true,
  /\.jsx$/
);

req.keys().forEach((key) => {
  const toolRendererName = key.replace('./', '').replace('.jsx', '');
  TOOL_RENDERERS[toolRendererName] = req(key).default;
});

/**
 * Returns the corresponding tool renderer to be used in the drawer for a given tool session.
 *
 * @param {Object} toolData - The data of the tool.
 * @returns {Object} An object containing the corresponding renderer function.
 */
const getToolRenderer = (toolData) => {
  const toolRendererName = TOOL_NAMES[toolData.toolId];

  const toolRenderer = TOOL_RENDERERS[toolRendererName];

  return {
    toolRenderer,
  };
};

export default getToolRenderer;

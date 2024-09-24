const MESSAGE_ROLES = {
  SYSTEM: 'system',
  HUMAN: 'human',
  AI: 'ai',
};

const BOT_TYPE = {
  CHAT: 'chat',
  TOOL: 'tool',
};

const AI_ENDPOINTS = {
  [BOT_TYPE.CHAT]: '/chat',
  [BOT_TYPE.TOOL]: '/submit-tool',
};

const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  GIF: 'gif',
  OPTIONS: 'options',
  QUICK_REPLY: 'quick_reply',
};

module.exports = {
  MESSAGE_ROLES,
  MESSAGE_TYPES,
  BOT_TYPE,
  AI_ENDPOINTS,
};

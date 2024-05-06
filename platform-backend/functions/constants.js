const STATUS = {
  NOT_STARTED: "not-started",
  IN_PROGRESS: "in-progress",
  INCOMPLETE: "incomplete",
  SKIPPED: "skipped",
  COMPLETED: "completed",
};

const CHALLENGE_STATUS = {
  NOT_STARTED: "not-started",
  IN_PRACTICE: "in-practice",
  IN_TAKS: "in-tasks",
  COMPLETED: "completed",
};

const DIFFICULTY = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
};

const MESSAGE_ROLES = {
  SYSTEM: "system",
  HUMAN: "human",
  AI: "ai",
};

const BOT_TYPE = {
  MISSION: "mission",
  TEACH_ME: "teach_me",
  EXPLAIN_MY_ANSWER: "ema",
  PLAY_GAME: "play_game",
  HACKATHON: "hackathon",
};

const MESSAGE_TYPES = {
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  AUDIO: "audio",
  GIF: "gif",
  OPTIONS: "options",
  QUICK_REPLY: "quick_reply",
};

const SUBSCRIPTION_PLAN_PRICES = {
  FREE: 0,
  PRO: 1999,
  PRO_MAX: 4999,
};

const SUBSCRIPTION_MONTHLY_DIAMONDS = {
  [SUBSCRIPTION_PLAN_PRICES.FREE]: 300,
  [SUBSCRIPTION_PLAN_PRICES.PRO]: 1200,
  [SUBSCRIPTION_PLAN_PRICES.PRO_MAX]: 3000,
};

const STRIPE_EVENTS = {
  CHECKOUT_SESSION_COMPLETED: "com.stripe.v1.checkout.session.completed",
  CUSTOMER_SUBSCRIPTION_UPDATED: "com.stripe.v1.customer.subscription.updated",
  CUSTOMER_SUBSCRIPTION_DELETED: "com.stripe.v1.customer.subscription.deleted",
};

const PROFICIENCY = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
};

const SQUAD_ROLE = {
  MEMBER: "member",
  ADMIN: "admin",
};

const SQUAD_STATUS = {
  NOT_SEEKING: "not seeking",
  ACTIVE: "actively looking",
};

const INTERNAL_DIAMONDS_PERCENTAGE = 0.2;
const PRIZE_POOL_PERCENTAGE = 0.8;

module.exports = {
  CHALLENGE_STATUS,
  DIFFICULTY,
  INTERNAL_DIAMONDS_PERCENTAGE,
  SUBSCRIPTION_PLAN_PRICES,
  SUBSCRIPTION_MONTHLY_DIAMONDS,
  PRIZE_POOL_PERCENTAGE,
  STATUS,
  STRIPE_EVENTS,
  MESSAGE_ROLES,
  MESSAGE_TYPES,
  BOT_TYPE,
  PROFICIENCY,
  SQUAD_STATUS,
  SQUAD_ROLE,
};

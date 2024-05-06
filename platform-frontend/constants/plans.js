const PAYMENT_PLANS = {
  FREE: 'free',
  LITE: 'lite',
  PRO: 'pro',
  ULTRA: 'ultra',
};

const PAYMENT_INTERVALS = {
  MONTHLY: 'month',
  YEARLY: 'year',
};

const PAYMENT_PLAN_BANNERS = {
  [PAYMENT_PLANS.LITE]:
    'https://firebasestorage.googleapis.com/v0/b/radicalx-68127.appspot.com/o/PaymentPlan%2FLitePlanImg.png?alt=media&token=912c3603-3039-47e4-ace0-42c6294c67eb',
  [PAYMENT_PLANS.PRO]:
    'https://firebasestorage.googleapis.com/v0/b/radicalx-68127.appspot.com/o/PaymentPlan%2FProPlanImg.png?alt=media&token=4641d32f-c5ec-449f-9638-6e73a9b90cb2',
  [PAYMENT_PLANS.ULTRA]:
    'https://firebasestorage.googleapis.com/v0/b/radicalx-68127.appspot.com/o/PaymentPlan%2FUltraPlanImg.png?alt=media&token=5f672b8f-ee2f-45d9-9914-c5c90273e659',
};

export { PAYMENT_PLANS, PAYMENT_INTERVALS, PAYMENT_PLAN_BANNERS };

const ONBOARDING_REGEX = {
  fullName: { required: 'Full Name is required!' },
  occupation: { required: 'Occupation is required!' },
  facebook: {
    pattern: {
      value: /https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._-]+\/?/,
      message: 'Invalid Facebook URL',
    },
  },
  linkedin: {
    pattern: {
      value: /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/gm,
      message: 'Invalid LinkedIn URL',
    },
  },
  x: {
    pattern: {
      value: /https?:\/\/(www\.)?x\.com\/\w+/g,
      message: 'Invalid X URL',
    },
  },
  bio: {
    validate: (fieldValue) =>
      fieldValue ? fieldValue.trim().split(/\s+/).length <= 200 : true,
  },
};

export default ONBOARDING_REGEX;

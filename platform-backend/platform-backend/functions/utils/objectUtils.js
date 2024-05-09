const isObject = (obj) =>
  obj !== null && typeof obj === 'object' && !Array.isArray(obj);

const isObjectEmpty = (obj) =>
  obj === undefined || obj === null || (obj && Object.entries(obj).length <= 0);

module.exports = {
  isObject,
  isObjectEmpty,
};

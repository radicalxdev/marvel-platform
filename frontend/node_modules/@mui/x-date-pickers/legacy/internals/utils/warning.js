import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
export var buildDeprecatedPropsWarning = function buildDeprecatedPropsWarning(message) {
  var alreadyWarned = false;
  if (process.env.NODE_ENV === 'production') {
    return function () {};
  }
  var cleanMessage = Array.isArray(message) ? message.join('\n') : message;
  return function (deprecatedProps) {
    var deprecatedKeys = Object.entries(deprecatedProps).filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        value = _ref2[1];
      return value !== undefined;
    }).map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
        key = _ref4[0];
      return "- ".concat(key);
    });
    if (!alreadyWarned && deprecatedKeys.length > 0) {
      alreadyWarned = true;
      console.warn([cleanMessage, 'deprecated props observed:'].concat(_toConsumableArray(deprecatedKeys)).join('\n'));
    }
  };
};
export var buildWarning = function buildWarning(message) {
  var gravity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'warning';
  var alreadyWarned = false;
  var cleanMessage = Array.isArray(message) ? message.join('\n') : message;
  return function () {
    if (!alreadyWarned) {
      alreadyWarned = true;
      if (gravity === 'error') {
        console.error(cleanMessage);
      } else {
        console.warn(cleanMessage);
      }
    }
  };
};
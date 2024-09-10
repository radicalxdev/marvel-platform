"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTimeField = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _valueManagers = require("../internals/utils/valueManagers");
var _useField = require("../internals/hooks/useField");
var _validateTime = require("../internals/utils/validation/validateTime");
var _useUtils = require("../internals/hooks/useUtils");
var _fields = require("../internals/utils/fields");
const useDefaultizedTimeField = props => {
  const utils = (0, _useUtils.useUtils)();
  const ampm = props.ampm ?? utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h;
  return (0, _extends2.default)({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? defaultFormat
  });
};
const useTimeField = ({
  props: inProps,
  inputRef
}) => {
  const props = useDefaultizedTimeField(inProps);
  const {
    forwardedProps,
    internalProps
  } = (0, _fields.splitFieldInternalAndForwardedProps)(props, 'time');
  return (0, _useField.useField)({
    inputRef,
    forwardedProps,
    internalProps,
    valueManager: _valueManagers.singleItemValueManager,
    fieldValueManager: _valueManagers.singleItemFieldValueManager,
    validator: _validateTime.validateTime,
    valueType: 'time'
  });
};
exports.useTimeField = useTimeField;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDateTimeField = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _valueManagers = require("../internals/utils/valueManagers");
var _useField = require("../internals/hooks/useField");
var _validateDateTime = require("../internals/utils/validation/validateDateTime");
var _dateUtils = require("../internals/utils/date-utils");
var _useUtils = require("../internals/hooks/useUtils");
var _fields = require("../internals/utils/fields");
const useDefaultizedDateTimeField = props => {
  const utils = (0, _useUtils.useUtils)();
  const defaultDates = (0, _useUtils.useDefaultDates)();
  const ampm = props.ampm ?? utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.keyboardDateTime12h : utils.formats.keyboardDateTime24h;
  return (0, _extends2.default)({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? defaultFormat,
    disableIgnoringDatePartForTimeValidation: Boolean(props.minDateTime || props.maxDateTime),
    minDate: (0, _dateUtils.applyDefaultDate)(utils, props.minDateTime ?? props.minDate, defaultDates.minDate),
    maxDate: (0, _dateUtils.applyDefaultDate)(utils, props.maxDateTime ?? props.maxDate, defaultDates.maxDate),
    minTime: props.minDateTime ?? props.minTime,
    maxTime: props.maxDateTime ?? props.maxTime
  });
};
const useDateTimeField = ({
  props: inProps,
  inputRef
}) => {
  const props = useDefaultizedDateTimeField(inProps);
  const {
    forwardedProps,
    internalProps
  } = (0, _fields.splitFieldInternalAndForwardedProps)(props, 'date-time');
  return (0, _useField.useField)({
    inputRef,
    forwardedProps,
    internalProps,
    valueManager: _valueManagers.singleItemValueManager,
    fieldValueManager: _valueManagers.singleItemFieldValueManager,
    validator: _validateDateTime.validateDateTime,
    valueType: 'date-time'
  });
};
exports.useDateTimeField = useDateTimeField;
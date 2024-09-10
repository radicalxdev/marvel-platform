"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDateField = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _valueManagers = require("../internals/utils/valueManagers");
var _useField = require("../internals/hooks/useField");
var _validateDate = require("../internals/utils/validation/validateDate");
var _dateUtils = require("../internals/utils/date-utils");
var _useUtils = require("../internals/hooks/useUtils");
var _fields = require("../internals/utils/fields");
const useDefaultizedDateField = props => {
  const utils = (0, _useUtils.useUtils)();
  const defaultDates = (0, _useUtils.useDefaultDates)();
  return (0, _extends2.default)({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? utils.formats.keyboardDate,
    minDate: (0, _dateUtils.applyDefaultDate)(utils, props.minDate, defaultDates.minDate),
    maxDate: (0, _dateUtils.applyDefaultDate)(utils, props.maxDate, defaultDates.maxDate)
  });
};
const useDateField = ({
  props: inProps,
  inputRef
}) => {
  const props = useDefaultizedDateField(inProps);
  const {
    forwardedProps,
    internalProps
  } = (0, _fields.splitFieldInternalAndForwardedProps)(props, 'date');
  return (0, _useField.useField)({
    inputRef,
    forwardedProps,
    internalProps,
    valueManager: _valueManagers.singleItemValueManager,
    fieldValueManager: _valueManagers.singleItemFieldValueManager,
    validator: _validateDate.validateDate,
    valueType: 'date'
  });
};
exports.useDateField = useDateField;
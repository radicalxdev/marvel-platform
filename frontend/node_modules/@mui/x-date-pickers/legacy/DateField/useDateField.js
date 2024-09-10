import _extends from "@babel/runtime/helpers/esm/extends";
import { singleItemFieldValueManager, singleItemValueManager } from '../internals/utils/valueManagers';
import { useField } from '../internals/hooks/useField';
import { validateDate } from '../internals/utils/validation/validateDate';
import { applyDefaultDate } from '../internals/utils/date-utils';
import { useUtils, useDefaultDates } from '../internals/hooks/useUtils';
import { splitFieldInternalAndForwardedProps } from '../internals/utils/fields';
var useDefaultizedDateField = function useDefaultizedDateField(props) {
  var _props$disablePast, _props$disableFuture, _props$format;
  var utils = useUtils();
  var defaultDates = useDefaultDates();
  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : utils.formats.keyboardDate,
    minDate: applyDefaultDate(utils, props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, props.maxDate, defaultDates.maxDate)
  });
};
export var useDateField = function useDateField(_ref) {
  var inProps = _ref.props,
    inputRef = _ref.inputRef;
  var props = useDefaultizedDateField(inProps);
  var _splitFieldInternalAn = splitFieldInternalAndForwardedProps(props, 'date'),
    forwardedProps = _splitFieldInternalAn.forwardedProps,
    internalProps = _splitFieldInternalAn.internalProps;
  return useField({
    inputRef: inputRef,
    forwardedProps: forwardedProps,
    internalProps: internalProps,
    valueManager: singleItemValueManager,
    fieldValueManager: singleItemFieldValueManager,
    validator: validateDate,
    valueType: 'date'
  });
};
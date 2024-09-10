import _extends from "@babel/runtime/helpers/esm/extends";
import { singleItemFieldValueManager, singleItemValueManager } from '../internals/utils/valueManagers';
import { useField } from '../internals/hooks/useField';
import { validateTime } from '../internals/utils/validation/validateTime';
import { useUtils } from '../internals/hooks/useUtils';
import { splitFieldInternalAndForwardedProps } from '../internals/utils/fields';
var useDefaultizedTimeField = function useDefaultizedTimeField(props) {
  var _props$ampm, _props$disablePast, _props$disableFuture, _props$format;
  var utils = useUtils();
  var ampm = (_props$ampm = props.ampm) != null ? _props$ampm : utils.is12HourCycleInCurrentLocale();
  var defaultFormat = ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h;
  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : defaultFormat
  });
};
export var useTimeField = function useTimeField(_ref) {
  var inProps = _ref.props,
    inputRef = _ref.inputRef;
  var props = useDefaultizedTimeField(inProps);
  var _splitFieldInternalAn = splitFieldInternalAndForwardedProps(props, 'time'),
    forwardedProps = _splitFieldInternalAn.forwardedProps,
    internalProps = _splitFieldInternalAn.internalProps;
  return useField({
    inputRef: inputRef,
    forwardedProps: forwardedProps,
    internalProps: internalProps,
    valueManager: singleItemValueManager,
    fieldValueManager: singleItemFieldValueManager,
    validator: validateTime,
    valueType: 'time'
  });
};
import _extends from "@babel/runtime/helpers/esm/extends";
import { singleItemFieldValueManager, singleItemValueManager } from '../internals/utils/valueManagers';
import { useField } from '../internals/hooks/useField';
import { validateDateTime } from '../internals/utils/validation/validateDateTime';
import { applyDefaultDate } from '../internals/utils/date-utils';
import { useUtils, useDefaultDates } from '../internals/hooks/useUtils';
import { splitFieldInternalAndForwardedProps } from '../internals/utils/fields';
const useDefaultizedDateTimeField = props => {
  var _props$ampm, _props$disablePast, _props$disableFuture, _props$format, _props$minDateTime, _props$maxDateTime, _props$minDateTime2, _props$maxDateTime2;
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const ampm = (_props$ampm = props.ampm) != null ? _props$ampm : utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.keyboardDateTime12h : utils.formats.keyboardDateTime24h;
  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : defaultFormat,
    disableIgnoringDatePartForTimeValidation: Boolean(props.minDateTime || props.maxDateTime),
    minDate: applyDefaultDate(utils, (_props$minDateTime = props.minDateTime) != null ? _props$minDateTime : props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, (_props$maxDateTime = props.maxDateTime) != null ? _props$maxDateTime : props.maxDate, defaultDates.maxDate),
    minTime: (_props$minDateTime2 = props.minDateTime) != null ? _props$minDateTime2 : props.minTime,
    maxTime: (_props$maxDateTime2 = props.maxDateTime) != null ? _props$maxDateTime2 : props.maxTime
  });
};
export const useDateTimeField = ({
  props: inProps,
  inputRef
}) => {
  const props = useDefaultizedDateTimeField(inProps);
  const {
    forwardedProps,
    internalProps
  } = splitFieldInternalAndForwardedProps(props, 'date-time');
  return useField({
    inputRef,
    forwardedProps,
    internalProps,
    valueManager: singleItemValueManager,
    fieldValueManager: singleItemFieldValueManager,
    validator: validateDateTime,
    valueType: 'date-time'
  });
};
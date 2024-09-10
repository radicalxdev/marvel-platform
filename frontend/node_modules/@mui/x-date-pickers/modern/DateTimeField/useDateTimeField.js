import _extends from "@babel/runtime/helpers/esm/extends";
import { singleItemFieldValueManager, singleItemValueManager } from '../internals/utils/valueManagers';
import { useField } from '../internals/hooks/useField';
import { validateDateTime } from '../internals/utils/validation/validateDateTime';
import { applyDefaultDate } from '../internals/utils/date-utils';
import { useUtils, useDefaultDates } from '../internals/hooks/useUtils';
import { splitFieldInternalAndForwardedProps } from '../internals/utils/fields';
const useDefaultizedDateTimeField = props => {
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const ampm = props.ampm ?? utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.keyboardDateTime12h : utils.formats.keyboardDateTime24h;
  return _extends({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? defaultFormat,
    disableIgnoringDatePartForTimeValidation: Boolean(props.minDateTime || props.maxDateTime),
    minDate: applyDefaultDate(utils, props.minDateTime ?? props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, props.maxDateTime ?? props.maxDate, defaultDates.maxDate),
    minTime: props.minDateTime ?? props.minTime,
    maxTime: props.maxDateTime ?? props.maxTime
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
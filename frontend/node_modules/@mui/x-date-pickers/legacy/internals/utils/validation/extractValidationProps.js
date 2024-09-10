export var DATE_VALIDATION_PROP_NAMES = ['disablePast', 'disableFuture', 'minDate', 'maxDate', 'shouldDisableDate', 'shouldDisableMonth', 'shouldDisableYear'];
export var TIME_VALIDATION_PROP_NAMES = ['disablePast', 'disableFuture', 'minTime', 'maxTime', 'shouldDisableClock', 'shouldDisableTime', 'minutesStep', 'ampm', 'disableIgnoringDatePartForTimeValidation'];
export var DATE_TIME_VALIDATION_PROP_NAMES = ['minDateTime', 'maxDateTime'];
var VALIDATION_PROP_NAMES = [].concat(DATE_VALIDATION_PROP_NAMES, TIME_VALIDATION_PROP_NAMES, DATE_TIME_VALIDATION_PROP_NAMES);
/**
 * Extract the validation props for the props received by a component.
 * Limit the risk of forgetting some of them and reduce the bundle size.
 */
export var extractValidationProps = function extractValidationProps(props) {
  return VALIDATION_PROP_NAMES.reduce(function (extractedProps, propName) {
    if (props.hasOwnProperty(propName)) {
      extractedProps[propName] = props[propName];
    }
    return extractedProps;
  }, {});
};
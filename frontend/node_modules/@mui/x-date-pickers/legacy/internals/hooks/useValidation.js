import * as React from 'react';
import { useLocalizationContext } from './useUtils';
export function useValidation(props, validate, isSameError, defaultErrorState) {
  var value = props.value,
    onError = props.onError;
  var adapter = useLocalizationContext();
  var previousValidationErrorRef = React.useRef(defaultErrorState);
  var validationError = validate({
    adapter: adapter,
    value: value,
    props: props
  });
  React.useEffect(function () {
    if (onError && !isSameError(validationError, previousValidationErrorRef.current)) {
      onError(validationError, value);
    }
    previousValidationErrorRef.current = validationError;
  }, [isSameError, onError, previousValidationErrorRef, validationError, value]);
  return validationError;
}
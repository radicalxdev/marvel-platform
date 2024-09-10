import { validateDate } from './validateDate';
import { validateTime } from './validateTime';
export var validateDateTime = function validateDateTime(_ref) {
  var props = _ref.props,
    value = _ref.value,
    adapter = _ref.adapter;
  var dateValidationResult = validateDate({
    adapter: adapter,
    value: value,
    props: props
  });
  if (dateValidationResult !== null) {
    return dateValidationResult;
  }
  return validateTime({
    adapter: adapter,
    value: value,
    props: props
  });
};
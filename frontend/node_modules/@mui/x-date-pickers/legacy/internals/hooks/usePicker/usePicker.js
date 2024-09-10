import { usePickerValue } from './usePickerValue';
import { usePickerViews } from './usePickerViews';
import { usePickerLayoutProps } from './usePickerLayoutProps';
import { buildWarning } from '../../utils/warning';
var warnRenderInputIsDefined = buildWarning(['The `renderInput` prop has been removed in version 6.0 of the Date and Time Pickers.', 'You can replace it with the `textField` component slot in most cases.', 'For more information, please have a look at the migration guide (https://mui.com/x/migration/migration-pickers-v5/#input-renderer-required-in-v5).']);
export var usePicker = function usePicker(_ref) {
  var props = _ref.props,
    valueManager = _ref.valueManager,
    valueType = _ref.valueType,
    wrapperVariant = _ref.wrapperVariant,
    inputRef = _ref.inputRef,
    additionalViewProps = _ref.additionalViewProps,
    validator = _ref.validator,
    autoFocusView = _ref.autoFocusView;
  if (process.env.NODE_ENV !== 'production') {
    if (props.renderInput != null) {
      warnRenderInputIsDefined();
    }
  }
  var pickerValueResponse = usePickerValue({
    props: props,
    valueManager: valueManager,
    valueType: valueType,
    wrapperVariant: wrapperVariant,
    validator: validator
  });
  var pickerViewsResponse = usePickerViews({
    props: props,
    inputRef: inputRef,
    additionalViewProps: additionalViewProps,
    autoFocusView: autoFocusView,
    propsFromPickerValue: pickerValueResponse.viewProps
  });
  var pickerLayoutResponse = usePickerLayoutProps({
    props: props,
    wrapperVariant: wrapperVariant,
    propsFromPickerValue: pickerValueResponse.layoutProps,
    propsFromPickerViews: pickerViewsResponse.layoutProps
  });
  return {
    // Picker value
    open: pickerValueResponse.open,
    actions: pickerValueResponse.actions,
    fieldProps: pickerValueResponse.fieldProps,
    // Picker views
    renderCurrentView: pickerViewsResponse.renderCurrentView,
    hasUIView: pickerViewsResponse.hasUIView,
    shouldRestoreFocus: pickerViewsResponse.shouldRestoreFocus,
    // Picker layout
    layoutProps: pickerLayoutResponse.layoutProps
  };
};
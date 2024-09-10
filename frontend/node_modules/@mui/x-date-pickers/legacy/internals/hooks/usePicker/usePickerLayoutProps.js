import _extends from "@babel/runtime/helpers/esm/extends";
import { useIsLandscape } from '../useIsLandscape';

/**
 * Props used to create the layout of the views.
 * Those props are exposed on all the pickers.
 */

/**
 * Prepare the props for the view layout (managed by `PickersLayout`)
 */
export var usePickerLayoutProps = function usePickerLayoutProps(_ref) {
  var props = _ref.props,
    propsFromPickerValue = _ref.propsFromPickerValue,
    propsFromPickerViews = _ref.propsFromPickerViews,
    wrapperVariant = _ref.wrapperVariant;
  var orientation = props.orientation;
  var isLandscape = useIsLandscape(propsFromPickerViews.views, orientation);
  var layoutProps = _extends({}, propsFromPickerViews, propsFromPickerValue, {
    isLandscape: isLandscape,
    wrapperVariant: wrapperVariant,
    disabled: props.disabled,
    readOnly: props.readOnly
  });
  return {
    layoutProps: layoutProps
  };
};
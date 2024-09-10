import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["className", "selected", "value"];
import * as React from 'react';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { getPickersToolbarTextUtilityClass, pickersToolbarTextClasses } from './pickersToolbarTextClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    selected = ownerState.selected;
  var slots = {
    root: ['root', selected && 'selected']
  };
  return composeClasses(slots, getPickersToolbarTextUtilityClass, classes);
};
var PickersToolbarTextRoot = styled(Typography, {
  name: 'MuiPickersToolbarText',
  slot: 'Root',
  overridesResolver: function overridesResolver(_, styles) {
    return [styles.root, _defineProperty({}, "&.".concat(pickersToolbarTextClasses.selected), styles.selected)];
  }
})(function (_ref2) {
  var theme = _ref2.theme;
  return _defineProperty({
    transition: theme.transitions.create('color'),
    color: (theme.vars || theme).palette.text.secondary
  }, "&.".concat(pickersToolbarTextClasses.selected), {
    color: (theme.vars || theme).palette.text.primary
  });
});
export var PickersToolbarText = /*#__PURE__*/React.forwardRef(function PickersToolbarText(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiPickersToolbarText'
  });
  var className = props.className,
    selected = props.selected,
    value = props.value,
    other = _objectWithoutProperties(props, _excluded);
  var classes = useUtilityClasses(props);
  return /*#__PURE__*/_jsx(PickersToolbarTextRoot, _extends({
    ref: ref,
    className: clsx(className, classes.root),
    component: "span"
  }, other, {
    children: value
  }));
});
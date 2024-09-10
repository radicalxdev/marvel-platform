import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import Fade from '@mui/material/Fade';
import MuiDialog, { dialogClasses } from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import { DIALOG_WIDTH } from '../constants/dimensions';
import { jsx as _jsx } from "react/jsx-runtime";
const PickersModalDialogRoot = styled(MuiDialog)({
  [`& .${dialogClasses.container}`]: {
    outline: 0
  },
  [`& .${dialogClasses.paper}`]: {
    outline: 0,
    minWidth: DIALOG_WIDTH
  }
});
const PickersModalDialogContent = styled(DialogContent)({
  '&:first-of-type': {
    padding: 0
  }
});
export function PickersModalDialog(props) {
  var _slots$dialog, _slots$mobileTransiti;
  const {
    children,
    onDismiss,
    open,
    slots,
    slotProps
  } = props;
  const Dialog = (_slots$dialog = slots == null ? void 0 : slots.dialog) != null ? _slots$dialog : PickersModalDialogRoot;
  const Transition = (_slots$mobileTransiti = slots == null ? void 0 : slots.mobileTransition) != null ? _slots$mobileTransiti : Fade;
  return /*#__PURE__*/_jsx(Dialog, _extends({
    open: open,
    onClose: onDismiss
  }, slotProps == null ? void 0 : slotProps.dialog, {
    TransitionComponent: Transition,
    TransitionProps: slotProps == null ? void 0 : slotProps.mobileTransition,
    PaperComponent: slots == null ? void 0 : slots.mobilePaper,
    PaperProps: slotProps == null ? void 0 : slotProps.mobilePaper,
    children: /*#__PURE__*/_jsx(PickersModalDialogContent, {
      children: children
    })
  }));
}
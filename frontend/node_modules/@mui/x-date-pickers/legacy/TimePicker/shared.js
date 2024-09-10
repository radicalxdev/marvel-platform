import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { useUtils } from '../internals/hooks/useUtils';
import { TimePickerToolbar } from './TimePickerToolbar';
import { applyDefaultViewProps } from '../internals/utils/views';
import { uncapitalizeObjectKeys } from '../internals/utils/slots-migration';
export function useTimePickerDefaultizedProps(props, name) {
  var _themeProps$ampm, _themeProps$slots, _themeProps$slotProps, _themeProps$disableFu, _themeProps$disablePa;
  var utils = useUtils();
  var themeProps = useThemeProps({
    props: props,
    name: name
  });
  var ampm = (_themeProps$ampm = themeProps.ampm) != null ? _themeProps$ampm : utils.is12HourCycleInCurrentLocale();
  var localeText = React.useMemo(function () {
    var _themeProps$localeTex;
    if (((_themeProps$localeTex = themeProps.localeText) == null ? void 0 : _themeProps$localeTex.toolbarTitle) == null) {
      return themeProps.localeText;
    }
    return _extends({}, themeProps.localeText, {
      timePickerToolbarTitle: themeProps.localeText.toolbarTitle
    });
  }, [themeProps.localeText]);
  var slots = (_themeProps$slots = themeProps.slots) != null ? _themeProps$slots : uncapitalizeObjectKeys(themeProps.components);
  var slotProps = (_themeProps$slotProps = themeProps.slotProps) != null ? _themeProps$slotProps : themeProps.componentsProps;
  return _extends({}, themeProps, {
    ampm: ampm,
    localeText: localeText
  }, applyDefaultViewProps({
    views: themeProps.views,
    openTo: themeProps.openTo,
    defaultViews: ['hours', 'minutes'],
    defaultOpenTo: 'hours'
  }), {
    disableFuture: (_themeProps$disableFu = themeProps.disableFuture) != null ? _themeProps$disableFu : false,
    disablePast: (_themeProps$disablePa = themeProps.disablePast) != null ? _themeProps$disablePa : false,
    slots: _extends({
      toolbar: TimePickerToolbar
    }, slots),
    slotProps: _extends({}, slotProps, {
      toolbar: _extends({
        ampm: ampm,
        ampmInClock: themeProps.ampmInClock
      }, slotProps == null ? void 0 : slotProps.toolbar)
    })
  });
}
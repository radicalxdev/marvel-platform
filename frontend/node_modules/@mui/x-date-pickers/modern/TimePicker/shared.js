import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { useUtils } from '../internals/hooks/useUtils';
import { TimePickerToolbar } from './TimePickerToolbar';
import { applyDefaultViewProps } from '../internals/utils/views';
import { uncapitalizeObjectKeys } from '../internals/utils/slots-migration';
export function useTimePickerDefaultizedProps(props, name) {
  const utils = useUtils();
  const themeProps = useThemeProps({
    props,
    name
  });
  const ampm = themeProps.ampm ?? utils.is12HourCycleInCurrentLocale();
  const localeText = React.useMemo(() => {
    if (themeProps.localeText?.toolbarTitle == null) {
      return themeProps.localeText;
    }
    return _extends({}, themeProps.localeText, {
      timePickerToolbarTitle: themeProps.localeText.toolbarTitle
    });
  }, [themeProps.localeText]);
  const slots = themeProps.slots ?? uncapitalizeObjectKeys(themeProps.components);
  const slotProps = themeProps.slotProps ?? themeProps.componentsProps;
  return _extends({}, themeProps, {
    ampm,
    localeText
  }, applyDefaultViewProps({
    views: themeProps.views,
    openTo: themeProps.openTo,
    defaultViews: ['hours', 'minutes'],
    defaultOpenTo: 'hours'
  }), {
    disableFuture: themeProps.disableFuture ?? false,
    disablePast: themeProps.disablePast ?? false,
    slots: _extends({
      toolbar: TimePickerToolbar
    }, slots),
    slotProps: _extends({}, slotProps, {
      toolbar: _extends({
        ampm,
        ampmInClock: themeProps.ampmInClock
      }, slotProps?.toolbar)
    })
  });
}
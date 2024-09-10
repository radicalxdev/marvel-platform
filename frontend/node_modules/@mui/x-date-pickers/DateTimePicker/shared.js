import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { useDefaultDates, useUtils } from '../internals/hooks/useUtils';
import { applyDefaultDate } from '../internals/utils/date-utils';
import { DateTimePickerTabs } from './DateTimePickerTabs';
import { DateTimePickerToolbar } from './DateTimePickerToolbar';
import { applyDefaultViewProps } from '../internals/utils/views';
import { uncapitalizeObjectKeys } from '../internals/utils/slots-migration';
export function useDateTimePickerDefaultizedProps(props, name) {
  var _themeProps$ampm, _themeProps$slots, _themeProps$slotProps, _themeProps$orientati, _themeProps$disableIg, _themeProps$disableFu, _themeProps$disablePa, _themeProps$minDateTi, _themeProps$maxDateTi, _themeProps$minDateTi2, _themeProps$maxDateTi2;
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const themeProps = useThemeProps({
    props,
    name
  });
  const ampm = (_themeProps$ampm = themeProps.ampm) != null ? _themeProps$ampm : utils.is12HourCycleInCurrentLocale();
  const localeText = React.useMemo(() => {
    var _themeProps$localeTex;
    if (((_themeProps$localeTex = themeProps.localeText) == null ? void 0 : _themeProps$localeTex.toolbarTitle) == null) {
      return themeProps.localeText;
    }
    return _extends({}, themeProps.localeText, {
      dateTimePickerToolbarTitle: themeProps.localeText.toolbarTitle
    });
  }, [themeProps.localeText]);
  const slots = (_themeProps$slots = themeProps.slots) != null ? _themeProps$slots : uncapitalizeObjectKeys(themeProps.components);
  const slotProps = (_themeProps$slotProps = themeProps.slotProps) != null ? _themeProps$slotProps : themeProps.componentsProps;
  return _extends({}, themeProps, applyDefaultViewProps({
    views: themeProps.views,
    openTo: themeProps.openTo,
    defaultViews: ['year', 'day', 'hours', 'minutes'],
    defaultOpenTo: 'day'
  }), {
    ampm,
    localeText,
    orientation: (_themeProps$orientati = themeProps.orientation) != null ? _themeProps$orientati : 'portrait',
    // TODO: Remove from public API
    disableIgnoringDatePartForTimeValidation: (_themeProps$disableIg = themeProps.disableIgnoringDatePartForTimeValidation) != null ? _themeProps$disableIg : Boolean(themeProps.minDateTime || themeProps.maxDateTime ||
    // allow time clock to correctly check time validity: https://github.com/mui/mui-x/issues/8520
    themeProps.disablePast || themeProps.disableFuture),
    disableFuture: (_themeProps$disableFu = themeProps.disableFuture) != null ? _themeProps$disableFu : false,
    disablePast: (_themeProps$disablePa = themeProps.disablePast) != null ? _themeProps$disablePa : false,
    minDate: applyDefaultDate(utils, (_themeProps$minDateTi = themeProps.minDateTime) != null ? _themeProps$minDateTi : themeProps.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, (_themeProps$maxDateTi = themeProps.maxDateTime) != null ? _themeProps$maxDateTi : themeProps.maxDate, defaultDates.maxDate),
    minTime: (_themeProps$minDateTi2 = themeProps.minDateTime) != null ? _themeProps$minDateTi2 : themeProps.minTime,
    maxTime: (_themeProps$maxDateTi2 = themeProps.maxDateTime) != null ? _themeProps$maxDateTi2 : themeProps.maxTime,
    slots: _extends({
      toolbar: DateTimePickerToolbar,
      tabs: DateTimePickerTabs
    }, slots),
    slotProps: _extends({}, slotProps, {
      toolbar: _extends({
        ampm
      }, slotProps == null ? void 0 : slotProps.toolbar)
    })
  });
}
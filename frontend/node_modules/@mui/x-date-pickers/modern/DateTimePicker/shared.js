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
  const utils = useUtils();
  const defaultDates = useDefaultDates();
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
      dateTimePickerToolbarTitle: themeProps.localeText.toolbarTitle
    });
  }, [themeProps.localeText]);
  const slots = themeProps.slots ?? uncapitalizeObjectKeys(themeProps.components);
  const slotProps = themeProps.slotProps ?? themeProps.componentsProps;
  return _extends({}, themeProps, applyDefaultViewProps({
    views: themeProps.views,
    openTo: themeProps.openTo,
    defaultViews: ['year', 'day', 'hours', 'minutes'],
    defaultOpenTo: 'day'
  }), {
    ampm,
    localeText,
    orientation: themeProps.orientation ?? 'portrait',
    // TODO: Remove from public API
    disableIgnoringDatePartForTimeValidation: themeProps.disableIgnoringDatePartForTimeValidation ?? Boolean(themeProps.minDateTime || themeProps.maxDateTime ||
    // allow time clock to correctly check time validity: https://github.com/mui/mui-x/issues/8520
    themeProps.disablePast || themeProps.disableFuture),
    disableFuture: themeProps.disableFuture ?? false,
    disablePast: themeProps.disablePast ?? false,
    minDate: applyDefaultDate(utils, themeProps.minDateTime ?? themeProps.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, themeProps.maxDateTime ?? themeProps.maxDate, defaultDates.maxDate),
    minTime: themeProps.minDateTime ?? themeProps.minTime,
    maxTime: themeProps.maxDateTime ?? themeProps.maxTime,
    slots: _extends({
      toolbar: DateTimePickerToolbar,
      tabs: DateTimePickerTabs
    }, slots),
    slotProps: _extends({}, slotProps, {
      toolbar: _extends({
        ampm
      }, slotProps?.toolbar)
    })
  });
}
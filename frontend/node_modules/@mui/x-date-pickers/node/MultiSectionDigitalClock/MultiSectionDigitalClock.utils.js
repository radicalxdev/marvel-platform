"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeSectionOptions = exports.getHourSectionOptions = void 0;
const getHourSectionOptions = ({
  now,
  value,
  utils,
  ampm,
  isDisabled,
  resolveAriaLabel,
  timeStep
}) => {
  const currentHours = value ? utils.getHours(value) : null;
  const result = [];
  const isSelected = hour => {
    if (currentHours === null) {
      return false;
    }
    if (ampm) {
      if (hour === 12) {
        return currentHours === 12 || currentHours === 0;
      }
      return currentHours === hour || currentHours - 12 === hour;
    }
    return currentHours === hour;
  };
  const endHour = ampm ? 11 : 23;
  for (let hour = 0; hour <= endHour; hour += timeStep) {
    let label = utils.format(utils.setHours(now, hour), ampm ? 'hours12h' : 'hours24h');
    const ariaLabel = resolveAriaLabel(parseInt(label, 10).toString());
    label = utils.formatNumber(label);
    result.push({
      value: hour,
      label,
      isSelected,
      isDisabled,
      ariaLabel
    });
  }
  return result;
};
exports.getHourSectionOptions = getHourSectionOptions;
const getTimeSectionOptions = ({
  value,
  isDisabled,
  timeStep,
  resolveLabel,
  resolveAriaLabel,
  hasValue = true
}) => {
  const isSelected = timeValue => {
    if (value === null) {
      return false;
    }
    return hasValue && value === timeValue;
  };
  return [...Array.from({
    length: Math.ceil(60 / timeStep)
  }, (_, index) => {
    const timeValue = timeStep * index;
    return {
      value: timeValue,
      label: resolveLabel(timeValue),
      isDisabled,
      isSelected,
      ariaLabel: resolveAriaLabel(timeValue.toString())
    };
  })];
};
exports.getTimeSectionOptions = getTimeSectionOptions;
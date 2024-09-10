import _extends from "@babel/runtime/helpers/esm/extends";
export var getPickersLocalization = function getPickersLocalization(pickersTranslations) {
  return {
    components: {
      MuiLocalizationProvider: {
        defaultProps: {
          localeText: _extends({}, pickersTranslations)
        }
      }
    }
  };
};
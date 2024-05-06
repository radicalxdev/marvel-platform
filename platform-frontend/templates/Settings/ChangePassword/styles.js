const styles = {
  backDropProps: {
    sx: { color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 },
  },
  containerGridProps: {
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    overflow: 'auto',
  },
  passwordGridProps: {
    position: 'relative',
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    laptop: 8,
    desktop: 6,
    desktopLarge: 5,
    minHeight: '650px',
    px: { desktop: 7, laptop: 5 },
    py: { desktop: 6, laptop: 3 },
    rowGap: 4,
    borderRadius: '20px',
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[2],
  },
  titleGridProps: {
    item: true,
    mobileSmall: 12,
    marginBottom: 2,
  },
  titleProps: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Ethnocentric Regular Italics',
    lineHeight: '55px',
    fontSize: '40px',
  },
  inputGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonGroupGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 10,
    columnSpacing: 2,
  },
  buttonGridProps: {
    item: true,
    mobileSmall: true,
  },
  primaryButtonProps: {
    color: 'blue2',
    form: 'change-password-form',
    dataForm: 'change-email-form',
    extraProps: {
      padding: '2px',
      height: { laptop: '42px', desktop: '44px', desktopMedium: '47px' },
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Medium',
      fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
      px: { laptop: 3, desktop: 4, desktopMedium: 5 },
    },
  },
  outlinedButtonProps: {
    color: 'white',
    extraProps: {
      padding: '2px',
      height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Medium',
      fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
      px: { laptop: 3, desktop: 4, desktopMedium: 5 },
    },
  },
  formGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
  },
  formProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    rowSpacing: 4,
  },
  checkTextGridProps: {
    item: true,
    mobileSmall: 12,
  },
  validationCheckGridProps: {
    container: true,
    item: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
    mobileSmall: 12,
  },
  checkTextProps: (state) => ({
    color: (theme) =>
      state ? theme.palette[state].main : theme.palette.Greyscale[400],
    fontFamily: 'Satoshi Bold',
    fontSize: '16px',
    lineHeight: '104%',
    letterSpacing: '0.2px',
    sx: {
      my: 1.5,
      ml: 1,
    },
  }),
  successTextProps: {
    color: (theme) => theme.palette.Greyscale[50],
    fontFamily: 'Satoshi Regular',
    fontSize: '20px',
    lineHeight: '104%',
    letterSpacing: '0.2px',
  },
  successTextGridProps: {
    item: true,
    mobileSmall: 12,
    textAlign: 'center',
    mb: 1,
  },
  okayButtonGridProps: {
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    item: true,
    mobileSmall: 5,
    textAlign: 'center',
  },
  prefixIconProps: (valid) => ({
    component: 'span',
    sx: (theme) => ({
      display: 'inline-block',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      mr: 2,
      bgcolor: valid
        ? theme.palette.Background.green
        : theme.palette.Greyscale[650],
    }),
  }),
};

export default styles;

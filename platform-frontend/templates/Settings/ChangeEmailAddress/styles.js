const styles = {
  containerGridProps: {
    position: 'relative',
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 7,
    desktop: 5,
    maxHeight: '80%',
    px: { desktop: 7, laptop: 5 },
    py: { desktop: 6, laptop: 3 },
    rowGap: 4,
    borderRadius: '20px',
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[2],
  },
  titleGridProps: {
    item: true,
    mobileSmall: 12,
    mt: 5,
    mb: 1,
  },
  titleProps: {
    color: (theme) => theme.palette.Greyscale[50],
    textAlign: 'center',
    fontFamily: 'Ethnocentric Regular Italics',
    fontSize: '40px',
    lineHeight: '55px',
  },
  bodyGridProps: {
    item: true,
    mobileSmall: 9,
  },
  bodyProps: {
    color: (theme) => theme.palette.Greyscale[50],
    fontFamily: 'Satoshi Regular',
    fontSize: '20px',
    lineHeight: '100%',
    letterSpacing: '0.2px',
    textAlign: 'center',
  },
  buttonGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 10,
    columnSpacing: 2,
  },
  primaryButtonProps: {
    color: 'blue2',
    dataForm: 'change-email-form',
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
  formProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    rowSpacing: 4,
  },
  inputGridProps: {
    container: true,
    item: true,
    mobileSmall: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  forgotLinkGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotLinkProps: {
    component: 'button',
    type: 'button',
    sx: {
      color: (theme) => theme.palette.Greyscale[400],
      fontFamily: 'Satoshi Medium',
      fontSize: '14px',
      textDecoration: 'underline',
      textDecorationColor: (theme) => theme.palette.Greyscale[400],
      textDecorationOffset: '3px',
    },
  },
  goBackProps: {
    sx: {
      position: 'absolute',
      top: { mobile: '25px', mobileSmall: '40px' },
      left: { mobile: '25px', mobileSmall: '15px' },
    },
  },
  closeModalProps: {
    sx: {
      position: 'absolute',
      top: { mobile: '25px', mobileSmall: '40px' },
      right: { mobile: '25px', mobileSmall: '15px' },
    },
  },
};

export default styles;

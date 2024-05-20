const styles = {
  mainGridProps: {
    container: true,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    height: 'auto',
    rowGap: '34px',
  },
  headerGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 2,
    mobileSmall: 12,
  },
  textGridProps: {
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    item: true,
  },
  mainMsgProps: {
    fontSize: {
      tablet: '18px',
      desktopLarge: '24px',
    },
    fontFamily: 'Satoshi Bold',
  },
  bodyMsgProps: {
    fontSize: { laptop: '16px', desktop: '20px', desktopMedium: '24px' },
    fontFamily: 'Satoshi Regular',
    textAlign: 'center',
  },
  headerProps: {
    fontSize: { laptop: '38px', desktop: '44px', desktopMedium: '48px' },
    fontFamily: 'Satoshi Bold',
    textAlign: 'center',
  },
  buttonGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    desktop: 7,
    laptop: 10,
  },
  buttonProps: {
    fullWidth: true,
    variant: 'mission',
    sx: {
      borderRadius: '100px',
      fontFamily: 'Satoshi Black',
      fontSize: '18px',
      textTransform: 'none',
    },
  },
  emailProps: {
    component: 'span',
    sx: {
      color: (theme) => theme.palette.primary.main,
      fontFamily: 'inherit',
      fontSize: 'inherit',
    },
  },
  submitButtonProps: {
    type: 'submit',
    color: 'purple4',
    inverted: true,
    extraProps: {
      padding: '2px',
      height: { laptop: '54px', desktopMedium: '60px' },
      width: '60%',
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      px: 4,
    },
  },
};

export default styles;

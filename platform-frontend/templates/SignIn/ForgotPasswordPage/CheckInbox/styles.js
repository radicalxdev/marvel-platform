const styles = {
  mainGridProps: {
    container: true,
    item: true,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    height: 'auto',
    rowGap: { laptop: 3, desktop: 3.5, desktopMedium: 4 },
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
    mobileSmall: 8,
  },
  textGridProps: {
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    item: true,
  },
  mainMsgProps: {
    variant: 'h4',
    fontSize: {
      tablet: '18px',
      desktopLarge: '24px',
    },
  },
  bodyMsgProps: {
    variant: 'Body 1',
    textAlign: 'center',
  },
  emailTextProps: {
    fontFamily: 'Satoshi Bold',
  },
  headerProps: {
    variant: 'h7',
    sx: {
      fontSize: { tablet: '32px', desktopLarge: '48px' },
    },
  },
  resendGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 9,
    px: { laptop: 1.5, desktop: 2, desktopMedium: 3 },
    py: { laptop: 2, desktop: 3, desktopMedium: 4 },
    rowGap: 3,
    border: '1px solid rgba(255,255,255, 0.15)',
    borderRadius: '40px',
  },
  resendTextProps: {
    color: '#FAFAFA',
    fontFamily: 'Satoshi Regular',
    fontSize: { laptop: 16, desktop: 20, desktopMedium: 24 },
    textAlign: 'center',
  },
  emailInputGridProps: {
    item: true,
    container: true,
    desktopLarge: 8,
    desktop: 9,
    tablet: 10,
  },
  buttonProps: {
    type: 'submit',
    color: 'green',
    inverted: true,
    extraProps: {
      padding: '2px',
      height: { laptop: '48px', desktop: '56px', desktopMedium: '60px' },
      width: '60%',
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      px: 4,
    },
  },
  iconGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
  },
  iconContainerProps: {
    width: {
      laptop: 90,
      desktop: 100,
      desktopMedium: 120,
    },
  },
  linkProps: {
    rel: 'noreferrer',
    target: '_blank',
    href: 'https://help.radicalx.co/en/',
    sx: {
      textDecoration: 'underline',
      fontFamily: 'Satoshi Bold',
      lineHeight: 'normal',
      textUnderlineOffset: '3px',
      fontWeight: 700,
      color: (theme) => theme.palette.Greyscale[50],

      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  contentHelpGridProps: {
    item: true,
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    mt: { desktop: 2, tablet: 1 },
    sx: {
      fontFamily: 'Satoshi Regular',
      fontSize: '16px',
      lineHeight: 'normal',
    },
  },
  resendButtonGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default styles;

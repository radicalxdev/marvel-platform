const styles = {
  mainGridProps: {
    position: 'relative',
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
    rowGap: 4,
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
    laptop: 8,
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
    fontFamily: 'Satoshi Regular',
    fontSize: { laptop: 16, desktop: 20, desktopMedium: 24 },
    textAlign: 'center',
  },
  headerProps: {
    fontSize: { laptop: '38px', desktop: '40px', desktopMedium: '48px' },
    fontFamily: 'Ethnocentric Regular Italics',
    textAlign: 'center',
  },
  buttonGridProps: {
    container: true,
    item: true,
    desktopMedium: 8,
    desktop: 9,
    laptop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailInputGridProps: {
    item: true,
    container: true,
    desktopLarge: 8,
    desktop: 9,
    tablet: 10,
  },
  submitButtonProps: {
    type: 'submit',
    color: 'green',
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
  iconGridProps: {
    item: true,
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
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
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    marginTop: { desktopLarge: 10, tablet: 6 },
    sx: {
      fontFamily: 'Satoshi Regular',
      fontSize: '16px',
      lineHeight: 'normal',
    },
  },
};

export default styles;

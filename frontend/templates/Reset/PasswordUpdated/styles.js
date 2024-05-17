const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentGridProps: {
    container: true,
    mobileSmall: 12,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 4,
  },
  titleGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 8,
  },
  titleProps: {
    fontFamily: 'Ethnocentric Regular Italics',
    fontSize: { laptop: '38px', desktop: '40px', desktopMedium: '48px' },
    color: (theme) => theme.palette.Greyscale[50],
    textAlign: 'center',
  },
  buttonGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 9,
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
    mt: { laptop: 4, desktop: 5, desktopMedium: 6 },
    sx: {
      fontFamily: 'Satoshi Regular',
      fontSize: '16px',
      lineHeight: 'normal',
    },
  },
  messageGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    my: 2,
  },
  bodyMsgProps: {
    variant: 'Body 1',
    textAlign: 'center',
    fontSize: '20px',
    color: (theme) => theme.palette.Greyscale[50],
  },
  submitButtonProps: {
    type: 'submit',
    color: 'purple4',
    inverted: true,
    extraProps: {
      padding: '2px',
      height: { laptop: '54px', desktopMedium: '60px' },
      width: '80%',
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      px: 4,
    },
  },
};

export default styles;

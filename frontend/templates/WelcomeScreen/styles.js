const styles = {
  mainGridProps: {
    position: 'relative',
    container: true,
    mobileSmall: 12,
    height: 'auto',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '50px',
    sx: {
      background: (theme) => {
        return theme.palette.Background.primary;
      },
    },
  },

  MainSectionProps: {
    fontFamily: 'Satoshi',
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: '54px',
    letterSpacing: '-0.02em',
    color: (theme) => theme.palette.Common.White['100p'],
    textAlign: 'center',
  },
  MainSectionTwoProps: {
    fontFamily: 'Satoshi',
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: '32.4px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
    color: (theme) => theme.palette.Common.White['100p'],
    marginBottom: '20px',
  },
  submitButtonProps: {
    color: 'purple',
    inverted: true,
    extraProps: {
      padding: '2px',
      width: 'auto',
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      px: 4,
    },
  },
};

export default styles;

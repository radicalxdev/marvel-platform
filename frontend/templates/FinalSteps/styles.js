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
  },
  mainListProps: {
    sx: {
      width: '100%',
    },
  },
  listItemPros: {
    sx: {
      display: 'flex',
      alignItem: 'center',
      lineHeight: '50px',
    },
  },
  listItemTyProps: {
    fontFamily: 'Satoshi',
    fontSize: '20px',
    letterSpacing: '-0.02em',
    color: (theme) => theme.palette.Common.White['100p'],
    textAlign: 'center',
  },
  submitButtonProps: {
    color: 'purple',
    inverted: true,
    extraProps: {
      padding: '2px',
      width: '100%',
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      px: 4,
    },
  },
  titleProps: {
    fontFamily: 'Satoshi',
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '43.2px',
    letterSpacing: '-0.02em',
    color: (theme) => theme.palette.Common.White['100p'],
    textAlign: 'center',
  },
  secondTitleProps: {
    fontFamily: 'Satoshi',
    fontSize: '20px',
    lineHeight: '27px',
    letterSpacing: '-0.02em',
    color: (theme) => theme.palette.Common.White['100p'],
    textAlign: 'center',
    marginBottom: '10px',
  },
};

export default styles;

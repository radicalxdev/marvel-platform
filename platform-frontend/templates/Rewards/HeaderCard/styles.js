const styles = {
  expeditionCardProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
  },
  mainTextProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    desktopMedium: 11,
    desktopLarge: 10,
  },
  containerGridProps: {
    item: true,
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0 0 24px 24px',
    padding: 4,
    mobileSmall: 12,
    rowGap: 4,
  },
  contentProps: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Satoshi Medium',
    fontSize: {
      mobileSmall: '28px',
      desktopMedium: '32px',
    },
  },
  secondaryButtonProps: {
    extraProps: { padding: '2px', height: '55px' },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      boxShadow: '0px 7px 25px #3A1E5D',
      px: 4,
    },
  },
  colorTextProps: {
    component: 'span',
    sx: {
      color: (theme) => theme.palette.Background.green,
      fontFamily: 'inherit',
      fontSize: 'inherit',
    },
  },
};

export default styles;

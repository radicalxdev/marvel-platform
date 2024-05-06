const styles = {
  timerGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 1,
    pr: 1,
    pl: 2,
    whiteSpace: 'nowrap',
  },
  timerTextProps: {
    color: 'white',
    fontSize: '18px',
    fontFamily: 'Satoshi Bold',
    lineHeight: '28px',
    whiteSpace: 'nowrap',
    minWidth: '55px',
    sx: { textAlign: 'center' },
  },
  circularProgressGridProps: {
    item: true,
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 'auto',
  },
  circularProgressProps: {
    size: 25,
    variant: 'determinate',
    thickness: 6,
    sx: {
      transform: 'rotate(90deg) scaleX(-1) !important',
    },
  },
  defaultCircularProgressProps: {
    variant: 'determinate',
    disableShrink: true,
    sx: {
      position: 'absolute',
      opacity: 0.6,
      color: (theme) => theme.palette.Dark_Colors.Dark[4],
    },
    size: 25,
    thickness: 6,
    value: 100,
  },
};

export default styles;

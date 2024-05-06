const styles = {
  mainGridConfig: {
    container: true,
    item: true,
    rowGap: { desktopLarge: 1, mobileSmall: '2px' },
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: { tablet: '83px', mobile: '56px', mobileSmall: '50px' },
  },
  gradientGridConfig: (color) => ({
    item: true,
    container: true,
    xl: 12,
    justifyContent: 'center',
    alignItems: 'center',
    sx: (theme) => ({
      background: theme.palette.Background.gradient[color],
      padding: '1px',
      borderRadius: '4px',
      overflow: 'hidden',
    }),
  }),
  innerChipGridConfig: {
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    sx: (theme) => ({
      backgroundColor: theme.palette.Dark_Colors.Dark[1],
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: '4px',
    }),
  },
  unitConfig: (color) => ({
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    sx: (theme) => ({
      background: theme.palette.Background.gradient[color],
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontFamily: 'Roboto Mono',
      fontSize: { tablet: '45px', mobileSmall: '24px' },
      width: '100%',
      height: '100%',
    }),
  }),
  timerLabelTextConfig: (color) => ({
    fontSize: '12px',
    fontFamily: 'Roboto Mono',
    color: 'white',
    sx: (theme) => ({
      background: theme.palette.Background.gradient[color],
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }),
  }),
};

export default styles;

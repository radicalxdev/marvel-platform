const styles = {
  mainGridProps: (isLeaderboards, color) => ({
    position: 'relative',
    container: true,
    display: isLeaderboards ? 'flex' : { tablet: 'none', mobileSmall: 'flex' },
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: { mobileSmallPlus: 'none', mobileSmall: '110px' },
    width: isLeaderboards
      ? 'auto'
      : { desktopLarge: '130px', mobileSmall: 'auto' },
    height: 'auto',
    borderRadius: '100px',
    padding: '1px',
    sx: (theme) => ({
      background: theme.palette.Background.gradient[color],
    }),
  }),
  gradientSelectMenuProps: (color, darkValue, textGradient, minWidth) => ({
    id: 'dropDowm-menu',
    inputProps: {
      sx: (theme) => ({
        borderRadius: '100px',
        fontSize: { mobile: '16px', mobileSmall: '14px' },
        fontFamily: 'Satoshi Black',
        height: '100%',
        width: '100%',
        textTransform: 'capitalize',
        padding: '10px 24px',
        paddingRight: '46px !important',
        background: textGradient
          ? theme.palette.Background.gradient[color]
          : theme.palette.Dark_Colors.Dark[darkValue],
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: textGradient
          ? 'transparent'
          : 'rgba(255, 255, 255, 0.60);',
      }),
    },
    sx: (theme) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      minWidth,
      borderRadius: '100px',
      background: theme.palette.Dark_Colors.Dark[darkValue],
      svg: {
        display: 'block',
        top: '25%',
        mr: '8px',
      },
      '& fieldset': { border: 'none' },
    }),
    MenuProps: {
      sx: {
        marginTop: '10px',
        maxHeight: '350px',
      },
      PaperProps: {
        sx: (theme) => ({
          border: `1px solid ${theme.palette.Background.gradient[color]}`,
          minWidth,
          background: theme.palette.Dark_Colors.Dark[darkValue],
          '& .MuiMenuItem-root': {
            fontSize: { mobile: '18px', mobileSmall: '14px' },
            '&:hover': {
              background: theme.palette.Background.gradient[color],
            },
          },
          '& .Mui-selected': {
            backgroundColor: `${theme.palette.Background.gradient[color]}29 !important`,
          },
        }),
      },
    },
  }),
};

export default styles;

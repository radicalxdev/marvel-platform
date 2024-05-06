const styles = {
  mainGridProps: (mouseDown, disableHover, bgColor) => ({
    position: 'relative',
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    borderRadius: '20px',
    overflow: 'hidden',
    padding: '2px',
    sx: (theme) => ({
      boxShadow: !mouseDown && theme.customShadows.Elevation[2].boxShadow,
      '#content': {
        transition: theme.transitions.create('all'),
        background: theme.palette.Dark_Colors.Dark[1],
        zIndex: 100,
      },
      '#outerBorder': {
        transition: theme.transitions.create('all'),
        background: bgColor,
        zIndex: 5,
      },
      '&:hover': {
        cursor: disableHover ? 'default' : 'pointer',
        '#outerBorder': {
          background: disableHover
            ? bgColor
            : theme.palette.Background.gradient.purple2,
        },
        '#number': {
          background:
            !disableHover && theme.palette.Background.gradient.purple2,
          button: {
            span: !disableHover && {
              background: theme.palette.Background.gradient.purple2,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
          },
        },
      },
    }),
  }),
  contentGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    py: { mobileSmall: '10px', desktopMedium: 2 },
    px: { mobileSmall: 2, desktopMedium: 3 },
    borderRadius: '18px',
    columnGap: 2,
  },
  outerBorderProps: {
    position: 'absolute',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderRadius: '18px',
  },
  numberGridProps: (color) => ({
    container: true,
    item: true,
    mobileSmall: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '1px',
    sx: (theme) => ({
      background: color,
      button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        background: theme.palette.Dark_Colors.Dark[1],
        px: 2,
        py: 1,
        minWidth: 0,
        span: {
          background: color,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'Satoshi Bold',
          fontSize: '16px',
        },
        '&:hover': {
          background: theme.palette.Dark_Colors.Dark[1],
          cursor: 'default',
        },
      },
    }),
  }),
  textGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    alignItems: 'center',
    textAlign: 'left',
  },
  textProps: {
    color: 'white',
    textAlign: 'left',
    fontFamily: 'Satoshi Medium',
    fontSize: {
      mobileSmall: '16px',
      desktopMedium: '18px',
      desktopLarge: '20px',
    },
  },
  accordianDetailsProps: {
    sx: {
      px: 3,
      py: 4,
    },
  },
  accordianProps: {
    sx: {
      background: (theme) => theme.palette.Dark_Colors.Dark[1],
      borderRadius: '10px !important',
    },
  },
  summaryTextProps: {
    sx: {
      width: '33%',
      flexShrink: 0,
      color: '#FFF',
      fontFamily: 'Satoshi Medium',
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: '0.2px',
    },
  },
  explanationProps: {
    color: '#FFF',
    fontFamily: 'Satoshi Medium',
    fontSize: '20px',
    lineHeight: '36px',
    letterSpacing: '0.2px',
    sx: {
      mt: 3,
    },
  },
};

export default styles;

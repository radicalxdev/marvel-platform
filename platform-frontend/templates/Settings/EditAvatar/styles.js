const styles = {
  contentGridProps: {
    container: true,
    item: true,
    rowGap: 2,
    mobileSmall: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contentProps: {
    color: (theme) => theme.palette.Greyscale[300],
    fontFamily: 'Satoshi Regular',
    fontSize: '16px',
    lineHeight: '140%',
    letterSpacing: '0.2px',
    sx: {
      width: '65%',
    },
  },
  buttonProps: {
    variant: 'mission',
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '100px',
      textTransform: 'capitalize',
      fontFamily: 'Satoshi Medium',
      fontSize: { laptop: '16px', mobileSmall: '14px' },
      px: 5,
      py: 2,
      height: {
        laptop: '38px',
        tablet: '28px',
        mobile: '26px',
        mobileSmall: '26px',
      },
    },
  },
  avatarGridProps: {
    position: 'relative',
    item: true,
    mobileSmall: 'auto',
  },
  editButtonProps: {
    sx: {
      position: 'absolute',
      bottom: 0,
      zIndex: 50,
      padding: '4px',
      transform: 'translate(100%, 50%)',
    },
  },
  avatarProps: (bgColor) => ({
    sx: { width: 96, height: 96, backgroundColor: bgColor },
  }),
  avatarImageProps: {
    layout: 'fill',
    objectFit: 'contain',
  },
  studioGridProps: {
    position: 'relative',
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 10,
    desktopMedium: 8,
    desktopLarge: 6,
    height: '75%',
    maxHeight: '80%',
    rowGap: 4,
    overflow: 'hidden',
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[1],
    sx: {
      borderRadius: '20px',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: ' -4px',
        bottom: ' -4px',
        backgroundImage: (theme) => theme.palette.Background.gradient.brown,
        zIndex: '-1',
        borderRadius: '20px',
      },
    },
  },
  loaderGridProps: {
    container: true,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  creatorConfig: {
    subdomain: 'radicalx-ayg3a2',
    editorConfig: {
      bodyType: 'fullbody',
      clearCache: true,
    },
  },
};

export default styles;

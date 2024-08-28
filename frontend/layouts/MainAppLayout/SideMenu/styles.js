const styles = {
  mainGridProps: {
    container: true,
    item: true,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[6], // proper color #181A205E; change it later in development
  },
  logoGridProps: {
    container: true,
    item: true,
    width: 'auto',
    justifyContent: 'center',
    sx: {
      cursor: 'pointer',
    },
    px: { laptop: 2, desktop: 3, desktopMedium: 4 },
  },
  logoutGridProps: {
    container: true,
    item: true,
    width: 'auto',
    px: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
  },
  logoutButtonProps: {
    variant: 'outlined',
    fullWidth: true,
    sx: {
      justifyContent: 'flex-start',
      borderRadius: '24px',
      py: 3,
      px: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
      borderColor: 'transparent',
      transition: (theme) => theme.transitions.create('all'),
      color: '#9E94A5',
      path: {
        fill: '#9E94A5',
        stroke: '#9E94A5',
      },
      ':hover': {
        color: '#9E94A5',
        background: (theme) => `${theme.palette.Background.purple}30`,
        path: {
          fill: '#9E94A5',
          stroke: '#9E94A5',
        },
      },
    },
  },
  logoImageGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    height: 'auto',
  },
  profileImageGridProps: {
    container: true,
    item: true,
    width: 'auto',
    justifyContent: 'center',
    sx: {
      cursor: 'pointer',
    },
    px: { laptop: 2, desktop: 3, desktopMedium: 4 },
  },
  titleGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleProps: {
    fontFamily: 'Ethnocentric Regular',
    fontSize: '36px',
    color: 'white',
  },
  subtitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '16px',
    color: 'white',
    textAlign: 'left',
  },
};

export default styles;

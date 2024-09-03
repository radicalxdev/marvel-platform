const styles = {
  mainGridProps: {
    container: true,
    item: true,
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bgcolor: 'rgba(24, 26, 32, 0.37)',
  },
  logoGridProps: {
    container: true,
    item: true,
    width: 'auto',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
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

  logOutOutlineProps: {
    sx: {
      background: '#24272F',
      borderRadius: '6px',
      height: '24px',
      width: '24px',
    },
  },

  logoImageGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  profileImageGridProps: {
    container: true,
    item: true,
    height: '100%',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '100%',
    width: 'auto',
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
    color: '#9E94A5',
    textAlign: 'left',
  },
};

export default styles;

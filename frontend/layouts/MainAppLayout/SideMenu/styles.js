const styles = {
  mainGridProps: {
    container: true,
    item: true,
    width: '360px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    py: { laptop: 4, desktop: 5, desktopMedium: 6 },
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[6],
  },
  logoGridProps: {
    container: true,
    item: true,
    columnGap: 1,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    mb: 8,
    sx: {
      cursor: 'pointer',
    },
    px: { laptop: 2, desktop: 3, desktopMedium: 4 },
  },
  logoutGridProps: {
    container: true,
    item: true,
    width: '100%',
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
      span: {
        mr: 4,
      },
      color: (theme) => theme.palette.Common.White['100p'],
      path: {
        fill: (theme) => theme.palette.Common.White['100p'],
        stroke: (theme) => theme.palette.Common.White['100p'],
      },
      ':hover': {
        color: (theme) => theme.palette.Common.White['100p'],
        background: (theme) => `${theme.palette.Background.purple}30`,
        path: {
          fill: (theme) => theme.palette.Common.White['100p'],
          stroke: (theme) => theme.palette.Common.White['100p'],
        },
      },
    },
  },
  logoImageGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    height: 'auto',
  },
  titleGridProps: {
    position: 'relative',
    container: true,
    item: true,
    mobileSmall: true,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '60px',
    width: '100%',
  },
  titleProps: {
    fontFamily: 'Ethnocentric Regular',
    fontSize: '28px',
    color: 'white',
  },
  subtitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '16px',
    color: '#AD83FF',
    textAlign: 'left',
  },
};

export default styles;

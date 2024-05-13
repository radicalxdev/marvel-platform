const styles = {
  mainGridProps: {
    container: true,
    item: true,
    width: '360px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    px: { laptop: 2, desktop: 3, desktopMedium: 4 },
    py: { laptop: 4, desktop: 5, desktopMedium: 6 },
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[6],
  },
  logoGridProps: {
    container: true,
    item: true,
    columnGap: 3,
    mobileSmall: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    mb: 8,
  },
  logoutGridProps: {
    container: true,
    item: true,
    width: '100%',
  },
  logoutButtonProps: {
    variant: 'outlined',
    fullWidth: true,
    sx: {
      justifyContent: 'flex-start',
      borderRadius: '24px',
      py: 3,
      px: 4,
      borderColor: 'transparent',
      transition: (theme) => theme.transitions.create('all'),
      span: {
        mr: 2,
      },
      '&:hover': {
        borderColor: (theme) => theme.palette.primary.main,
      },
    },
  },
  logoImageGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    height: 'auto',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  titleGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    color: '#AD83FF',
    textAlign: 'left',
  },
};

export default styles;

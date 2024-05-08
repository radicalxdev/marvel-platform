const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    px: { laptop: 2, desktop: 3, desktopMedium: 4 },
    py: { laptop: 4, desktop: 5, desktopMedium: 6 },
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[2],
  },
  logoGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
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
};

export default styles;

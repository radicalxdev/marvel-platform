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
  subGridProps: {
    container: true,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: '100%',
    width: { mobile: 'none', mobileSmall: 'auto' },
    flex: { mobile: 1, mobileSmall: 'none' },
    columnGap: {
      desktopLarge: '200px',
      desktop: 20,
      laptop: '44px',
      mobile: 3,
      mobileSmall: 1,
    },
  },
};

export default styles;

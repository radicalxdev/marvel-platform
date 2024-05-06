const styles = {
  mainGridProps: (height) => ({
    container: true,
    item: true,
    desktopLarge: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    px: { laptop: 5, tablet: 3, mobile: 2, mobileSmall: '12px' },
    height: `${height}px`,
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[1],
  }),
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

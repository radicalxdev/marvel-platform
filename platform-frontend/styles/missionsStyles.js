const missionsStyles = {
  mainGridProps: (dataLength) => ({
    container: true,
    justifyContent: {
      mobile: 'flex-start',
      mobileSmall: dataLength === 1 && 'center',
    },
    boxSizing: 'border-box',
    width: 'auto',
    overflow: 'auto',
    flexWrap: { tablet: 'wrap', mobileSmall: 'nowrap' },
    spacing: {
      desktopLarge: 5,
      desktop: 4,
      laptop: 5,
      tablet: 4,
      mobile: 3,
      mobileSmall: 1,
    },
    paddingRight: 1,
    paddingBottom: 1,
  }),
  workspaceGridProps: {
    item: true,
    container: true,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    mobileSmall: 12,
  },
  bannerProps: {
    sx: {
      display: {
        tablet: 'flex',
        mobileSmall: 'none',
      },
    },
  },
  extraContentProps: {
    paddingRight: { mobile: 0, mobileSmall: 0 },
  },
};

export default missionsStyles;

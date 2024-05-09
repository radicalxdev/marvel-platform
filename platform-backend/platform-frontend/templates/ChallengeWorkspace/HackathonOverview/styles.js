const styles = {
  overviewGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[1],
    borderRadius: '24px',
    padding: 3,
    rowGap: 3,
    height: '100%',
    sx: {
      boxShadow: (theme) => theme.customShadows.Elevation[2].boxShadow,
      overflowY: 'auto',
    },
  },
  pitchEmbedGridProps: (containerHeight) => ({
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: (theme) => ({
      mobileSmall: `calc(${containerHeight}px - ${theme.spacing(2)})`,
      desktopMedium: `calc(${containerHeight}px - ${theme.spacing(3)})`,
    }),
  }),
  chipContainerProps: {
    height: { mobileSmall: '32px', mobile: '64px' },
  },
  timerUnitContainerProps: {
    sx: { height: 'auto' },
  },
  timerContainerProps: {
    columnGap: { tablet: 4, mobile: 2, mobileSmall: 2 },
  },
  statisticChipPropsConfig: {
    height: { mobileSmall: '28px', desktopMedium: '38px' },
  },
  chatGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '20px',
    lineHeight: '160%',
    sx: {
      background: (theme) => theme.palette.Background.gradient.blue2,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      span: {
        WebkitTextFillColor: 'white',
      },
      mb: 2,
    },
    sectionGridProps: {
      container: true,
      item: true,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      mobileSmall: 12,
    },
  },
  detailsProps: {
    fontFamily: 'Satoshi Medium',
    fontSize: '18px',
    lineHeight: '160%',
    letterSpacing: '0.2px',
    color: 'white',
  },
  statisticsGrid: {
    container: true,
    columnGap: {
      desktopLarge: 4,
      laptop: 5,
      tablet: 1,
      mobile: 1,
      mobileSmall: 1,
    },
  },
  jackpotTitleProps: {
    textAlign: 'center',
    color: 'white',
    width: '100%',
    fontFamily: 'Satoshi Bold',
    fontSize: {
      desktop: '32px',
      laptop: '24px',
      mobile: '20px',
      mobileSmall: '18px',
    },
  },
  jackpotGridProps: {
    mobileSmall: 12,
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: { mobileSmall: 1.5, desktopMedium: 2 },
  },
  tasksGridProps: {
    container: true,
    item: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
    pl: 1,
    rowGap: 1,
  },
};

export default styles;

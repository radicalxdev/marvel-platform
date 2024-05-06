const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 4,
    width: 'calc(100% - 8px)',
  },
  overviewGridProps: (isHackathon) => ({
    container: true,
    item: true,
    mobileSmall: true,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[1],
    borderRadius: '24px',
    padding: 3,
    rowGap: isHackathon ? 3 : 2,
    height: '100%',
    sx: {
      boxShadow: (theme) => theme.customShadows.Elevation[2].boxShadow,
      overflowY: 'auto',
    },
  }),
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

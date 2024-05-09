const styles = {
  expeditionCardProps: (disableFilters) => ({
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    mt: disableFilters && 20,
  }),
  innerQuestsGridProps: () => ({
    container: true,
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
    width: 'auto',
    overflow: 'auto',
    flexWrap: { tablet: 'wrap', mobileSmall: 'nowrap' },
    id: 'challenges-grid',
    columnSpacing: {
      desktopLarge: 5,
      laptop: 4,
    },
    rowSpacing: {
      desktopLarge: 5,
      laptop: 8,
    },
    paddingRight: { laptop: 0.25, desktop: 3 },
    paddingLeft: { laptop: 0.25, desktop: 1.5 },
    paddingBottom: 4,
  }),
  bannerProps: {
    sx: {
      display: {
        tablet: 'flex',
        mobileSmall: 'none',
      },
      borderRadius: '24px 24px 0 0',
    },
  },
  extraContentProps: {
    paddingRight: { mobile: 0, mobileSmall: 0 },
  },
  loaderGridProps: {
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  missionButtonConfig: {
    variant: 'mission',
    sx: (theme) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '100px',
      textTransform: 'capitalize',
      fontFamily: 'Satoshi Black',
      fontSize: { laptop: '16px', mobileSmall: '14px' },
      height: {
        laptop: '38px',
        tablet: '28px',
        mobile: '26px',
        mobileSmall: '26px',
      },
      [theme.breakpoints.down('tablet')]: {
        boxShadow: `2px 2px 0px rgba(${theme.palette.primary.main}, 0.65)`,
      },
      '& svg': {
        width: '20px',
        height: '20px',
        marginLeft: theme.spacing(1),

        [theme.breakpoints.down('tablet')]: {
          width: '18px',
          height: '18px',
        },
      },
    }),
  },
  gradientButtonProps: {
    color: 'purple2',
    bgcolor: '#242731',
    extraProps: {
      padding: '2px',
    },
    extraButtonProps: {
      fontSize: '20px',
      fontFamily: 'Satoshi Black',
      py: 1,
      px: 2,
    },
  },
  skeletonBG: {
    container: true,
    item: true,
    mobileSmall: 12,
    spacing: {
      desktopLarge: 5,
      desktop: 4,
      laptop: 5,
      tablet: 4,
      mobile: 3,
      mobileSmall: 1,
    },
  },
  noQuestsGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noQuestsText: {
    fontFamily: 'Satoshi Black',
    fontSize: { laptop: '24px', tablet: '18px', mobileSmall: '14px' },
    color: 'white',
  },
  loadMoreWrapper: {
    sx: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 2,
    },
  },
  loadMoreBtn: {
    sx: {
      width: '410px',
      display: 'flex',
      backgroundColor: '#1F222A',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '24px',
      textTransform: 'capitalize',
      fontFamily: 'Satoshi Black',
      color: '#fff',
      fontSize: { laptop: '24px', tablet: '18px', mobileSmall: '14px' },
      height: {
        laptop: '86px',
        tablet: '28px',
        mobile: '26px',
        mobileSmall: '26px',
      },
      boxShadow: (theme) => theme.customShadows.Elevation.LoadMore.boxShadow,
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: '#1F222A',
        color: '#fff',
      },
    },
  },

  errorGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionTextProps: (paymentPageStyles) => ({
    sx: (theme) => ({
      color: theme.palette.Greyscale[400],
      '> div': {
        marginBottom: '1rem',
      },
    }),
    ...paymentPageStyles.paymentPageOverviewText,
  }),
  noFilteredQuestsGridProps: {
    item: true,
    container: true,
    mobileSmall: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
    padding: 3,
  },
};

export default styles;

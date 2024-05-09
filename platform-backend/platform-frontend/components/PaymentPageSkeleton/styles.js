const styles = {
  paymentPageHeader: {
    container: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  detailsGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: {
      laptop: 4,
      tablet: '12px',
      mobile: '12px',
      mobileSmall: '12px',
    },
  },
  paymentPageHeaderInnerGrid: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: { mobile: 'row', mobileSmall: 'column' },
    width: '100%',
    overflow: 'hidden',
    borderRadius: '24px',

    boxShadow: (theme) => ({
      mobile: theme.customShadows.Elevation[1].boxShadow,
      mobileSmall: theme.customShadows.Elevation[2].boxShadow,
    }),
  },
  bannerGridProps: {
    position: 'relative',
    item: true,
    container: true,
    overflow: 'hidden',
    sx: {
      span: { desktop: '24px', mobileSmall: 0 },
      borderBottomLeftRadius: '24px',
      borderBottomRightRadius: '24px',
      borderTopRightRadius: '0px',
      borderTopLeftRadius: '0px',
    },
  },
  paymentHeaderImageSkeleton: {
    variant: 'rounded',
    animation: 'wave',
    width: '100%',
    height: '402px',
    sx: (theme) => ({
      background: theme.palette.Dark_Colors.Dark[4],
    }),
  },
  paymentHeaderSkeletonContainer: {
    position: 'absolute',
    height: '223px',
    width: '90%',
    top: '75%',
    overflow: 'hidden',
    borderRadius: '24px',
  },
  paymentInnerCardSkeleton: {
    variant: 'rounded',
    animation: 'wave',
    width: '100%',
    height: 223,
    sx: (theme) => ({
      background: theme.palette.Dark_Colors.Dark[4],
    }),
  },
  paymentJackpotSkeletonContainer: {
    width: '100%',
    height: '865px',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: (theme) => ({
      mobile: theme.customShadows.Elevation[1].boxShadow,
      mobileSmall: theme.customShadows.Elevation[2].boxShadow,
    }),
  },
  paymentJackpotSkeleton: {
    width: '100%',
    height: 865,
    variant: 'rounded',
    animation: 'wave',
    sx: (theme) => ({
      background: theme.palette.Dark_Colors.Dark[4],
    }),
  },
};

export default styles;

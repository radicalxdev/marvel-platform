const styles = {
  mainGridProps: {
    position: 'relative',
    container: true,
    item: true,
    mobileSmall: true,
    justifyContent: 'center',
    alignItems: 'center',
    columnSpacing: 4,
    height: '100%',
  },
  missionInfoSkeletonGridProps: {
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    mobileSmall: 7,
    rowGap: 3,
    sx: {
      overflow: 'hidden',
    },
  },
  chatSkeletonGridProps: {
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 5,
    height: '100%',
    sx: {
      overflow: 'hidden',
    },
  },
  submitSkeletonProps: {
    variant: 'rounded',
    animation: 'wave',
    width: '100%',
    sx: (theme) => ({
      borderRadius: '24px',
      height: '60px',
      background: theme.palette.Dark_Colors.Dark[4],
    }),
  },
  mainInfoSkeletonProps: {
    variant: 'rounded',
    animation: 'wave',
    width: '100%',
    height: '100%',
    sx: (theme) => ({
      borderRadius: '24px',
      aspectRatio: '16 / 9',
      background: theme.palette.Dark_Colors.Dark[4],
    }),
  },
  missionInfoSkeleton: {
    variant: 'rounded',
    animation: 'wave',
    width: '100%',
    height: '100%',
    sx: (theme) => ({
      borderRadius: '24px',
      background: theme.palette.Dark_Colors.Dark[4],
    }),
  },
};

export default styles;

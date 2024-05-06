const styles = {
  skeletonImage: {
    animation: 'wave',
    variant: 'rectangular',
    sx: {
      width: '100%',
      height: '200px',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
    },
  },
  skeletonLogo: {
    animation: 'wave',
    variant: 'rounded',
    sx: {
      height: { tablet: '70px', mobileSmall: '50px' },
      width: { tablet: '70px', mobileSmall: '50px' },
      borderRadius: '20px',
    },
  },
  skeletonTitle: {
    animation: 'wave',
    variant: 'text',
    fontSize: '20px',
    width: 100,
    height: 30,
  },
  skeletonDescription: {
    animation: 'wave',
    variant: 'text',
    width: 180,
    height: 48,
  },
  skeletonStatChipLabel: {
    animation: 'wave',
    variant: 'text',
    sx: { height: { tablet: '25px', mobileSmall: '15px' } },
    width: '60%',
  },
  skeletonCountDownTimerGrid: {
    container: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    mx: { tablet: 3, mobile: 2, mobileSmall: 2 },
    px: 2,
    py: { tablet: 2, mobile: 1, mobileSmall: '8px' },
    rowGap: { tablet: 2, mobileSmall: 1 },
    boxSizing: 'border-box',
    border: (theme) => `1px solid ${theme.palette.Dark_Colors.Dark[4]}`,
    borderRadius: '20px',
  },
  skeletonCountDownTimer: {
    animation: 'wave',
    variant: 'rounded',
    sx: {
      height: { tablet: '228px', mobile: '170px', mobileSmall: '142px' },
      width: '100%',
    },
  },
  skeletonStatChip: {
    animation: 'wave',
    variant: 'rounded',
    height: 30,
    width: '100%',
    sx: {
      borderRadius: '40px',
    },
  },
  skeletonButton: {
    animation: 'wave',
    variant: 'rounded',
    height: 40,
    width: '100%',
    sx: {
      borderRadius: '40px',
    },
  },
  skeletonLeaders: {
    animation: 'wave',
    variant: 'rounded',
    height: 130,
    width: '100%',
  },
  statisticChip: {
    item: true,
    container: true,
    rowGap: { laptop: 1, mobileSmall: '4px' },
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonChipProps: {
    variant: 'rounded',
    height: '32px',
    animation: 'wave',
    width: '120px',
    sx: { borderRadius: '16px' },
  },
  skeletonTitleProps: {
    variant: 'text',
    animation: 'wave',
    sx: {
      lineHeight: '32px',
      position: 'absolute',
      width: '60%',
      top: '88%',
      height: '48px',
      left: { mobileSmall: '16px', desktopMedium: '24px' },
    },
  },
  skeletonDurationProps: {
    variant: 'text',
    animation: 'wave',
    width: 60,
    height: 36,
  },
  skeletonIconProps: {
    variant: 'rounded',
    animation: 'wave',
    width: 48,
    height: 48,
  },
  skeletonButtonProps: {
    variant: 'rounded',
    animation: 'wave',
    width: 115,
    height: 36,
    sx: {
      borderRadius: '100px',
    },
  },
};

export default styles;

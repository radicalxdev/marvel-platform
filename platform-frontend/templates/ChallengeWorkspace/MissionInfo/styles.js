const styles = {
  mainGridProps: {
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    mobileSmall: 7,
    borderRadius: '24px',
    height: '100%',
    sx: {
      overflowY: 'auto',
      overflow: 'hidden',
    },
  },
  tabsContainerProps: {
    'aria-label': 'mission tabs',
    sx: { display: 'flex', width: '100%' },
  },
  tabsGridProps: {
    container: true,
    width: '100%',
    padding: { mobileSmall: 2, desktopMedium: 3 },
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[1],
    sx: {
      span: {
        height: '4px',
        borderRadius: '8px',
        background: (theme) => theme.palette.Background.gradient.purple2,
      },
    },
  },
  titleGridProps: {
    container: true,
    width: '100%',
    padding: { mobileSmall: 2, desktopMedium: 3 },
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[1],
    sx: {
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
      span: {
        height: '4px',
        background: (theme) => theme.palette.Background.gradient.purple2,
      },
    },
  },
  innerTabsGridProps: {
    width: '100%',
  },
  tabProps: {
    sx: {
      flex: 1,
      fontFamily: 'Satoshi Black',
      textTransform: 'capitalize',
      fontSize: { mobileSmall: '16px', desktopMedium: '20px' },
      color: 'white !important',
      borderBottom: 'solid 4px',
      borderColor: 'divider',
    },
  },
  submitGridProps: (submitted) => ({
    container: true,
    item: true,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
    mt: 3,
    padding: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
    rowGap: { mobileSmall: 1, desktopMedium: 2 },
    bgcolor: (theme) =>
      submitted
        ? theme.palette.Background.green
        : theme.palette.Dark_Colors.Dark[1],
    sx: {
      borderRadius: '20px',
    },
  }),
  submitTitleGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 'auto',
  },
  submitTitleProps: (isTaskComplete) => ({
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '14px', desktop: '16px' },
    color: isTaskComplete ? 'black' : 'white',
  }),
  buttonGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 'auto',
  },
  buttonProps: {
    variant: 'mission',
    sx: {
      px: { mobileSmall: 1, desktopMedium: 2 },
      py: { mobileSmall: 0.5, desktopMedium: 1 },
      fontFamily: 'Satoshi Medium',
      fontSize: { mobileSmall: '14px', desktopMedium: '16px' },
      textTransform: 'capitalize',
      width: '50%',
      height: 'auto',
      borderRadius: '10px',
      columnGap: { mobileSmall: 1, desktopMedium: 2 },
    },
  },
  titleProps: {
    fontSize: '16px',
    fontFamily: 'Satoshi Medium',
    color: 'white',
    lineHeight: '16px',
  },
  continueButtonProps: (isTaskComplete) => ({
    variant: 'white',
    sx: {
      px: { laptop: 2, desktop: 3, desktopMedium: 4 },
      height: { laptop: '34px', desktop: '36px', desktopMedium: '38px' },
      fontSize: { laptop: '14px', desktop: '16px' },
      color: (theme) => theme.palette.Greyscale[700],
      fontFamily: 'Satoshi Bold',
      '&:hover': {
        cursor: isTaskComplete && 'default',
      },
    },
  }),
  submitButtonProps: () => ({
    color: 'green2',
    inverted: true,
    iconPlacement: 'left',
    extraProps: {
      padding: '2px',
      height: { laptop: '34px', desktop: '36px', desktopMedium: '38px' },
      minWidth: { laptop: '100px', desktop: '120px', desktopMedium: '145px' },
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '14px', desktop: '16px' },
      px: { laptop: 2, desktop: 3, desktopMedium: 4 },
    },
  }),
};

export default styles;

const styles = {
  mainGridProps: {
    position: 'relative',
    container: true,
    mobileSmall: 12,
    height: '100vh',
    maxHeight: '100vh',
  },
  contentGridProps: (extraContentProps, isToolPage) => ({
    container: true,
    item: true,
    mobileSmall: true,
    justifyContent: 'center',
    alignItems: 'flex-start',
    sx: (theme) => ({
      position: 'relative',
      background: isToolPage
        ? theme.palette.Background.white2
        : theme.palette.Common.White['100p'],
      py: {
        desktopLarge: 5,
        desktop: 4,
        laptop: 5,
      },
      px: {
        desktopLarge: 5,
        desktop: 4,
        laptop: 5,
      },
      overflow: 'scroll',
      maxHeight: '100vh',
      ...extraContentProps,
    }),
  }),
  logoGridProps: {
    item: true,
    container: true,
    width: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    sx: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  accountDetailsGridProps: {
    item: true,
    container: true,
    width: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
    columnGap: {
      desktopLarge: 2,
      mobile: 1,
      mobileSmall: '4px',
    },
  },
  intercomIconConfig: {
    width: 36,
    height: 36,
    alt: 'Intercom',
  },
  diamondProps: {
    color: 'blue',
    height: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
    extraChipGridProps: { minWidth: '90px' },
    extraChipProps: {
      px: { mobileSmall: 1, desktopMedium: '10px' },
    },
  },
  coinsProps: {
    color: 'yellow',
    height: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
    extraChipGridProps: { minWidth: '90px' },
    extraChipProps: {
      px: { mobileSmall: 1, desktopMedium: '10px' },
    },
  },
  faviconGridProps: {
    item: true,
    container: true,
    width: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
    height: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
    justifyContent: 'flex-start',
    alignItems: 'center',
    sx: {
      svg: {
        width: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
        height: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  backButtonGridProps: {
    item: true,
    container: true,
    mobileSmall: 4,
    columnGap: 1,
  },
  backButtonProps: {
    iconPlacement: 'left',
    color: 'blue2',
    bgcolor: '#181A20',
    extraProps: {
      fontSize: '14px',
      fontFamily: 'Satoshi Medium',
      height: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
    },
  },
  missionDashboardButtonProps: {
    bgcolor: '#181A20',
    color: 'purple',
    iconPlacement: 'left',
    extraProps: {
      width: '100%',
      height: '36px',
    },
    extraButtonProps: {
      fontSize: '18px',
      fontFamily: 'Satoshi Bold',
    },
  },
  missionDetailsButtonProps: {
    bgcolor: '#181A20',
    color: 'purple2',
    iconPlacement: 'left',
    extraProps: {
      width: '100%',
      height: '36px',
    },
    extraButtonProps: {
      fontSize: '18px',
      fontFamily: 'Satoshi Bold',
    },
  },
  startQuizButtonProps: {
    variant: 'mission',
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '100px',
      textTransform: 'capitalize',
      height: '36px',
      fontFamily: 'Satoshi Bold',
      fontSize: '18px',
    },
  },
  submitButtonProps: {
    variant: 'mission',
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '100px',
      textTransform: 'capitalize',
      height: '36px',
      fontFamily: 'Satoshi Bold',
      fontSize: '18px',
    },
  },
  backToMissionButtonProps: {
    sx: {
      borderColor: 'transparent',
      borderRadius: '100px',
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      textTransform: 'capitalize',
      color: (theme) => theme.palette.Background.gradient.grey,
      '&:hover': {
        background: (theme) => theme.palette.Background.gradient.grey,
        color: (theme) => theme.palette.Dark_Colors.Dark[1],
        svg: {
          color: (theme) => theme.palette.Dark_Colors.Dark[1],
        },
      },
    },
  },
};

export default styles;

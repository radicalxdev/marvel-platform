const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    rowGap: { laptop: 2, desktop: 4 },
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuItemProps: (isActive) => ({
    sx: {
      px: 0,
      py: 0,
      width: '100%',
      borderRadius: '24px',
      color: (theme) =>
        isActive
          ? theme.palette.primary.main
          : theme.palette.Common.White['100p'],
      transition: (theme) => theme.transitions.create(['all']),
      ':hover': {
        background: 'none',
        color: (theme) => theme.palette.primary.main,
      },
    },
  }),
  innerMenuGridProps: {
    container: true,
    mobileSmall: 12,
    columnGap: 4,

    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuIconGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 'auto',
    sx: {
      svg: {
        transform: { mobileSmall: 'scale(0.8)', desktop: 'scale(1)' },
      },
    },
  },
  menuTitleGridProps: {
    container: true,
    item: true,
    justifyContent: 'flex-start˝',
    alignItems: 'center',
    mobileSmall: true,
    fontSize: { mobileSmall: '16px', desktop: '18px' },
  },
};

export default styles;

const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    rowGap: { laptop: 2, desktop: 4 },
    px: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuItemProps: (isActive) => ({
    sx: {
      py: 0,
      px: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
      width: '100%',
      borderRadius: '24px',
      color: (theme) =>
        isActive
          ? `${theme.palette.Background.purple}95`
          : theme.palette.Common.White['100p'],
      path: {
        fill: (theme) =>
          isActive
            ? `${theme.palette.Background.purple}95`
            : theme.palette.Common.White['100p'],
        stroke: (theme) =>
          isActive
            ? `${theme.palette.Background.purple}95`
            : theme.palette.Common.White['100p'],
      },
      transition: (theme) => theme.transitions.create('all'),
      ':hover': {
        color: (theme) => theme.palette.Common.White['100p'],
        background: (theme) => `${theme.palette.Background.purple}30`,
        path: {
          fill: (theme) => theme.palette.Common.White['100p'],
          stroke: (theme) => theme.palette.Common.White['100p'],
        },
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

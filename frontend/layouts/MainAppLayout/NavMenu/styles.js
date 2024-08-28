const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    px: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
  },
  menuItemProps: (isActive) => ({
    sx: {
      py: 0,
      px: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
      maxWidth: '160px',
      maxHeight: '40px',
      borderRadius: '8px',
      background: '#24272F',
      m: 1,
      border: isActive ? '1px solid #9D74FF' : '1px solid transparent',
      color: (theme) =>
        isActive ? `${theme.palette.Background.purple}95` : '#9E94A5',
      path: {
        stroke: (theme) =>
          isActive ? `${theme.palette.Background.purple}95` : '#9E94A5',
      },
      transition: (theme) => theme.transitions.create('all'),
      ':hover': {
        color: '#9E94A5',
        background: (theme) => `${theme.palette.Background.purple}30`,
        path: {
          stroke: '#9E94A5',
        },
      },
    },
  }),
  innerMenuGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    columnGap: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    bgColor: '#24272F',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    mobileSmall: true,
    fontSize: { mobileSmall: '16px', desktop: '18px' },
  },
};

export default styles;

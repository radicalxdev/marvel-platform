const styles = {
  mainGridProps: {
    item: true,
    container: true,
    display: { tablet: 'flex', mobileSmall: 'none' },
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
  },
  menuGridProps: {
    container: true,
    columnGap: { mobileSmall: 1, desktop: 3 },
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemProps: {
    variant: 'customMenuItem',
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      px: { mobileSmall: '2px', desktop: 1 },
      py: '4px',
      height: (theme) => `calc(100% - ${theme.spacing(3)})`,
    },
  },
  innerMenuGridProps: {
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    sx: {
      svg: {
        transform: { mobileSmall: 'scale(0.8)', desktop: 'scale(1)' },
      },
    },
  },
  menuTitleGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    fontSize: { mobileSmall: '16px', desktop: '18px' },
  },
};

export default styles;

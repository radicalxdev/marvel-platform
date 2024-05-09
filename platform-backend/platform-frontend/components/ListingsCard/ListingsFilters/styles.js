const styles = {
  mainGridProps: {
    container: true,
    item: true,
    justifyContent: 'space-between',
    mobileSmall: 12,
    mb: 8,
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
  filtersGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 2,
    pb: 0,
  },
  filterButtonProps: (isActive) => ({
    sx: (theme) => ({
      border: 'none',
      fontSize: '20px',
      pt: 1,
      pb: 3,
      px: 2,
      fontFamily: 'Satoshi Bold',
      color: 'white',
      textTransform: 'capitalize',
      borderBottom: '2px solid transparent',
      borderBottomColor: isActive
        ? theme.palette.Background.green
        : 'transparent',
      transition: theme.transitions.create('all'),
      borderRadius: 0,
      '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.Background.green,
      },
    }),
  }),
};

export default styles;

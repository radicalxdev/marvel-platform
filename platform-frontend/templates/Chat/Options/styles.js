const styles = {
  optionsGridProps: {
    container: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
    my: 1.5,
    rowGap: 1.5,
    columnGap: 3,
    mobileSmall: 12,
  },
  buttonGridProps: {
    container: true,
    item: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonProps: {
    color: 'primary',
    variant: 'outlined',
    sx: (theme) => ({
      borderRadius: '18px',
      height: 'auto',
      borderColor: theme.palette.Common.White['100p'],
      color: theme.palette.Common.White['100p'],
      textTransform: 'none',
      textAlign: 'left',
      ':hover': {
        backgroundColor: theme.palette.Common.White['100p'],
        borderColor: theme.palette.Common.White['100p'],
        color: theme.palette.Dark_Colors.Dark[1],
      },
    }),
  },
};

export default styles;

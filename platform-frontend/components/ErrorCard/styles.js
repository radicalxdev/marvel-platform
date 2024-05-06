const styles = {
  mainGridProps: {
    container: true,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25vw',
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[3],
    boxShadow: (theme) => theme.customShadows.Elevation.Custom2,
    borderRadius: '10px',
    padding: 4,
  },
  messageProps: {
    variant: 'h5',
    fontSize: '16px',
    align: 'center',
    color: 'white',
    sx: (theme) => ({
      marginBottom: theme.spacing(2),
    }),
  },
  buttonProps: {
    variant: 'contained',
    color: 'primary',
    sx: {
      borderRadius: '100px',
      textTransform: 'capitalize',
    },
  },
};

export default styles;

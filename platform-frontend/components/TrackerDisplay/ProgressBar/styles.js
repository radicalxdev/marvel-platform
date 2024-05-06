const styles = {
  progressBarGridProps: {
    position: 'relative',
    item: true,
    height: '14px',
    mobileSmall: true,
    sx: {
      background:
        'linear-gradient(286.17deg, rgba(218, 201, 200, 0.30)  50%, #000000 100%)',
      borderRadius: '100px',
      zIndex: 1,
    },
  },
  progressBarProps: {
    variant: 'determinate',
    sx: {
      backgroundColor: (theme) => theme.palette.Dark_Colors.Dark[4],
      height: '12px',
      borderRadius: '100px',
      span: {
        borderRadius: '100px',
        left: '-2px',
        background: (theme) => theme.palette.Background.gradient.blue2,
      },
    },
  },
  assessmentTrackerProps: (value) => ({
    container: true,
    left: value === 0 ? 0 : `calc(${value}% - 35px)`,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    padding: '5px 8px',
    width: 'auto',
    borderRadius: '100px',

    sx: {
      transform: 'translateY(-32%)',
      transition: 'left .4s linear',
      backgroundColor: 'white',
      color: (theme) => theme.palette.Dark_Colors.Dark[3],
      border: (theme) => `1px solid ${theme.palette.Dark_Colors.Dark[3]}`,
      fontSize: '16px',
      fontFamily: 'Satoshi Medium',
      textAlign: 'center',
      zIndex: 30,
    },
  }),
};

export default styles;

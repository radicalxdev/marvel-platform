const styles = {
  actionButtonGridProps: {
    container: true,
    item: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  actionButtonProps: {
    variant: 'outlined',
    sx: (theme) => ({
      borderRadius: '18px',
      height: 'auto',
      borderColor: theme.palette.Background.purple3,
      background: theme.palette.Background.purple3,
      color: theme.palette.Common.White['100p'],
      textTransform: 'none',
      ':hover': {
        backgroundColor: '#B791FF',
        borderColor: theme.palette.Background.purple,
        color: theme.palette.Common.White['100p'],
      },
      ml: { laptop: -3, desktop: -2, desktopMedium: -4.5 },
      mr: { laptop: -2, desktop: -1, desktopMedium: -3 },
    }),
  },
};

export default styles;

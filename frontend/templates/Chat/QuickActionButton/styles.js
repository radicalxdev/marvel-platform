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

  menuListProps: {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      padding: 1,
      margin: '15px',
    },
  },
  popperProps: {
    sx: {
      ml: { laptop: -3, desktop: -1, desktopMedium: -3 },
    },
  },
  paperProps: {
    sx: {
      backgroundColor: 'transparent !important',
    },
  },
  menuItemProps: {
    sx: (theme) => ({
      borderRadius: '18px',
      margin: '0 5px',
      borderColor: theme.palette.Background.purple3,
      background: theme.palette.Background.purple3,
      color: theme.palette.Common.White['100p'],
      textTransform: 'none',
      ':hover': {
        backgroundColor: '#B791FF',
        borderColor: theme.palette.Background.purple,
        color: theme.palette.Common.White['100p'],
      },
      padding: '10px 20px',
    }),
  },
};

export default styles;

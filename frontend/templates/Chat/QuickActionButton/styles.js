const styles = {
  actionButtonGridProps: {
    container: true,
    item: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  actionButtonProps: (color) => ({
    variant: 'outlined',
    sx: (theme) => ({
      borderRadius: '18px',
      height: 'auto',
      borderColor: color || theme.palette.Background.purple3,
      background: color || theme.palette.Background.purple3,
      color: theme.palette.Common.White['100p'],
      textTransform: 'none',
      ':hover': {
        backgroundColor: color ? `${color}BB` : '#B791FF',
        borderColor: color || theme.palette.Background.purple,
        color: theme.palette.Common.White['100p'],
      },
      ml: { laptop: -3, desktop: -2, desktopMedium: -4.5 },
      mr: { laptop: -2, desktop: -1, desktopMedium: -3 },
    }),
  }),

  iconButtonProps: {
    sx: {
      padding: '8px',
    },
  },
  buttonTextProps: {
    sx: {
      padding: '8px',
    },
  },
  menuListProps: {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      padding: 1,
      margin: '15px',
    },
  },
  paperProps: {
    sx: {
      backgroundColor: 'transparent !important',
      boxShadow: 'none',
    },
  },
  menuItemProps: (isDisabled) => ({
    sx: (theme) => ({
      borderRadius: '18px',
      margin: '0 5px',

      borderColor: theme.palette.Background.purple3,
      background: theme.palette.Background.purple3,
      color: theme.palette.Common.White['100p'],
      textTransform: 'none',
      ':hover': {
        backgroundColor: isDisabled ? 'none' : '#B791FF',
        borderColor: isDisabled
          ? theme.palette.Background.purple3
          : theme.palette.Background.purple,
        color: isDisabled
          ? theme.palette.Common.White['60p']
          : theme.palette.Common.White['100p'],
      },
      padding: '5px 20px',
      opacity: isDisabled ? 0.5 : 1,
      PointerEvent: isDisabled ? 'none' : 'auto',

      fontSize: { laptop: '13px', desktop: '12px', desktopMedium: '14px' },
      pl: { laptop: 1, desktop: 1, desktopMedium: 1 },
      pr: { laptop: 1, desktop: 1, desktopMedium: 1 },
    }),
  }),
};

export default styles;

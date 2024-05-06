const styles = {
  iconButtonProps: {
    'aria-haspopup': 'true',
    sx: {
      padding: '4px',
      width: '48px',
      height: '48px',
    },
  },
  avatarProps: (avatarColour) => ({
    sx: (theme) => ({
      backgroundColor: avatarColour,
      width: '48px',
      height: '48px',
      border: `3px solid ${theme.palette.Dark_Colors.Dark[1]}`,
      '& span': {
        marginTop: '5px',
        transform: 'scale(1.2)',
      },
    }),
  }),
};

export default styles;

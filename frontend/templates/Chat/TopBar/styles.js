const styles = {
  topBar: {
    newChatProps: {
      sx: {
        textTransform: 'none',
        color: 'gray',
        border: '2px solid transparent',
        background: 'transparent',
        '&:hover': {
          background:
            'linear-gradient(white, white) padding-box, linear-gradient(to right, #8e2de2, #4a00e0) border-box transparent',
          color: '#8e2de2',
          border: '2px solid transparent',
        },
        transition: 'all 0.3s',
      },
    },
    barProps: {
      sx: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '15px 15px',
        display: 'flex',
        justifyContent: 'center',
        padding: '5px',
        gap: '1.5rem',
      },
    },
  },

  actionButtonGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
  },

  actionButtonProps: {
    variant: 'outlined',
    sx: (theme) => ({
      borderRadius: '5px',
      height: 'auto',
      border: `2px solid ${theme.palette.Background.purple3}`,
      background: theme.palette.Common.White['100p'],
      color: theme.palette.Background.purple3,
      textTransform: 'none',
      ':hover': {
        backgroundColor: theme.palette.Background.gradient.basicPurple,
        borderColor: theme.palette.Background.purple3,
        color: theme.palette.Common.White['100p'],
        border: `2px solid ${theme.palette.Background.purple3}`,
      },
    }),
  },
};
export default styles;

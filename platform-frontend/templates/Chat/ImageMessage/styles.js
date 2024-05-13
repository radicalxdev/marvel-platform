const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    mt: 3,
  },
  messageWrapperProps: (isMyMessage) => ({
    position: 'relative',
    container: true,
    item: true,
    mobileSmall: 8,
    p: 0.5,
    maxWidth: '100%',
    sx: {
      borderRadius: '20px',
      overflow: 'hidden',
      textAlign: 'left',
      background: (theme) =>
        isMyMessage
          ? theme.palette.Background.gradient.teal
          : theme.palette.primary.main,
      '::before': {
        position: 'absolute',
        content: '""',
        width: 'calc(100% + 3px)',
        height: 'calc(100% + 3px)',
        bottom: '-3px',
        right: '-3px',
        backgroundImage: isMyMessage
          ? 'linear-gradient(315deg, #12D18E 0%, #71E3BB 100%)'
          : 'linear-gradient(45deg, #e71de7 0%, #6335f8 55%)',
        zIndex: -1,
        borderRadius: '22px',
      },
    },
  }),
};

export default styles;

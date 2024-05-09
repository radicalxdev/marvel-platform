const styles = {
  mainGridProps: (isMyMessage) => ({
    container: true,
    item: true,
    mobileSmall: 12,
    alignItems: 'center',
    justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
    mt: 3,
  }),
  messageProps: (isMyMessage) => ({
    sx: {
      width: '100%',
      textWrap: 'wrap',
      wordWrap: 'break-word',
      fontFamily: 'Satoshi Medium',
      fontSize: { laptop: '16px', desktop: '18px', desktopMedium: '20px' },
      color: (theme) =>
        isMyMessage ? theme.palette.Dark_Colors.Dark[1] : 'white',
      ol: {
        ml: 4,
      },
      ul: {
        ml: 4,
      },
      pre: {
        fontFamily: 'inherit',
        fontSize: 'inherit',
        div: {
          code: { whiteSpace: 'pre-wrap !important' },
          overflow: 'auto',
        },
      },
      p: {
        code: { whiteSpace: 'pre-wrap !important', overflow: 'auto' },
        'p:not(:last-child)': {
          marginBottom: '16px',
        },
        'ul:not(:last-child)': {
          marginBottom: '16px',
        },
        li: {
          marginBottom: '16px',
          p: { marginBottom: '0px !important' },
        },
      },
    },
  }),
  messageWrapperProps: (isMyMessage) => ({
    position: 'relative',
    container: true,
    item: true,
    width: 'auto',
    maxWidth: '100%',
    sx: {
      borderRadius: '18px',
      px: isMyMessage && { laptop: 2, desktop: 2.5, desktopMedium: 3 },
      py: isMyMessage && { laptop: 1, desktop: 1.5, desktopMedium: 2 },
      textAlign: 'left',
      background: (theme) => isMyMessage && theme.palette.Background.green,
    },
  }),
};

export default styles;

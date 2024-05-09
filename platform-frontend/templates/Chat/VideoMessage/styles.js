const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    mt: 3,
  },
  messageWrapperProps: (isMyMessage, loading) => ({
    position: 'relative',
    container: true,
    item: true,
    mobileSmall: 12,
    maxWidth: '100%',
    sx: {
      borderRadius: '18px',
      overflow: 'hidden',
      textAlign: 'left',
      aspectRatio: '16 / 9',
      opacity: loading ? 0.5 : 1,
      background: (theme) =>
        isMyMessage && theme.palette.Background.gradient.teal,
    },
  }),
  skeletonVideoProps: {
    variant: 'rectangular',
    animation: 'wave',
    width: '100%',
    height: '100%',
  },
  skeletonIconGridProps: {
    position: 'absolute',
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
};

export default styles;

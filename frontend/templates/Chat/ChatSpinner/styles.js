const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    mt: 3,
  },
  mainProps: {
    width: '25px',
    height: '12px',
    sx: {
      background:
        'radial-gradient(circle closest-side, #B791FF 90%, #0000) 0% 50%, radial-gradient(circle closest-side, #B791FF 90%, #0000) 50% 50%, radial-gradient(circle closest-side, #B791FF 90%, #0000) 100% 50%',
      backgroundSize: 'calc(100% / 3) 6px',
      backgroundRepeat: 'no-repeat',
      animation: 'd3 1s infinite linear',
    },
  },
  messageWrapperProps: () => ({
    position: 'relative',
    container: true,
    item: true,
    width: 'auto',
    maxWidth: '100%',
    sx: {
      borderRadius: '18px',
      px: 3,
      py: { laptop: 1.5, desktop: 2 },
      textAlign: 'left',
      background: 'transparent',
      border: '2px solid #B791FF',
    },
  }),
};

export default styles;

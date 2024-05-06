const styles = {
  introVideoGridProps: {
    position: 'relative',
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    rowGap: 6,
    padding: 6,
    height: '100%',
  },
  videoGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    overflow: 'hidden',
    height: '50%',
    minHeight: '600px',
  },
  innerVideoGridProps: {
    height: '100%',
    padding: '4px',
    borderRadius: '14px',
    desktopLarge: 8,
    desktopMedium: 9,
    mobileSmall: 10,
    sx: {
      background: (theme) => theme.palette.Background.gradient.purple2,
    },
  },
  iframeGridProps: {
    mobileSmall: 12,
    borderRadius: '16px',
    height: '100%',
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[1],
  },
  iframeProps: {
    width: '100%',
    height: '100%',
    style: { border: 'none', borderRadius: '12px' },
    allow:
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
  },
  backdropProps: {
    closeOnClick: true,
    level: 1,
    extraBackdropProps: {
      bgcolor: 'rgba(0, 0, 0, 0.8)',
    },
  },
};

export default styles;

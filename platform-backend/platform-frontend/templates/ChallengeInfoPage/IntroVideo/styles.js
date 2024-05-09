const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    px: { laptop: 3, desktop: 4, desktopMedium: 5 },
    py: 3,
    rowGap: { laptop: 1.5, desktop: 2 },
    sx: {
      background: (theme) => theme.palette.Background.gradient.primary,
      borderRadius: '20px',
    },
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '28px', desktop: '32px', desktopMedium: '36px' },
    color: 'white',
    lineHeight: { laptop: '50px', desktop: '60px', desktopMedium: '70px' },
  },
  videoGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    borderRadius: '20px',
    overflow: 'hidden',
    sx: {
      aspectRatio: '16 / 9',
      iframe: {
        width: '100%',
        border: 'none',
        borderRadius: '20px',
      },
    },
  },
};

export default styles;

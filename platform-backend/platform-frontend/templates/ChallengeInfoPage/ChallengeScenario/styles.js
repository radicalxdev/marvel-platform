const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    alignItems: 'flex-start',
    px: { laptop: 3, desktop: 4, desktopMedium: 5 },
    py: 3,
    sx: {
      background: (theme) => theme.palette.Background.gradient.primary,
      borderRadius: '20px',
    },
  },
  innerGridProps: {
    container: true,
    item: true,
    height: 'fit-content',
    rowGap: { laptop: 1.5, desktop: 2 },
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '28px', desktop: '32px', desktopMedium: '36px' },
    color: 'white',
    lineHeight: { laptop: '50px', desktop: '60px', desktopMedium: '70px' },
    height: 'fit-content',
  },
  textProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: { laptop: '16px', desktop: '18px' },
    color: 'white',
  },
};

export default styles;

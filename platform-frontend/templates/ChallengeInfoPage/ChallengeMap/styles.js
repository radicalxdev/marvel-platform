const styles = {
  mainGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    px: { laptop: 3, desktop: 4, desktopMedium: 5 },
    pt: 3,
    pb: 5,
    sx: {
      background: (theme) => theme.palette.Background.gradient.primary,
      borderRadius: '12px',
    },
  },
  titleGridProps: {
    item: true,
    mobileSmall: 12,
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '28px', desktop: '32px', desktopMedium: '36px' },
    color: 'white',
    lineHeight: { laptop: '50px', desktop: '60px', desktopMedium: '70px' },
    height: 'fit-content',
    mb: 2,
  },
  descriptionProps: {
    fontFamily: 'Satoshi Medium',
    fontSize: { laptop: '18px', desktop: '20px' },
    color: 'white',
    sx: {
      width: '50%',
    },
  },
  takeOffProps: {
    fontFamily: 'Satoshi Medium',
    fontSize: { laptop: '18px', desktop: '20px' },
    color: 'white',
    sx: {
      mt: 2,
    },
  },
  reXTextProps: {
    color: '#1AD6A1',
    fontFamily: 'Satoshi Medium',
    fontSize: { laptop: '18px', desktop: '20px' },
    component: 'span',
    sx: {
      ml: '8px',
    },
  },
};

export default styles;

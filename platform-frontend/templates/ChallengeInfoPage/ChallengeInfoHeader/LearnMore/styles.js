const styles = {
  textGridProps: {
    container: true,
    item: true,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    px: { laptop: 4, desktop: 5, desktopMedium: 6 },
    mt: { laptop: 1, desktop: 2, desktopMedium: 3 },
    rowGap: 2,
  },
  extraContentGridProps: {
    pt: 7,
    pb: 2,
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[3],
  },
  extraMainGridProps: {
    minHeight: {
      laptop: '600px',
      desktop: '700px',
      desktopMedium: '800px',
      desktopExtraLarge: '1200px',
    },
    width: '100%',
    pl: '10%',
    pr: '10%',
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '24px', desktop: '30px', desktopMedium: '36px' },
    color: 'white',
    lineHeight: { laptop: '50px', desktop: '60px', desktopMedium: '70px' },
  },
  descriptionProps: {
    color: 'white',
    fontFamily: 'Satoshi Regular',
    fontSize: { laptop: '16px', desktop: '18px', desktopMedium: '24px' },
    lineHeight: { laptop: '28px', desktop: '32px', desktopMedium: '36px' },
    letterSpacing: '-0.48px',
  },
};

export default styles;

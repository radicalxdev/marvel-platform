const styles = {
  partnerGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    rowGap: { laptop: 4, desktop: 4.5, desktopMedium: 5 },
    mt: { laptop: 3, desktop: 5, desktopMedium: 12 },
  },
  titleGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerLogoGridProps: {
    container: true,
    item: true,
    columnSpacing: 2,
    laptop: 8,
    desktop: 9,
    desktopMedium: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleProps: {
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '16px', desktop: '18px', desktopMedium: '20px' },
  },
  logoGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 2,
    height: '24px',
    sx: {
      svg: {
        width: '100%',
        height: '100%',
      },
    },
  },
};

export default styles;

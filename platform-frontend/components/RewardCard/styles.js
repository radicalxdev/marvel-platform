const styles = {
  mainGridConfig: {
    item: true,
    desktopLarge: 4,
    desktop: 4,
    laptop: 6,
    tablet: 6,
    minWidth: { laptop: 0, mobileSmall: 290 },
    maxWidth: { tablet: 'none', mobileSmall: 330 },
  },
  cardConfig: {
    elevation: 5,
    sx: {
      position: 'relative',
      height: '254px',
      borderRadius: '24px',
      overflow: 'hidden',
      paddingTop: '24px',
      paddingRight: {
        desktopLarge: '23px',
        desktop: '19px',
        laptop: '33px',
        mobile: '17px',
        mobileSmall: '24px',
      },
      bgcolor: (theme) => theme.palette.Dark_Colors.Dark[2],
    },
  },
  chipGridConfig: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      position: 'relative',
      rigth: 0,
      left: {
        desktopLarge: 'calc(100% - 120px)',
        desktop: 'calc(100% - 100px)',
        laptop: 'calc(100% - 108px)',
        tablet: 'calc(100% - 112px)',
        mobile: 'calc(100% - 165px)',
        mobileSmall: 'calc(100% - 97px)',
      },
      height: '32px',
      width: {
        desktopLarge: '120px',
        desktop: '100px',
        laptop: '108px',
        tablet: '112px',
        mobile: '165px',
        mobileSmall: '97px',
      },
    },
  },
  imageProps: {
    alt: 'reward_image',
    layout: 'fill',
    objectFit: 'fill',
    loading: 'lazy',
  },
  imageSkeleton: {
    imageSkeleton: {
      animation: 'wave',
      variant: 'rectangular',
      sx: {
        width: '100%',
        height: '100%',
      },
    },
  },
};

export default styles;

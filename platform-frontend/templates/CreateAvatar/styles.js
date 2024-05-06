const styles = {
  avatarGridProps: {
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  mainGridProps: {
    container: true,
    desktopLarge: 12,
    height: '100vh',
    px: { laptop: 10, tablet: 6, mobile: 6, mobileSmall: 1 },
    py: { laptop: 11, tablet: 7, mobile: 7, mobileSmall: 2 },
    sx: (theme) => ({
      background: theme.palette.Dark_Colors.Dark[1],
      overflowY: 'auto',
    }),
  },
  titleGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleProps: {
    color: 'white',
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '38px', desktop: '44px', desktopMedium: '48px' },
    lineHeight: '60px',
    sx: {
      mb: { laptop: 4, desktop: 0 },
    },
  },
  studioGridProps: {
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    borderRadius: '20px',
    overflow: 'hidden',
    height: '100%',
  },
  avatarCreatorGridProps: {
    container: true,
    mobileSmall: 12,
    height: '100%',
    sx: (theme) => ({
      aspectRatio: '16 / 9',
      background: theme.palette.Dark_Colors.Dark[1],
      borderRadius: '20px',
      overflow: 'hidden',
      border: `2px solid ${theme.palette.Background.green}`,
    }),
  },
  studioProps: {
    subdomain: 'radicalx-ayg3a2',
    editorConfig: {
      bodyType: 'fullbody',
      clearCache: false,
    },
  },
  selectorContentGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    spacing: 3,
    boxSizing: 'border-box',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselGridProps: {
    item: true,
    container: true,
    mobileSmall: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      '> div': {
        width: '85%',
        top: '-30px',
      },
    },
  },
  carouselProps: {
    navButtonsAlwaysVisible: true,
    autoPlay: false,
    animation: 'slide',
    sx: {
      height: {
        laptop: '40vh',
        desktop: '50vh',
      },
    },
  },
  selectorGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  selectorInnerGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    flexDirection: 'column',
    alignItems: 'center',
    height: 'auto',
  },
  avatarProps: {
    layout: 'fill',
    objectFit: 'contain',
  },
  buttonsGridProps: {
    container: true,
    item: true,
    width: { laptop: '100%', desktop: '85%' },
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: { laptop: 2, desktop: 4 },
    px: '10px',
  },
  confirmButtonProps: {
    type: 'submit',
    color: 'green2',
    inverted: true,
    extraProps: {
      padding: '2px',
      height: { mobileSmall: '40px', desktop: '60px' },
      mobileSmall: true,
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
    },
  },
  createButtonProps: {
    type: 'submit',
    color: 'green2',
    extraProps: {
      padding: '2px',
      height: { mobileSmall: '40px', desktop: '60px' },
      mobileSmall: true,
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
    },
  },
  backButtonProps: {
    size: 'large',
    sx: {
      position: 'absolute',
      top: {
        laptop: 5,
        desktop: 15,
      },
      left: {
        laptop: 5,
        desktop: 15,
      },
    },
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
};

export default styles;

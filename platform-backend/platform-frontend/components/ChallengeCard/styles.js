const styles = {
  mainGridProps: (isMiddleCard) => ({
    container: true,
    item: true,
    desktop: 4,
    laptop: 6,
    ...(isMiddleCard && { mt: { desktop: 3, laptop: 0 } }),
    justifyContent: {
      laptop: 'space-around',
      desktop: 'center',
      desktopMedium: 'flex-start',
    },
  }),
  mainCardGridProps: {
    position: 'relative',
    container: true,
    flexDirection: 'column',
    boxShadow: {
      laptop: '0px 4px 20px #3A1E5D',
      desktop: '0px 4px 30px #3A1E5D',
      desktopMedium: '0px 4px 40px #3A1E5D',
    },
    borderRadius: '20px',
    height: '400px',
    maxWidth: 380,
    sx: (theme) => ({
      background: theme.palette.Background.gradient.primary,
    }),
  },
  challengeDetailsGridProps: {
    position: 'absolute',
    right: { laptop: '-5%', desktopMedium: '-10%' },
    top: '25px',
    mobileSmall: 'auto',
    container: true,
    flexDirection: 'column',
    item: true,
    rowSpacing: 1.5,
  },
  imageGridProps: {
    position: 'relative',
    container: true,
    item: true,
    width: '100%',
    height: '50%',
  },
  imageProps: {
    style: {
      overflow: 'hidden',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
      width: '100%',
    },
    alt: 'mission_image',
    layout: 'fill',
    objectFit: 'cover',
    loading: 'lazy',
  },
  logoProps: {
    alt: 'challenge logo',
    objectFit: 'cover',
  },
  detailsGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    alignItems: 'center',
    overflow: 'hidden',
    sx: {
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
    },
    px: { mobileSmall: 2, desktopMedium: 3 },
    pt: 6.5,
  },
  titleProps: (title) => ({
    color: 'white',
    fontFamily: 'Ethnocentric Regular',
    fontSize: {
      laptop: '26px',
      desktopMedium: '28px',
    },
    lineHeight: '32px',
    sx: {
      position: 'absolute',
      width: '74%',
      top: '92%',
      left: { mobileSmall: '16px', desktopMedium: '24px' },
      zIndex: 0,
      '::before': {
        content: `"${title}"`,
        position: 'absolute',
        WebkitTextStroke: '10px #000',
        left: 0,
        zIndex: '-1',
      },
    },
  }),
  descriptionProps: {
    color: 'white',
    fontFamily: 'Satoshi Regular',
    fontSize: '16px',
    overflow: 'hidden',
    sx: {
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
    },
  },
  previewButtonProps: {
    color: 'green',
    text: 'Preview',
    inverted: true,
    extraProps: { padding: '2px', height: '36px' },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '14px',
      boxShadow: '0px 7px 25px #3A1E5D',
      px: 4,
    },
  },
  otherDetailsGridProps: {
    container: true,
    item: true,
    justifyContent: 'space-between',
    alignItems: 'center',
    mobileSmall: 'auto',
    px: { mobileSmall: 2, desktopMedium: 3 },
    pb: 2,
  },
  detailItemGridProps: {
    position: 'relative',
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 'auto',
  },
  lengthProps: {
    color: 'white',
    fontFamily: 'Satoshi Regular',
    fontSize: '14px',
    sx: {
      span: {
        fontFamily: 'Satoshi Bold',
      },
    },
  },
  chipProps: (color, extraProps) => ({
    sx: {
      fontFamily: 'Satoshi Bold',
      fontSize: '14px',
      px: 1,
      border: '2px solid black',
      color: 'black',
      textTransform: 'capitalize',
      bgcolor: (theme) => theme.palette.Background.chip[color],
      ...extraProps,
    },
  }),
  chipGridProps: {
    container: true,
    item: true,
    justifyContent: 'flex-end',
  },
  continueButtonProps: (questComplete) => ({
    variant: 'white',
    sx: {
      px: 4,
      height: '36px',
      fontSize: '14px',
      color: (theme) =>
        questComplete
          ? theme.palette.Greyscale[700]
          : theme.palette.Background.green,
      fontFamily: 'Satoshi Bold',
    },
  }),
  timerGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 'auto',
  },
  timerTextGridProps: {
    position: 'relative',
    container: true,
    item: true,
    flexDirection: 'column',
    mobileSmall: 'auto',
  },
};

export default styles;

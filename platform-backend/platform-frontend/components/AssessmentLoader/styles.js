const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      background: 'linear-gradient(357deg, #6335F8 0%, #E71DE7 250%)',
    },
  },
  art1GridProps: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '22%',
  },
  art2GridProps: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: {
      mobileSmall: '20%',
      desktop: '12%',
    },
  },
  avatarGridProps: {
    position: 'absolute',
    bottom: 0,
    right: { mobileSmall: 160, desktopExtraLarge: 350 },
    sx: {
      width: {
        mobileSmall: 180,
        desktopMedium: 220,
        desktopLarge: 238,
        desktopExtraLarge: 350,
      },
      height: '75%',
    },
  },
  avatarImgProps: {
    placeholder: 'blur',
    alt: 'avatar',
    layout: 'fill',
  },
  timerGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    rowGap: { mobileSmall: 15, desktopMedium: 25 },
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerTitleGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    sx: {
      color: '#FFF',
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '45px', desktop: '68px' },
      lineHeight: '20px',
    },
  },
  loaderGridProps: {
    position: 'relative',
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    height: { laptop: 200, desktop: 300 },
    width: { laptop: 200, desktop: 300 },
  },
  countdownGridProps: {
    position: 'absolute',
  },
  countdownProps: {
    color: '#FFF',
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '45px', desktop: '68px' },
    lineHeight: '20px',
  },
  loaderImageProps: {
    placeholder: 'blur',
    alt: 'avatar',
    layout: 'fill',
  },
};

export default styles;

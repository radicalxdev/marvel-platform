const styles = {
  mainGridProps: {
    position: 'relative',
    container: true,
    mobileSmall: true,
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 0,
    mt: 10,
    px: { laptop: 2, desktop: 2.5, desktopMedium: 3 },
    sx: {
      overflowY: 'auto',
    },
  },
  noMessagesGridProps: {
    container: true,
    mobileSmall: 12,
    rowGap: 3,
    justifyContent: 'center',
    height: '100%',
    alignContent: 'flex-start',
  },
  profileGridProps: {
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 1.5,
  },
  introGridProps: {
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 1,
  },
  profileProps: {
    position: 'relative',
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
  },
  imageProps: {
    layout: 'fill',
    objectFit: 'cover',
  },
  introTextProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '36px',
    color: 'black',
  },
  subIntroTextProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '18px',
    color: 'black',
  },
  highlightTextProps: {
    component: 'span',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: '#5614F3',
    ml: 0.5,
  },
  descriptionProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '16px',
    color: 'black',
  },
  descriptionGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 6,
    maxWidth: '600px',
  },
};

export default styles;

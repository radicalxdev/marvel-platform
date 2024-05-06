const styles = {
  introGridProps: (minHeight, imgWidth, ...extraGridProps) => ({
    position: 'relative',
    container: true,
    item: true,
    mobileSmall: 12,
    span: {
      minHeight,
      width: imgWidth,
    },
    sx: {
      ...extraGridProps,
    },
  }),
  titleGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
  },
  introTitle: (extraTitleProps) => ({
    fontFamily: 'Ethnocentric Regular Italics',
    lineHeight: '110%',
    color: 'white',
    sx: {
      textShadow: '0px 7px 18px rgba(0, 0, 0, 0.83)',
      ...extraTitleProps,
    },
  }),
  introDescription: {
    color: 'white',
    fontFamily: 'Satoshi Regular',
    fontSize: { laptop: '16px', desktop: '18px' },
  },
  leftSideGridProps: (extraLeftGridProps) => ({
    container: true,
    item: true,
    mobileSmall: 12,
    rowGap: 4,
    zIndex: 10,
    justifyContent: 'flex-start',
    my: 6,
    sx: {
      ...extraLeftGridProps,
    },
  }),
  rightSideGridProps: {
    position: 'absolute',
    right: 0,
    sx: {
      transform: 'scale(1.05)',
    },
    zIndex: 2,
  },
};

export default styles;

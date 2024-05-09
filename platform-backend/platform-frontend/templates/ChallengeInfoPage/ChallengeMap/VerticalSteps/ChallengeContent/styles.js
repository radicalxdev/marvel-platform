const styles = {
  stepProps: (complete) => ({
    sx: {
      ml: { laptop: '21px', desktop: '23px', desktopMedium: '25px' },
      borderLeftWidth: '3px',
      pl: { laptop: '54px', desktop: '70px', desktopMedium: '86px' },
      borderLeftColor: complete && '#1ED494',
    },
  }),
  contentContainerGridProps: (active) => ({
    container: true,
    item: true,
    height: 'auto',
    mobileSmall: 12,
    padding: '2px',
    sx: {
      background: (theme) =>
        active
          ? theme.palette.Background.gradient.blue2
          : theme.palette.Background.primary,
      borderRadius: '22px',
    },
  }),
  contentGridProps: {
    container: true,
    item: true,
    height: 'auto',
    mobileSmall: 12,
    justifyContent: 'space-between',
    padding: { laptop: 3, desktop: 4, desktopMedium: 5 },
    sx: {
      background: (theme) => theme.palette.Background.primary,
      borderRadius: '20px',
    },
  },
  leftSideGridProps: {
    container: true,
    item: true,
    columnGap: 3,
    mobileSmall: true,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rightSideGridProps: {
    position: 'relative',
    container: true,
    item: true,
    mobileSmall: 'auto',
    columnGap: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  iconGridProps: {
    position: 'relative',
    container: true,
    item: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: { laptop: '48px', desktop: '56px', desktopMedium: '70px' },
    height: '100%',
  },
  dotIconGridProps: {
    position: 'relative',
    container: true,
    item: true,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    mobileSmall: 'auto',
  },
  titleGridProps: {
    container: true,
    item: true,
    mobileSmall: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    rowGap: 1,
  },
  iconProps: (complete) => ({
    sx: {
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      mt: 0.5,
      background: (theme) =>
        complete
          ? theme.palette.Background.green
          : theme.palette.Greyscale[600],
    },
  }),
  lockedGridProps: {
    container: true,
    item: true,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: { laptop: '28px', desktop: '32px', desktopMedium: '36px' },
    height: { laptop: '28px', desktop: '32px', desktopMedium: '36px' },
    sx: {
      svg: {
        width: '100%',
        height: '100%',
      },
    },
  },
  titleProps: {
    color: 'white',
    fontFamily: 'Satoshi Regular',
    fontSize: '18px',
  },
  descriptionProps: {
    color: 'white',
    fontFamily: 'Satoshi Regular',
    fontSize: { laptop: '14px', desktop: '16px', desktopMedium: '18px' },
  },
  subtitleProps: {
    component: 'span',
    color: 'white',
    fontFamily: 'Satoshi Bold',
    fontSize: '18px',
  },
};

export default styles;

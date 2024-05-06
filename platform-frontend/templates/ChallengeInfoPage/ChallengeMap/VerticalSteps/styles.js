const styles = {
  stepperGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    px: { laptop: 6, desktop: 8, desktopMedium: 10 },
    pt: 5,
  },
  challengeCompleteProps: {
    component: 'span',
    sx: {
      color: 'white',
      fontFamily: 'Satoshi Regular',
      fontSize: { laptop: '20px', desktop: '22px', desktopMedium: '24px' },
      width: 'auto',
    },
  },
  lockedGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'flex-start',
    mobileSmall: 'auto',
  },
  completeIconGridProps: {
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    width: { laptop: 42, desktop: 46, desktopMedium: 50 },
    height: { laptop: 42, desktop: 46, desktopMedium: 50 },
    borderRadius: '50%',
  },
};

export default styles;

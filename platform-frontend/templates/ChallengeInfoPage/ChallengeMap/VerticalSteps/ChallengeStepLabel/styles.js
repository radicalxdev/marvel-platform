const styles = {
  containerGridProps: {
    container: true,
    justifyContent: 'space-between',
    alignItems: 'center',
    pr: 1,
  },
  typeTextProps: (isMissionLastTask) => ({
    component: 'span',
    sx: {
      mr: 2,
      color: (theme) =>
        isMissionLastTask
          ? theme.palette.Background.purple
          : theme.palette.Background.pink,
      fontFamily: 'Satoshi Regular',
      fontSize: { laptop: '20px', desktop: '22px', desktopMedium: '24px' },
      width: 'auto',
    },
  }),
  challengeTitleProps: {
    component: 'span',
    sx: {
      color: 'white',
      fontFamily: 'Satoshi Regular',
      fontSize: { laptop: '20px', desktop: '22px', desktopMedium: '24px' },
      width: 'auto',
    },
  },
  challengeItemButtonProps: {
    color: 'green',
    extraProps: {
      padding: '2px',
      height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
      px: { laptop: 2, desktop: 3, desktopMedium: 4 },
    },
  },
  reviewButtonProps: {
    variant: 'white',
    sx: {
      px: { laptop: 2, desktop: 3, desktopMedium: 4 },
      height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
      fontSize: { laptop: '14px', desktop: '16px' },
      color: (theme) => theme.palette.Background.green,
      fontFamily: 'Satoshi Bold',
    },
  },
};

export default styles;

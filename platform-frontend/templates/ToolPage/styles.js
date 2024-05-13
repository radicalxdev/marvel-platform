const styles = {
  mainGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 'auto',
    rowGap: 5,
    px: { laptop: 4, desktop: 5, desktopMedium: 6 },
    py: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
  },
  backButtonGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    height: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '36px',
  },
  subtitleProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '18px',
  },
  highlightTextProps: {
    component: 'span',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: (theme) => theme.palette.primary.main,
  },
  formGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  outlinedButtonProps: {
    color: 'purple',
    extraProps: {
      padding: '2px',
      height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Medium',
      fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
      px: { laptop: 1, desktop: 2, desktopMedium: 3 },
    },
  },
};

export default styles;

const styles = {
  flashCardGridProps: {
    container: true,
    item: true,
    laptop: 11,
    dekstop: 9,
    desktopMedium: 8,
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      borderRadius: '5px',
      minHeight: { laptop: '400px', desktop: '450px', desktopMedium: '520px' },
      background: (theme) => theme.palette.Common.White['100p'],
    },
  },
  actionButtonGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};

export default styles;

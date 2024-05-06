const styles = {
  mainGridProps: {
    item: true,
    container: true,
    justifyContent: 'center',
    alignItems: { tablet: 'flex-start', mobileSmall: 'center' },
    alignContent: 'flex-start',
    width: { mobile: '1450px', mobileSmall: '100%' },
    minWidth: {
      desktop: '1200px',
      laptop: '944px',
      tablet: '688px',
      mobileSmall: 0,
    },
    sx: {
      background: (theme) => theme.palette.Background.gradient.primary,
      borderRadius: '24px',
      px: { laptop: 5, desktop: 7 },
      py: { laptop: 4, desktop: 5 },
      rowGap: 12,
    },
  },
};

export default styles;

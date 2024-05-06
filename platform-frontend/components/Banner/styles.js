const styles = {
  bannerGridConfig: (height) => ({
    position: 'relative',
    height: height || '126px',
    item: true,
    container: true,
    desktopLarge: 12,
    justifyContent: 'center',
    overflow: 'hidden',
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[2],
  }),
  imageSkeleton: {
    animation: 'wave',
    variant: 'rectangular',
    sx: {
      width: '100%',
      height: '100%',
    },
  },
};

export default styles;

const styles = {
  mainGridProps: {
    item: true,
    container: true,
    display: { tablet: 'flex', mobileSmall: 'none' },
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
  },
  menuGridProps: {
    container: true,
    columnGap: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      color: 'white',
    },
  },
  logoProps: {
    layout: 'fill',
    objectFit: 'cover',
    priority: true,
    alt: 'mission_logo',
  },
  headerTitleGridProps: {
    mobileSmall: 'auto',
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '20px',
    color: 'white',
  },
  logoGridProps: {
    position: 'relative',
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  skeletonLogoProps: {
    animation: 'wave',
    variant: 'rectangular',
    sx: {
      height: 36,
      width: 36,
      borderRadius: '20px',
    },
  },
  skeletonTitleProps: {
    animation: 'wave',
    variant: 'text',
    fontSize: '20px',
    width: 240,
    height: 50,
  },
};

export default styles;

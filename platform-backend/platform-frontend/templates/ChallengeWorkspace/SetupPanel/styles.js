const styles = {
  mainGridProps: {
    container: true,
    flexDirection: 'column',
    mobileSmall: true,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    px: { mobileSmall: 2, desktopMedium: 3 },
    pb: { mobileSmall: 2, desktopMedium: 3 },
    role: 'tabpanel',
  },
  innerGridProps: {
    container: true,
    item: true,
    rowGap: 2,
    justifyContent: 'flex-start',
    height: 'auto',
  },
  linkGroupGridProps: {
    container: true,
    item: true,
    gap: 2,
    mobileSmall: 'auto',
  },
  linkGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
  },
  linkProps: {
    variant: 'outlined',
    target: '_blank',
    type: 'link',
    sx: {
      borderRadius: '50px',
      columnGap: { mobileSmall: 0.5, desktopMedium: 1 },
      borderColor: (theme) => theme.palette.Greyscale[800],
      fontFamily: 'Satoshi Regular',
      fontSize: { mobileSmall: '14px', desktopMedium: '16px' },
      textTransform: 'capitalize',
      svg: {
        transform: { mobileSmall: 'scale(0.8)', desktopMedium: 'scale(1)' },
      },
    },
  },
  pitchEmbedGridProps: (containerHeight) => ({
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: (theme) => ({
      mobileSmall: `calc(${containerHeight}px - ${theme.spacing(2)})`,
      desktopMedium: `calc(${containerHeight}px - ${theme.spacing(3)})`,
    }),
  }),
};

export default styles;

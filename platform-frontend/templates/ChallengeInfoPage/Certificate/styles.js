const styles = {
  paperProps: {
    sx: () => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      rowGap: 3,
      width: '100%',
    }),
  },
  viewLeaderboardButtonProps: {
    bgcolor: '#181A20',
    color: 'purple2',
    extraProps: {
      width: '100%',
      height: '57px',
    },
    extraButtonProps: {
      fontSize: '18px',
      fontFamily: 'Satoshi Bold',
    },
  },
  imageGridProps: {
    position: 'relative',
    container: true,
    mobileSmall: 12,
    overflow: 'hidden',
    height: '100%',
    bgcolor: '#100a0a',
  },
  imageProps: {
    priority: true,
    alt: 'certificate',
    layout: 'fill',
    objectFit: 'contain',
    placeholder: 'blur',
    style: {
      height: '600px',
      aspectRatio: '16 / 10',
      borderRadius: '30px',
    },
  },
  extraContentGridProps: {
    pt: 7,
    pb: 2,
    bgcolor: '#100a0a',
  },
  extraMainGridProps: {
    minHeight: {
      laptop: '600px',
      desktop: '700px',
      desktopMedium: '800px',
      desktopExtraLarge: '1200px',
    },
    width: '100%',
    pl: '10%',
    pr: '10%',
  },
  downloadGridProps: {
    position: 'relative',
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    sx: {
      transform: (theme) => `translate(0, -${theme.spacing(6)})`,
    },
  },
  downloadButtonProps: {
    color: 'green2',
    bgcolor: '#100a0a',
    iconPlacement: 'left',
    text: 'Download Certificate',
    inverted: true,
    extraProps: {
      padding: '2px',
      height: '36px',
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '14px',
      px: 4,
    },
  },
};

export default styles;

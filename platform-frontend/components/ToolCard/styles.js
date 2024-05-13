const styles = {
  mainGridProps: {
    container: true,
    item: true,
    desktop: 3,
    laptop: 4,
  },
  cardProps: (backgroundColor) => ({
    elevation: 5,
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      position: 'relative',
      height: '150px',
      borderRadius: '10px',
      overflow: 'hidden',
      p: 2,
      background: backgroundColor,
      transition: (theme) => theme.transitions.create('all'),
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.05)',
      },
    },
  }),
  toolDetailsGridProps: {
    position: 'relative',
    container: true,
    item: true,
    mobileSmall: 12,
    rowGap: 1.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '14px',
    color: (theme) => theme.palette.Common.White['100p'],
  },
  contentGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  descriptionProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '12px',
    color: (theme) => theme.palette.Common.White['100p'],
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    sx: {
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
    },
  },
  imageProps: {
    layout: 'fill',
    objectFit: 'fill',
    loading: 'lazy',
    width: '100%',
    height: '100%',
  },
  imageGridProps: {
    position: 'relative',
    container: true,
    item: true,
    width: 52,
    height: 52,
    borderRadius: '50%',
  },
};

export default styles;

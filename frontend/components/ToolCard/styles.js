import { getRandomBackgroundColor } from '@/utils/MiscellaneousUtils';

const styles = {
  mainGridProps: {
    container: true,
    item: true,
    desktopLarge: 3,
    laptop: 3,
  },
  cardProps: {
    elevation: 5,
    sx: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      position: 'relative',
      width: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: (theme) => theme.transitions.create('all'),
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.05)',
      },
    },
  },
  imageProps: (backgroundImgURL) => ({
    width: '100%',
    height: '144px',
    justifyContent: 'end',
    sx: {
      flexShrink: 0,
      ...(backgroundImgURL && {
        backgroundImage: `url(${backgroundImgURL})`,
        backgroundSize: 'cover',
      }),
      ...(!backgroundImgURL && {
        background: getRandomBackgroundColor(),
      }),
    },
  }),
  toolDetailsGridProps: {
    display: 'position',
    container: true,
    item: true,
    mobileSmall: 12,
    rowGap: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    p: '18px',
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '16px',
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
    fontSize: '14px',
    color: (theme) => theme.palette.Common.White['100p'],
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    sx: {
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
    },
  },
  labelProps: {
    sx: {
      borderColor: '#9D74FF',
    },
  },
};

export default styles;

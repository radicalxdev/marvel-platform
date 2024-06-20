import { getRandomBackgroundColor } from '@/utils/MiscellaneousUtils';

const styles = {
  mainGridProps: {
    container: true,
    item: true,
    sx: {
      width: '600px',
    },
  },
  historyCardProps: {
    container: true,
    item: true,
    sx: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: '#FFFFFF',
      transition: (theme) => theme.transitions.create('all'),
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  cardProps: (backgroundImgURL) => ({
    elevation: 5,
    sx: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      height: '200px',
      width: '25%',
      overflow: 'hidden',
      p: 2,
      ...(backgroundImgURL && {
        backgroundImage: `url(${backgroundImgURL})`,
        backgroundSize: 'cover',
      }),
      ...(!backgroundImgURL && {
        background: getRandomBackgroundColor(),
      }),
    },
  }),
  imageGridProps: {
    position: 'relative',
    container: true,
    item: true,
    width: 48,
    height: 48,
    borderRadius: '50%',
  },
  imageProps: {
    layout: 'fill',
    objectFit: 'cover',
  },
  dateProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '14px',
    color: '#FF0000',
    backgroundColor: '#FFC0CB',
    borderRadius: '100px',
    padding: '5px',
    boxShadow: '2px 2px #888888',
    display: 'inline-block',
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '24px',
    color: (theme) => theme.palette.Common.Black['100p'],
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    sx: {
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
    },
  },
  descriptionProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '16px',
    color: (theme) => theme.palette.Common.Black['100p'],
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    sx: {
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
    },
  },
  previewButtonProps: {
    variant: 'contained',
    color: 'primary',
    size: 'small',
    sx: {
      borderRadius: '100px',
      transition: (theme) => theme.transitions.create('all'),
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  cardContentProps: {
    sx: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '75%',
    },
  },
};

export default styles;

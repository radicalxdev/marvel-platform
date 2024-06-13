import { getRandomBackgroundColor } from '@/utils/MiscellaneousUtils';
// Styling needs fixing here
const styles = {
  mainGridProps: {
    container: true,
    item: true,
  },
  historycardProps: {
    container: true,
    item: true,
    display: 'flex',
    flexDirection: 'row',
  },
  cardProps: (backgroundImgURL) => ({
    elevation: 5,
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      position: 'relative',
      height: '200px',
      width: '100%',
      borderRadius: '10px',
      overflow: 'hidden',
      p: 2,
      ...(backgroundImgURL && {
        backgroundImage: `url(${backgroundImgURL})`,
        backgroundSize: 'cover',
      }),
      ...(!backgroundImgURL && {
        background: getRandomBackgroundColor(),
      }),
      transition: (theme) => theme.transitions.create('all'),
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.05)',
      },
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
  contentGridProps: {
    container: true,
    item: true,
    direction: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  dateProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '12px',
    color: (theme) => theme.palette.Common.Black['100p'],
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '16px',
    color: (theme) => theme.palette.Common.Black['100p'],
  },
  descriptionProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '14px',
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
  },
  toolDetailsGridProps: {
    container: true,
    item: true,
    direction: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
};

export default styles;

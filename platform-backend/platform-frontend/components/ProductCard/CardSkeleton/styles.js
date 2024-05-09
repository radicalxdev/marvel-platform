const styles = {
  skeletonButtonProps: {
    width: '100%',
    animation: 'wave',
    variant: 'mission',
    sx: {
      borderRadius: '100px',
      height: {
        laptop: '38px',
        tablet: '28px',
        mobileSmall: '26px',
      },
    },
  },
  skeletonTitleDescriptionProps: {
    animation: 'wave',
    variant: 'text',
    width: '60%',
    height: '55px',
  },
  skeletonFeatureProps: {
    animation: 'wave',
    variant: 'text',
    width: '60%',
    height: '40px',
  },
  imageSkeletonProps: {
    animation: 'wave',
    variant: 'rectangular',
    width: '100%',
    height: '100%',
  },
  checkmarkSkeletonProps: {
    animation: 'wave',
    variant: 'circular',
    width: 30,
    height: 30,
  },
  skeletonTitleProps: {
    animation: 'wave',
    variant: 'text',
    width: '30%',
    height: 50,
  },
  skeletonDescriptionProps: {
    animation: 'wave',
    variant: 'text',
    width: '75%',
    height: 35,
  },
  priceSkeletonProps: {
    animation: 'wave',
    variant: 'text',
    width: '45%',
    height: 60,
  },
};

export default styles;

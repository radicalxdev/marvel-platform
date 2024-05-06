const styles = {
  skeletonLeaderNameProps: {
    animation: 'wave',
    variant: 'text',
    height: 50,
  },
  skeletonLeaderScoreProps: {
    animation: 'wave',
    variant: 'text',
    height: 50,
    sx: {
      width: { tablet: 80, mobileSmall: 40 },
    },
  },
  skeletonLeaderAvatarProps: {
    animation: 'wave',
    variant: 'rounded',
    height: 40,
    width: 40,
    sx: { borderRadius: '50%' },
  },
  skeletonLeaderPositionProps: {
    animation: 'wave',
    variant: 'text',
    width: 20,
    height: 35,
  },
};

export default styles;

const styles = {
  leaderItemGridProps: {
    container: true,
    item: true,
    rowGap: '12px',
  },
  leaderItemDetailsGridProps: {
    container: true,
    item: true,
    desktopLarge: 12,
    height: 100,
  },
  positionGridProps: {
    container: true,
    item: true,
    pl: 1,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 'auto',
  },
  positionProps: {
    color: 'white',
    fontSize: { mobileSmall: '20px', desktop: '24px' },
    fontFamily: 'Satoshi Bold',
    lineHeight: '160%',
    textAlign: 'center',
    minWidth: '30px',
  },
  leaderDetailsGridProps: {
    container: true,
    item: true,
    mobileSmall: 5,
    desktop: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: 2,
    sx: {
      flexWrap: 'nowrap',
      textWrap: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  correctAnswersGridProps: {
    container: true,
    item: true,
    mobileSmall: 2.5,
    desktop: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    pl: '4px',
  },
  durationGridProps: {
    container: true,
    item: true,
    mobileSmall: 2.5,
    desktop: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    pl: '4px',
  },
  leaderNameProps: {
    color: 'white',
    fontSize: { mobileSmall: '20px', desktop: '24px' },
    fontFamily: 'Satoshi Bold',
    lineHeight: '160%',
    whiteSpace: 'pre-wrap',
  },
  timeProps: {
    color: 'grey',
    fontSize: { laptop: '14px', tablet: '10px', mobileSmall: '8px' },
    fontFamily: 'Satoshi Bold',
    lineHeight: '160%',
  },
  leaderScoreGridProps: {
    container: true,
    item: true,
    alignItems: 'center',
    mobileSmall: 2,
    justifyContent: 'flex-start',
    pl: '4px',
  },
  leaderScoreProps: {
    textAlign: 'right',
    fontSize: { mobileSmall: '20px', desktop: '24px' },
    fontFamily: 'Satoshi Bold',
    lineHeight: '160%',
    sx: (theme) => ({
      background: theme.palette.Background.gradient.blue2,
      WebkitBackgroundClip: 'text',
      color: 'transparent',
    }),
  },
  iconButtonProps: (liveUrl, avatarColour) => ({
    'aria-haspopup': 'true',
    sx: {
      width: {
        tablet: '48px',
        mobile: '36px',
        mobileSmall: '28px',
      },
      height: {
        tablet: '48px',
        mobile: '36px',
        mobileSmall: '28px',
      },
      '& span': {
        marginTop: liveUrl && '15px !important',
        transform: liveUrl && 'scale(2)',
        width: { tablet: '48px', mobile: '36px', mobileSmall: '28px' },
        height: { tablet: '48px', mobile: '36px', mobileSmall: '28px' },
      },
      '& .MuiBadge-badge': {
        bottom: { mobile: 'none', mobileSmall: '20%' },
        right: { mobile: 'none', mobileSmall: '25%' },
      },
      overflow: 'hidden',
      backgroundColor: liveUrl && avatarColour,
    },
  }),
  avatarConfig: {
    layout: 'fill',
    objectFit: 'contain',
  },

  dividerGridProps: {
    item: true,
    mobileSmall: 12,
  },
};

export default styles;

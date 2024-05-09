const styles = {
  mainGridConfig: (complete, isPaymentPage, isHackathon) => ({
    container: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    mx: !isHackathon && { tablet: 3, mobile: 2, mobileSmall: 2 },
    px: 2,
    py: { tablet: 2, mobile: 1, mobileSmall: '8px' },
    rowGap: { tablet: 2, mobileSmall: 1 },
    boxSizing: 'border-box',
    border: (theme) => `1px solid ${theme.palette.Other.QuestCardBorder}`,
    borderRadius: '20px',
    height:
      complete || isPaymentPage
        ? 'auto'
        : { tablet: '228px', mobile: '170px', mobileSmall: '142px' },
  }),
  missionButtonConfig: (enrolling) => ({
    fullWidth: true,
    variant: 'mission',
    sx: (theme) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '100px',
      textTransform: 'capitalize',
      fontFamily: 'Satoshi Black',
      fontSize: { laptop: '16px', mobileSmall: '14px' },
      height: {
        laptop: '38px',
        tablet: '28px',
        mobile: '26px',
        mobileSmall: '26px',
      },
      [theme.breakpoints.down('tablet')]: {
        boxShadow: `2px 2px 0px rgba(${theme.palette.primary.main}, 0.65)`,
      },
      svg: !enrolling && {
        width: { mobileSmall: '18px', tablet: '20px' },
        height: { mobileSmall: '18px', tablet: '20px' },
        marginLeft: 1,
      },
    }),
  }),
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
  timerTitleConfig: {
    variant: 'Subtitle 1',
    textTransform: 'uppercase',
    color: (theme) => theme.palette.Common.White['100p'],
    fontSize: { laptop: '20px', mobileSmall: '16px' },
  },
  timerGridConfig: (timerContainerProps) => ({
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    ...timerContainerProps,
  }),
  titleGridConfig: (timerContainerProps) => ({
    item: true,
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    ...timerContainerProps,
  }),
};

export default styles;

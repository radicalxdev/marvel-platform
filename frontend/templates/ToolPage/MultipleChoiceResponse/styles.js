const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    rowGap: 4,
    px: 6,
    py: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    sx: {
      background: (theme) => theme.palette.Common.White['100p'],
    },
  },
  titleGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '20px', desktop: '24px' },
  },
  questionsGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    rowGap: 1.5,
  },
  questionGridProps: {
    container: true,
    item: true,
    gap: 1.5,
    mobileSmall: 12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  questionTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '18px', desktop: '20px' },
  },
  choiceProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: { laptop: '18px', desktop: '20px' },
  },
};

export default styles;

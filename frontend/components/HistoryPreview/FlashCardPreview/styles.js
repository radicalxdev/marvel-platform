const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    rowGap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionsGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 3,
  },
  questionGridProps: {
    container: true,
    item: true,
    gap: 2,
    mobileSmall: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    px: 6,
    py: 10,
    sx: {
      background: (theme) => theme.palette.Common.White['100p'],
      borderRadius: '10px',
      border: '2px solid black', // Add this line to define the border
    },
  },
  questionTitleProps: {
    fontFamily: 'Satoshi Bold',
    color: '#000000',
    fontSize: { laptop: '18px', desktop: '20px' },
  },
  choiceProps: {
    fontFamily: 'Satoshi Regular',
    color: '#000000',
    fontSize: { laptop: '18px', desktop: '20px' },
    textAlign: 'center',
  },
};
export default styles;

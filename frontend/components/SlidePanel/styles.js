const styles = {
  drawerProps: {
    sx: {
      '& .MuiDrawer-paper': {
        width: '45%', // Adjust this value to control the width of the drawer
        background: (theme) => theme.palette.Common.White['100p'],
      },
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'column',
      rowGap: 3,
    },
    anchor: 'right',
  },
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    rowGap: 3,
    padding: 3,
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '36px',
  },
  categoryTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '24px',
    color: (theme) => theme.palette.Common.Black['100p'],
  },
  categoryDescriptionProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '18px',
    color: (theme) => theme.palette.Greyscale[400],
  },
  questionProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '20px',
    color: (theme) => theme.palette.Common.Black['100p'],
  },
  optionProps: {
    fontFamily: 'Satoshi',
    fontSize: '20px',
    color: (theme) => theme.palette.Common.Black['100p'],
  },
  containerGridProps: {
    item: true,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerGridProps: {
    container: true,
    item: true,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    pb: 1.5,
    sx: {
      borderBottom: (theme) => `2px solid ${theme.palette.Greyscale[400]}`,
    },
  },
};

export default styles;

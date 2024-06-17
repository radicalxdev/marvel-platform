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
    mt: '10px', // Add margin-top to space it from the date
  },
  categoryDescriptionProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '18px',
    color: (theme) => theme.palette.Greyscale[400],
    mt: '5px', // Add margin-top to space it from the title
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
    alignItems: 'flex-start', // Align items to the start (left)
    flexDirection: 'column',
    pb: 1.5,
    sx: {
      borderBottom: (theme) => `2px solid ${theme.palette.Greyscale[400]}`,
    },
  },
  dateProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '14px', // Increase the font size
    backgroundColor: '#E0DFFB', // Light purple background
    borderRadius: '12px', // Make it more rounded
    color: '#4900E4', // Purple text color
    padding: '5px 10px', // Add padding to increase the size
    textTransform: 'none',
    marginBottom: '10px', // Add margin to position the date properly
    display: 'inline-block', // To ensure the background fits snugly
    marginTop: '5px',
    alignSelf: 'flex-start', // Align to the left
    fontWeight: 'bold', // Make the text bold
  },
};

export default styles;

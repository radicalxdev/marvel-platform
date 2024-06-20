const styles = {
  mainGridProps: {
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  drawerGridProps: {
    width: '698px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    sx: {
      '& .MuiDrawer-paper': {
        background: '#fff',
        width: '698px',
        p: '20px 40px',
      },
    },
  },
  headerGridProps: {
    container: true,
    item: true,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
    sx: {
      color: 'black',
    },
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '20px',
    fontWeight: 700,
  },
  dateProps: {
    display: 'flex',
    fontFamily: 'Satoshi Regular',
    fontSize: '12px',
    fontWeight: 700,
    borderRadius: 58,
    border: 'none',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    color: '#4900E4',
  },
  descriptionProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '16px',
    fontWeight: 700,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: '#B8B8B8',
  },
  underlineProps: {
    borderBottom: '2px solid #B8B8B8',
    width: '100%',
    my: '10px',
  },
  listGridProps: {
    container: true,
    item: true,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    py: 2,
  },
  listProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '18px',
    fontWeight: 700,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  listTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '16px',
    fontWeight: 700,
    color: 'black',
  },
  listItemGridProps: {
    container: true,
    item: true,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  listItemProps: {
    sx: {
      color: 'black',
      fontFamily: 'Satoshi Regular',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '14px',
      textTransform: 'lowercase',
    },
  },
  answerKeyGridProps: {
    container: true,
    item: true,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  answerKeyTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '16px',
    fontWeight: 700,
    color: 'black',
  },
  answerKeyItemProps: {
    sx: {
      color: 'black',
      fontFamily: 'Satoshi Regular',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '14px',
      textTransform: 'lowercase',
    },
  },

  // For HistoryDrawerButtons

  mainGridButtonProps: {
    container: true,
    item: true,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 1.5,
    py: 1.5,
  },
  buttonProps: {
    sx: {
      display: 'flex',
      gap: 1,
      backgroundColor: '#F3F0FF',
      borderRadius: '100px',
      color: '#4900E4',
      fontFamily: 'Satoshi Bold',
      fontSize: '14px',
      fontWeight: 700,
      textTransform: 'none',
      width: '116px',
      '&:hover': {
        backgroundColor: '#F3F0FF',
        color: '#4900E4',
      },
    },
  },
  buttonIconProps: {
    sx: {
      color: '#4900E4',
      fontSize: '20px',
    },
  },
};

export default styles;

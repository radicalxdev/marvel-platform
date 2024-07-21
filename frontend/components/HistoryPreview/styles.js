const styles = {
  mainGridProps: {
    container: true,
    item: true,
  },
  previewContainerProps: {
    sx: {
      backgroundColor: '#FFFFFF',
      height: '100%', // Ensure it takes the full height of the drawer
      display: 'flex',
      flexDirection: 'column',
      padding: '2% 5%',
      overflowY: 'scroll', // Ensure vertical scrolling
      scrollbarWidth: 'thin', // For Firefox
      '&::-webkit-scrollbar': {
        width: '8px', // For Chrome, Safari and Opera
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ccc',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#aaa',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f2f2f2',
      },
    },
  },
  headerProps: {
    sx: {
      borderBottom: '2px solid #d3d3d3',
    },
  },
  drawerProps: {
    anchor: 'right',
    sx: {
      width: '550px',
      height: '100%', // Ensure it takes the full height of the viewport
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: '550px',
        height: '100%', // Ensure it takes the full height of the viewport
        boxSizing: 'border-box',
        overflow: 'auto', // Ensure vertical scrolling within the drawer
        scrollbarWidth: 'thin', // For Firefox
        '&::-webkit-scrollbar': {
          width: '8px', // For Chrome, Safari and Opera
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ccc',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#aaa',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f2f2f2',
        },
      },
    },
  },
  listContentProps: {
    sx: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
  },
  listSubHeaderProps: {
    sx: {
      position: 'relative',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      fontSize: '20px',
      fontFamily: 'Satoshi Bold',
    },
  },
  listTextProps: {
    sx: {
      '& .MuiListItemText-primary': {
        color: '#000000',
        fontSize: '20px',
        fontFamily: 'Satoshi Bold',
      },
    },
  },
  subListTextProps: {
    sx: {
      '& .MuiListItemText-primary': {
        color: '#000000',
        fontFamily: 'Satoshi Regular',
        fontSize: '16px',
      },
    },
  },
  closeButtonProps: {
    sx: {
      color: '#4900E4',
      backgroundColor: '#FFFFFF',
      zIndex: 1300,
      position: 'absolute',
      top: '20px',
      right: '575px',
      transition: (theme) => theme.transitions.create('all'),
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#FFFFFF',
        color: '#97f8fb',
      },
    },
  },
  dateProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '14px',
    color: '#4900E4',
    backgroundColor: '#F2F2F2',
    borderRadius: '100px',
    padding: '5px',
    display: 'inline-block',
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '24px',
    color: (theme) => theme.palette.Common.Black['100p'],
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    sx: {
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
    },
  },
  descriptionProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '16px',
    color: '#B8B8B8',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    sx: {
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
    },
  },
  gridButtonProps: {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  },
  buttonProps: {
    size: 'small',
    sx: {
      borderRadius: '100px',
      border: '1px solid black',
      backgroundColor: '#F2F2F2',
      padding: '7px',
      color: '#4900E4',
      transition: (theme) => theme.transitions.create('all'),
      '&:hover': {
        cursor: 'pointer',
        color: '#97f8fb',
      },
    },
  },
};

export default styles;

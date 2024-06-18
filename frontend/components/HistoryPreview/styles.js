const styles = {
  mainGridProps: {
    container: true,
    item: true,
  },
  previewContainerProps: {
    sx: {
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      padding: '5%',
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
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: '550px',
        boxSizing: 'border-box',
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
        backgroundColor: '#d3d3d3',
      },
    },
  },
  dateProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '14px',
    color: 'primary',
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
};

export default styles;

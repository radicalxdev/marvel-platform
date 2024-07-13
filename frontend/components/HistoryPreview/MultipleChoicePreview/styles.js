const styles = {
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
};

export default styles;

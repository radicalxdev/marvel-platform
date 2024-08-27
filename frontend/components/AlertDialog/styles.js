const styles = {
  dialogProps: {
    sx: {
      '& .MuiDialog-paper': {
        backgroundColor: 'black',
      },
    },
  },
  dialogTitleProps: {
    sx: {
      color: 'white',
      fontSize: '24px',
      fontFamily: 'Satoshi Bold',
    },
  },
  dialogContentProps: {
    sx: {
      color: 'white',
      fontSize: '18px',
      fontFamily: 'Satoshi Regular',
    },
  },
  dialogButtonProps: {
    sx: {
      color: '#B791FF',
      fontSize: '16px',
      fontFamily: 'Satoshi Regular',
      transition: (theme) => theme.transitions.create('all'),
      '&:hover': {
        cursor: 'pointer',
        color: '#B791FF95',
      },
    },
  },
};

export default styles;

const styles = {
  formGridProps: {
    item: true,
    container: true,
    justifyContent: 'flex-start',
    mobileSmall: 12,
    rowSpacing: 6,
    columnSpacing: 5,
  },
  submitButtonGridProps: {
    item: true,
    mobileSmall: 12,
    container: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  submitButtonProps: {
    extraProps: { padding: '2px', height: '54px' },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '14px',
      px: 5,
      py: 2,
      letterSpacing: '0.5px',
      minWidth: '160px',
    },
  },
  emailInputGridProps: {
    position: 'relative',
    item: true,
    mobileSmall: 6,
  },
  editButtonProps: {
    sx: {
      position: 'absolute',
      bottom: '64px',
      right: 0,
      zIndex: 50,
      padding: '4px',
    },
  },
};

export default styles;

const styles = {
  mainGridProps: {
    container: true,
    direction: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    sx: { p: 3, textAlign: 'center' },
  },
  titleProps: {
    variant: 'h4',
    gutterBottom: true,
    color: '#fff',
    fontWeight: 700,
    fontSize: '44px',
  },
  spanProps: {},
  descriptionProps: {
    variant: 'body1',
    paragraph: true,
    color: '#fff',
    fontWeight: 400,
    fontSize: '24px',
  },
  buttonProps: {
    sx: {
      backgroundColor: '#8653FF',
      borderRadius: '26.89px',
      padding: '16px 82px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textTransform: 'none',
      fontSize: 20,
      color: '#fff',
      '&:hover': {
        backgroundColor: '#6e3aef',
      },
    },
  },
};

export default styles;

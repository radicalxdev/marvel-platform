const styles = {
  mainGridProps: {
    container: true,
    alignItems: 'center',
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[1],
    height: '100vh',
    padding: 2,
  },
  innerGridProps: {
    container: true,
    height: 'fit-content',
    flexDirection: 'column',
    rowGap: 2,
  },
  iconGridProps: {
    container: true,
    item: true,
    height: 'fit-content',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconProps: {
    color: 'primary',
    sx: { fontSize: 48, marginBottom: 2 },
  },
  titleGridProps: {
    container: true,
    item: true,
    height: 'fit-content',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleProps: {
    gutterBottom: true,
    variant: 'h4',
    component: 'h2',
    color: 'white',
  },
  bodyGridProps: {
    container: true,
    item: true,
    height: 'fit-content',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  bodyProps: {
    variant: 'body1',
    color: 'white',
  },
};

export default styles;

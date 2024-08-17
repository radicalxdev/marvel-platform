const styles = {
  mainGridProps: {
    position: 'relative',
    container: true,
    mobileSmall: 12,
    height: '100vh',
    maxHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: "flex-start",
    sx: {
      background: (theme) => {
        return theme.palette.Background.primary;
      },
    },
  },
  headGridProps: {
    item: true,
    container: true,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      'margin-top': '52px',
    },
  },
  appGridProps: {
    flex: '1',
  },
};

export default styles;

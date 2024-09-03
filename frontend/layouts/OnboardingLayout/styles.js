const styles = {
  mainContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '80px',
    sx: {
      background: (theme) => {
        return theme.palette.Background.primary;
      },
    },
  },
  headerContainer: {
    width: '100%',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  contentContainer: {
    width: '100%',
    maxWidth: '600px',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    background: 'transparent',
    paddingBottom: '50px',
  },
};

export default styles;

const styles = {
  mainContainer: {
    height: '100vh',  // Use full viewport height to control vertical alignment
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
    marginBottom: '20px',  // Space between progress bar and main content
  },
  contentContainer: {
    width: '100%',
    maxWidth: '600px',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',  // Align content towards the top of the container
    alignItems: 'center',
    textAlign: 'center',
    background: 'transparent', 
  },
};

export default styles;

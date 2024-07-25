const styles = {
  mainGrid: {
    container: true,
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    sx: {
      background:
        'radial-gradient(circle, #4A426A 0%, #201E2B 50%, #000000 100%)',
    },
  },
  progressBarContainer: {
    position: 'absolute',
    top: 0,
    left: '35%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    py: 2,
    zIndex: 1,
  },
  contentGrid: {
    container: true,
    direction: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    sx: {
      flex: 1,
      textAlign: 'center',
      px: 2,
      pt: 8, // Padding-top to make space for the fixed ProgressBar
      position: 'relative',
      maxWidth: 600, // Optional: set a maximum width for the content
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 2,
  },
};

export default styles;

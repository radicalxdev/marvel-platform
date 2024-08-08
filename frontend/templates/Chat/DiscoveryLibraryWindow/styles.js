const styles = {
  openDiscoveryLibraryContainer: {
    item: true,
    sx: {
      width: 'fit-content',
      height: 'fit-content',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  discoveryLibraryWindow: {
    item: true,
    sx: {
      display: 'flex',
      flexDirection: 'column',
      border: '5px solid rgba(115,80,255,255)',
      borderRadius: '15px',
      backgroundColor: '#000000',
      width: '25%',
      minWidth: '250px',
      height: '100%',
      color: '#ffffff',
    },
  },
  discoveryLibraryWindowHeader: {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  },
  discoveryLibraryWindowTitle: {
    sx: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
    },
  },
  discoveryLibraryWindowTitleText: {
    textAlign: 'center',
  },
  toggleDiscoveryLibraryWindowButton: (showDiscoveryLibraryWindow) => ({
    sx: {
      padding: showDiscoveryLibraryWindow ? 'none' : '5px',
      backgroundColor: '#000000',
      color: 'rgba(115,80,255,255)',
      border: showDiscoveryLibraryWindow
        ? 'none'
        : '5px solid rgba(115,80,255,255)',
      borderRadius: showDiscoveryLibraryWindow ? 'none' : '15px',
      '&:hover': {
        backgroundColor: '#000000',
        color: 'rgba(115,80,255,255)',
      },
    },
  }),
  centerChatMessage: {
    container: true,
    sx: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      textAlign: 'center',
    },
  },
  discoveryLibraries: {
    item: true,
    sx: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'rgba(24,26,32,255)',
      height: '100%',
      width: '100%',
      overflowY: 'auto',
      borderRadius: '0px 0px 15px 15px',
      transition: 'all 0.3s ease',
    },
  },
};

export default styles;

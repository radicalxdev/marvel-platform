const styles = {
  chatHistoryProps: {
    sx: {
      padding: '0px',
    },
  },
  chatHistoryTimeframeContainerProps: {
    sx: {
      paddingBottom: '0px',
      paddingTop: '0px',
    },
  },
  chatHistoryListItemProps: {
    sx: {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
  },
  timeframeProps: {
    sx: {
      color: 'gray',
      textDecoration: 'none',
    },
  },
  chatHistoryContentProps: {
    sx: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingRight: '1rem',
    },
  },
  chatHistoryTextProps: {
    sx: {
      textTransform: 'none',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#2d2f33',
        color: '#ffffff',
      },
      flexGrow: 1,
      justifyContent: 'left',
    },
  },
  timestampProps: {
    sx: {
      color: 'gray',
      fontSize: '0.6rem',
      paddingLeft: '1rem',
    },
  },
};

export default styles;

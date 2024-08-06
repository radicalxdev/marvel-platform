const styles = {
  defaultPromptsContainer: {
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      padding: '10px',
      marginBottom: '10px',
      height: '15vh',
      width: '100%',
    },
  },
  defaultPromptButton: {
    sx: {
      background:
        'linear-gradient(white, white) padding-box, linear-gradient(to right, #8e2de2, #4a00e0) border-box',
      color: 'black',
      borderRadius: '30px',
      padding: '10px 15px',
      textTransform: 'none',
      '&:hover': {
        background:
          'linear-gradient(white, white) padding-box, linear-gradient(to right, #8e2de2, #4a00e0) border-box',
        border: '2px solid transparent',
      },
      boxShadow: '5px 4px 6px rgba(0, 0, 0, 0.1)',
      height: '100%',
      flexGrow: 1,
      '& .MuiButton-startIcon': {
        color: 'initial',
        transition: 'color 0.3s ease',
      },
      '&:hover .MuiButton-startIcon': {
        color: '#8e2de2',
      },
      zIndex: 1,
      border: '2px solid transparent',
    },
  },
  defaultPromptDescription: {
    sx: {
      color: 'black',
      display: '-webkit-box',
      paddingLeft: '1px',
      paddingRight: '1px',
      paddingTop: '1px',
      paddingBottom: '1px',
      WebkitLineClamp: 4,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
};

export default styles;

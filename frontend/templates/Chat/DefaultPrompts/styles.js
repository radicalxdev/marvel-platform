const styles = {
  defaultPromptsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    marginBottom: '10px',
    height: '15vh',
    width: '100%',
  },
  defaultPromptButton: {
    background: 'white',
    color: 'black',
    borderRadius: '30px',
    padding: '10px 15px',
    textTransform: 'none',
    '&:hover': {
      background: 'white',
    },
    boxShadow: '5px 4px 6px rgba(0, 0, 0, 0.1)',
    height: '100%',
    flexGrow: 1,
  },
  defaultPromptDescription: {
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
};

export default styles;

const styles = {
  defaultPromptsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    marginBottom: '10px', 
  },
  defaultPromptButton: {
    background: 'white',
    color: 'black',
    borderRadius: '30px',
    padding: '20px 30px',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    '&:hover': {
      background: 'white',
    },
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    minWidth: '270px',
    minHeight: '80px',
  },
  defaultPromptDescription: {
    color: 'black',
    paddingLeft: '1px', 
    paddingRight: '1px',
    paddingTop: '1px', 
    paddingBottom: '1px',
  },
};

export default styles;

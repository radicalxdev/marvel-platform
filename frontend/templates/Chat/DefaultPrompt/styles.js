/**
 * Styles for the DefaultPrompt component
 */
const styles = {
  defaultPromptsGridContainer: {
    container: true,
    sx: {
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      margin: '0px 0px 10px',
    },
  },
  defaultPrompt: {
    container: true,
    item: true,
    sx: {
      position: 'relative',
      padding: '10px', // Changed padding to be equal
      display: 'flex',
      alignItems: 'center',
      flex: '1',
      backgroundColor: 'transparent',
      color: '#5e20f4',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '10px',
        padding: '2px',
        background: 'linear-gradient(45deg, #8c6d9a, #5e20f3)', // Darker gradient color
        WebkitMask:
          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      },
      '&:hover': {
        backgroundColor: '#5e20f4',
        color: 'white',
        '&::after': {
          background: 'white',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
  },
  menuLogo: {
    marginRight: '10px',
  },
  promptContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  promptText: {
    flex: 1,
    overflow: 'hidden',
  },
};

export default styles;

/**
 * Styles for the DefaultPrompt component
 */
const styles = {
  /**
   * Styles for the container of the default prompt
   */
  defaultPromptsGridContainer: {
    container: true,
    sx: {
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      marginBottom: '10px',
    },
  },
  /**
   * Styles for a single default prompt
   */
  defaultPrompt: {
    container: true,
    item: true,
    sx: {
      position: 'relative',
      padding: '5px 10px',
      paddingLeft: '40px',
      display: 'flex',
      flexDirection: 'row',
      flex: '1',
      backgroundColor: 'transparent',
      color: '#5e20f4',
      border: '2px solid #5e20f4',
      borderRadius: '10px',
      cursor: 'pointer',
      alignItems: 'center',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      '&:hover': {
        backgroundColor: '#5e20f4',
        color: 'white',
        '&::before': {
          background: 'white',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '23px',
        height: '23px',
        left: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: '#5e20f4',
        clipPath:
          'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
      },
    },
  },
};

export default styles;

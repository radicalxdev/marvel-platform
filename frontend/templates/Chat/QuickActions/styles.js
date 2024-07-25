/**
 * Styles for the QuickActions component
 */
const styles = {
  /**
   * Styles for the container of the quick actions
   */
  quickActionsGridContainer: {
    item: true,
    sx: {
      padding: '5px',
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      marginBottom: '10px',
      border: '3px solid #9f86fe',
      borderRadius: '10px',
    },
  },
  /**
   * Styles for a single quick action
   */
  quickAction: {
    item: true,
    sx: {
      padding: '10px',
      backgroundColor: '#25262f',
      color: '#9e94a5',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      '&:hover': {
        color: '#ffffff',
      },
    },
  },
};

export default styles;

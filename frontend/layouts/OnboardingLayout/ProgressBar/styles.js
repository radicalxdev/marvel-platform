const styles = {
  mainGridProps: {
    container: true,
    width: '100%',
    padding: '12px', // Padding around the content
    zIndex: 1001,
  },

  gridProps: {
    item: true,
    display: 'flex',
    alignItems: 'center',
  },

  containerProps: {
    container: true,
    direction: 'column',
    display: 'flex',
    alignItems: 'center',
  },

  stepLabelProps: {
    marginTop: '8px', // Increased top margin
    fontSize: '16px', // Increased font size
    color: '#fff', // White text for contrast
  },

  stpConnector: (active, completed) => ({
    sx: {
      width: '100%',
      '&.MuiStepConnector-alternativeLabel': {
        top: 10,
        left: 'calc(-50% + 15px)',
        right: 'calc(50% + 15px)',
      },
      '& .MuiStepConnector-line': {
        borderColor: active || completed ? '#8653FF' : '#656277',
        borderTopWidth: 3,
        borderRadius: 1,
        width: '100%',
      },
    },
  }),

  stepperProps: {
    sx: { width: '100%' },
  },

  expandMoreIconProps: {
    sx: {
      backgroundColor: '#444154',
      borderRadius: '10px',
    },
  },

  accordionProps: {
    sx: {
      backgroundColor: '#181A20',
      width: '100%',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#8653FF',
      borderRadius: '50px',
    },
  },

  accordionSummaryProps: {
    sx: {
      width: '614px',
      height: '50px',
      display: 'flex',
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit',
    },
  },

  accordionDetailsProps: {
    sx: {
      borderBottomLeftRadius: 'inherit',
      borderBottomRightRadius: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '16px',
    },
  },

  accordionDetailsGridProps: {
    rowGap: 5,
    sx: {
      borderTop: '1px solid #444154',
      display: 'flex',
      alignItems: 'center',
      columnGap: 1.5,
    },
  },

  blurredBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
    backdropFilter: 'blur(15px)', // Adjust blur intensity as needed
    zIndex: 1000, // Ensure it's above all other content
  },

  // Step Circle styling
  stepCircle: {
    width: '21px', // Increased width
    height: '21px', // Increased height
    borderRadius: '50%',
    display: 'flex',
  },

  stepCircleCompleted: {
    width: '21px', // Increased width
    height: '21px', // Increased height
    borderRadius: '50%',
    display: 'flex',
    backgroundColor: '#8653FF',
  },

  stepCircleActive: {
    width: '21px', // Increased width
    height: '21px', // Increased height
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#8653FF',
    backgroundColor: '#444154',
  }, // Active step color

  stepCircleInactiveColor: '#656277', // Inactive step color

  // Dynamic styles based on step state
  getStepCircleStyle: (isActive) => ({
    ...styles.stepCircle,
    backgroundColor: isActive
      ? styles.stepCircleActive
      : styles.stepCircleInactiveColor,
  }),
};

export default styles;

const styles = {
  mainGridProps: {
    container: true,
    width: '100%',
    padding: '16px', // Padding around the content
  },

  progressBarContainer: {
    backgroundColor: '#181A20', // Dark background color
    padding: '12px 24px', // Padding inside the container
    borderRadius: '8px', // Border radius for rounded corners
    display: 'flex',
    gap: '65px', // Space between items
    alignItems: 'center',
  },

  gridProps: {
    item: true,
  },

  containerProps: {
    container: true,
    direction: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Step Circle styling
  stepCircle: {
    width: '36px', // Increased width
    height: '36px', // Increased height
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepCircleActiveColor: '#8653FF', // Active step color
  stepCircleInactiveColor: '#B0B0B0', // Inactive step color

  stepLabelProps: {
    marginTop: '8px', // Increased top margin
    fontSize: '16px', // Increased font size
    color: '#fff', // White text for contrast
  },

  // Dynamic styles based on step state
  getStepCircleStyle: (isActive) => ({
    ...styles.stepCircle,
    backgroundColor: isActive
      ? styles.stepCircleActiveColor
      : styles.stepCircleInactiveColor,
  }),
};

export default styles;

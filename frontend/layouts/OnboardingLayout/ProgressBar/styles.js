const styles = {
  mainGridProps: {
    container: true,
    width: '100%',
    padding: '12px', // Padding around the content
    zIndex: 1001,
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
};

export default styles;

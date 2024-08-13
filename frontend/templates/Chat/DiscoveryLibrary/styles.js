const styles = {
  /* discoveryLibrary: (isSelected, imageUrl) => ({
    container: true,
    sx: {
      margin: '20px 0px 0px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(24,26,32,255)',
      color: isSelected ? 'rgba(115, 80, 255, 255)' : 'white',
      border: isSelected
        ? '3px solid rgba(115, 80, 255, 255)'
        : '3px solid white',
      // height: '20%',
      width: '90%',
      overflowY: 'auto',
      borderRadius: '15px',
      transition: 'all 0.3s ease',
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
  }), */
  discoveryLibrary: (isSelected) => ({
    container: true,
    sx: {
      padding: '10px',
      margin: '10px 10px 10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(24,26,32,255)',
      color: isSelected ? 'rgba(115, 80, 255, 255)' : 'white',
      border: isSelected
        ? '3px solid rgba(115, 80, 255, 255)'
        : '3px solid white',
      // height: '20%',
      width: '90%',
      // overflowY: 'auto',
      borderRadius: '15px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
  }),
  discoveryLibraryTitle: {
    sx: {
      padding: '10px',
      fontSize: '20px',
    },
  },
};

export default styles;

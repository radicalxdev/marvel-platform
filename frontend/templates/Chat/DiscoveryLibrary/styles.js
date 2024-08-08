const styles = {
  discoveryLibrary: (isSelected, imageUrl) => ({
    container: true,
    sx: {
      margin: '20px 0px 0px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(24,26,32,255)',
      border: isSelected
        ? '3px solid rgba(115, 80, 255, 255)'
        : '3px solid white',
      height: '20%',
      width: '90%',
      overflowY: 'auto',
      borderRadius: '15px',
      transition: 'all 0.3s ease',
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
  }),
  discoveryLibraryTitle: {
    fontSize: '20px',
    fontWeight: '800',
  },
  discoveryLibraryDescription: {
    fontSize: '14px',
    fontWeight: '400',
  },
};

export default styles;

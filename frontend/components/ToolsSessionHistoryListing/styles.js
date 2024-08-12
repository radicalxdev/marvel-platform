const styles = {
  mainGridProps: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  mainSectionProps: {
    container: true,
    item: true,
  },
  sectionHeaderProps: {
    sx: {
      fontFamily: 'Satoshi Regular',
      fontSize: '20px',
      color: '#B8B8B8',
      borderBottom: '2px solid #d3d3d3',
      width: '100%',
      margin: '0px 0px 15px 0px',
    },
  },
  formProps: {
    sx: {
      width: '200px',
      '& .MuiInputBase-root': {
        borderRadius: 0,
        position: 'relative',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: (theme) =>
          theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: 'Satoshi Regular',
      },
    },
  },
  labelProps: {
    sx: {
      fontFamily: 'Satoshi Regular',
      fontSize: '16px',
      transform: 'translate(14px, 14px) scale(1)',
      transition: 'transform 200ms ease-in-out',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -16px) scale(0.75)',
      },
    },
  },
  selectOptionsProps: {
    sx: {
      color: 'black',
      borderBottom: '2px solid #d3d3d3',
      '& .MuiSelect-icon': {
        display: 'block',
        color: 'black',
      },
    },
  },
};

export default styles;

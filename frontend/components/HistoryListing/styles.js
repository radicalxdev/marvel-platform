const styles = {
  mainGridProps: {
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
    },
  },
  dropdownMenuProps: {
    sx: {
      color: 'black',
      border: '2px solid black',
      '& .MuiSelect-icon': {
        display: 'block',
        color: 'black',
      },
    },
  },
};

export default styles;

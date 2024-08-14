export default {
  explainWrapProps: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    container: true,
  },
  maskComStyle: {
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(10px)',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  arrowIconProps: {
    style: {
      transition: 'all 0.5s linear',
      transform: 'rotate(180deg)',
    },
  },
  lineGuideGridProps: {
    width: '614px',
    // height: "50px",
    flexDirection: 'column',
    item: true,
    container: true,
    alignItems: 'center',
    flexWrap: 'nowrap',
    // marginBottom: "50px",
    position: 'relative',
    sx: {
      border: (theme) => `1px solid ${theme.palette.primary.main}`,
      borderImageSource:
        'linear-gradient(327.23deg, #3D3F4E 19.47%, #8653FF 80.53%)',
      background: '#181A20',
      'margin-top': '52px',
      borderRadius: '10px',
      padding: '0 10px',
      gap: '10px',
    },
  },
  guidListProps: {
    sx: {
      width: '100%',
    },
  },
  listItemPros: {
    sx: {
      display: 'flex',
      alignItem: 'center',
    },
  },
};

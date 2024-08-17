const styles = {
  mainGridProps: (isExpand) => {
    // container:true,
    return {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      sx: {
        background: '#181A20',
        borderRadius: isExpand ? '10px 10px 0 0 ' : '10px',
        padding: '10px',
      },
    };
  },
  stepLabelProps: {
    sx: {},
  },
  stepItemProps: {
    sx: {
      display: 'flex',
      alignItems: 'center',
      padding: 0,
    },
  },
  arrowIconProps: (isExpand) => {
    return {
      style: {
        transform: `rotate(${isExpand ? -180 : 0}deg)`,
        // transition: "all 0.1s linear",
        cursor: 'pointer',
      },
    };
  },
  progressBarExpandProps: (isExpand) => {
    return {
      position: 'absolute',
      width: '100%',
      // top: "100%",
      left: '0',
      bottom: '0',
      zIndex: 1,
      sx: {
        transform: 'translateY(100%)',
        background: (theme) => {
          return '#181A20';
        },
        borderRadius: '0 0 10px 10px',
        opacity: isExpand ? 1 : 0,
        transition: 'all 0.5s ease',
        visibility: isExpand ? 'visible' : 'hidden',
      },
    };
  },
  expandListProps: {
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

export default styles;

const styles = {
  chatHistory: {
    chatHistoryButtonFabProps: {
      sx: {
        position: 'absolute',
        bottom: 59,
        right: 22,
        backgroundColor: 'transparent',
        border: '2px solid #7350FF',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        transition: '0.7s',
        opacity: 1,
      },
    },
    chatHistoryButtonFabPropsHide: {
      sx: {
        position: 'absolute',
        bottom: 59,
        right: 22,
        backgroundColor: 'black',
        '&:hover': {
          backgroundColor: 'black',
        },
        border: '2px solid black',
        boxShadow: 'none',
        transition: '0.4s',
        opacity: 0,
        pointerEvents: 'none',
        rotate: '180deg',
      },
    },
    chatHistoryButtonIconProps: {
      sx: {
        fill: '#7350FF',
        stroke: '#7350FF',
      },
    },
    chatHistoryContainerProps: {
      style: {
        position: 'absolute',
        bottom: 60,
        right: 10,
        width: '320px',
        height: '90%',
        backgroundColor: '#181A20',
        border: '1px solid',
        borderColor: 'purple',
        borderRadius: '15px',
        zIndex: 1000,
        overflowY: 'auto',
        transition: '0.7s',
        opacity: 1,
      },
    },
    chatHistoryContainerClose: {
      style: {
        position: 'absolute',
        bottom: 60,
        right: 10,
        transition: '0.4s',
        width: 0,
        height: 0,
        opacity: 0,
      },
    },
    chatHistoryTitleContainerProps: {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 15px',
        borderBottom: '1px solid #2F2F2F',
        backgroundColor: '#121317',
        borderTopLeftRadius: '13px',
        borderTopRightRadius: '13px',
      },
    },
    chatHistoryTitleProps: {
      style: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
      },
    },
    closeButtonProps: {
      style: {
        color: '#7350FF',
      },
    },
    chatHistoryContentContainerProps: {
      style: {
        padding: '10px 15px',
      },
    },
    chatHistoryContentProps: {
      style: {
        color: '#9E94A5',
        marginTop: '10px',
      },
    },
    chatHistoryItemProps: {
      style: {
        paddingTop: '8px',
        paddingBottom: '8px',
        borderRadius: '8px',
        color: '#FFFFFF',
      },
    },
  },
};
export default styles;

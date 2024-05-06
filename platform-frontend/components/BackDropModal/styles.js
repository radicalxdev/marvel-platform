const styles = {
  backDropProps: (level, extraProps) => ({
    sx: {
      color: '#fff',
      zIndex: (theme) => theme.zIndex.drawer + level,
      ...extraProps,
    },
  }),
  modalProps: {
    'aria-labelledby': 'modal-modal-title',
    'aria-describedby': 'modal-modal-description',
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  containerGridProps: (extraGridContainerProps) => ({
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    sx: {
      ...extraGridContainerProps,
    },
  }),
};

export default styles;

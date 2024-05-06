const workspaceStyles = {
  layoutProps: {
    isWorkspace: true,
    extraContentProps: {
      paddingTop: '16px !important',
      paddingBottom: '16px !important',
    },
  },
  webChatGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[4],
    borderRadius: '20px',
    overflow: 'hidden',
    sx: () => ({
      iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      },
    }),
  },
  chatbotSpinnerProps: (webchatReady) => ({
    display: !webchatReady && 'none',
    position: 'absolute',
    backgroundColor: (theme) => theme.palette.Dark_Colors.Dark[3],
    borderRadius: '10px',
    bottom: '21px',
    left: '25px',
    height: '52px',
    width: 'calc(100% - 106px)',
    columnGap: 2,
    container: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
    sx: {
      zIndex: 101,
      opacity: 1,
    },
  }),
  chatBlockProps: (webchatReady) => ({
    display: !webchatReady && 'none',
    position: 'absolute',
    backgroundColor: (theme) => theme.palette.Dark_Colors.Dark[3],
    borderRadius: '10px',
    bottom: '21px',
    left: '25px',
    height: '52px',
    width: 'calc(100% - 106px)',
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      zIndex: 80,
      opacity: 1,
    },
  }),
  iconButtonProps: (webchatReady) => ({
    sx: {
      display: !webchatReady && 'none',
      position: 'absolute',
      zIndex: 100,
      top: '12px',
      right: (theme) => theme.spacing(2),
    },
  }),
  cancelIconProps: {
    sx: { width: '34px', height: '34px' },
  },
  workspaceLoaderGridProps: {
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loadingTextGridProps: {
    item: true,
    mobileSmall: 'auto',
    sx: {
      background: 'linear-gradient(85deg, #2845DC 0%, #BB43E6 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  loadingTextProps: {
    fontFamily: 'Satoshi Medium',
    fontSize: '14px',
  },
  loadingSpinnerGridProps: {
    item: true,
    mobileSmall: 'auto',
  },
  chatIconGridProps: {
    item: true,
    mobileSmall: 'auto',
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatbotSpinnerInnerGridProps: {
    container: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: 1,
    ml: 3,
  },
};

export default workspaceStyles;

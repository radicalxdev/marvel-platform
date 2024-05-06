const styles = {
  popUpMenuProps: {
    transformOrigin: { horizontal: 'right', vertical: 'top' },
    anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
    PaperProps: {
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 3,
        padding: 3,
        borderRadius: '10px',
        width: '220px',
        bgcolor: (theme) => theme.palette.Dark_Colors.Dark[1],
        ul: {
          padding: 0,
        },
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: (theme) => theme.palette.Dark_Colors.Dark[1],
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    },
  },
  menuItemProps: (clickable) => ({
    sx: {
      py: 1,
      px: 1,
      rowGap: 1,
      minHeight: 0,
      borderRadius: '10px',
      border: 'none',
      '&:hover': {
        backgroundColor: !clickable && 'initial',
        color: !clickable && 'initial',
        cursor: !clickable && 'default',
      },
    },
  }),
  dividerProps: {
    sx: {
      my: '16px !important',
    },
  },
  displayNameGridProps: {
    container: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
    rowGap: 1,
    mobileSmall: 12,
  },
  nameGridProps: {
    item: true,
    mobileSmall: 12,
  },
  nameTextProps: {
    color: '#FFF',
    fontFamily: 'Satoshi Bold',
    fontSize: '18px',
    lineHeight: '140%',
    letterSpacing: '0.2px',
  },
  planTypeGridProps: (activePlan) => ({
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: 1,
    sx: {
      background:
        activePlan && 'linear-gradient(85deg, #2845DC 0%, #BB43E6 100%)',
      backgroundClip: activePlan && 'text',
      WebkitBackgroundClip: activePlan && 'text',
      WebkitTextFillColor: activePlan && 'transparent',
    },
  }),
  planTypeTextProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '16px',
    lineHeight: '140%',
    letterSpacing: '0.2px',
    textTransform: 'capitalize',
  },
};

export default styles;

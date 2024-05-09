const styles = {
  dialogProps: (color) => ({
    PaperProps: {
      sx: {
        borderRadius: '60px',
        maxWidth: '679px',
        boxShadow: (theme) =>
          `2px 2px 0px ${theme.palette.Background.gradient[color]}`,
      },
    },
    slotProps: { backdrop: { sx: { bgcolor: 'rgba(0, 0, 0, 0.9)' } } },
    maxWidth: false,
    TransitionProps: { timeout: 0 },
  }),
  mainGridProps: {
    container: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  topGridProps: (color) => ({
    position: 'relative',
    container: true,
    item: true,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    px: 5,
    py: 0,
    sx: {
      background: (theme) => theme.palette.Background.gradient[color],
    },
  }),
  titleGridProps: {
    container: true,
    item: true,
    mobileSmall: 6,
    justifyContent: 'center',
    alignItems: 'center',
    mt: 5,
    rowGap: 3,
    height: '100%',
  },
  imageGridProps: {
    position: 'relative',
    container: true,
    item: true,
    mobileSmall: 6,
    justifyContent: 'center',
    height: '100%',
  },
  imageProps: {
    position: 'absolute',
    alt: 'avatar',
    placeholder: 'blur',
    sx: {
      height: '100%',
      width: 'auto',
    },
  },
  headerGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerProps: {
    color: 'white',
    fontFamily: 'Satoshi Bold',
    fontSize: '26.67px',
    lineHeight: '140%',
    letterSpacing: '0.32px',
    sx: {
      textDecorationLine: 'underline',
      textUnderlineOffset: '6px',
    },
  },
  mainTextGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainTextProps: {
    color: 'white',
    fontFamily: 'Satoshi Medium',
    fontSize: '27px',
    lineHeight: '120%',
    sx: {
      width: '90%',
    },
  },
  bottomGridProps: {
    container: true,
    item: true,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    px: 4,
    py: 3,
    sx: {
      background: (theme) => theme.palette.Dark_Colors.Dark[1],
    },
  },
  iconButtonProps: {
    sx: {
      position: 'absolute',
      top: (theme) => theme.spacing(5),
      right: (theme) => theme.spacing(5),
    },
  },
  contentGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    mb: '24px',
  },
  scoreGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    columnGap: '10px',
    mb: 3,
  },
  scoreChipGridProps: {
    item: true,
    mobileSmall: true,
    sx: {
      button: {
        fontSize: '16px !important',
        columnGap: '5px !important',
      },
    },
  },
  dividerGridProps: {
    mobileSmall: 12,
    my: 3,
  },
  contentTextProps: {
    color: 'white',
    fontFamily: 'Satoshi Medium',
    fontSize: '20px',
    lineHeight: '140%',
    letterSpacing: '0.2px',
  },
  actionGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    columnSpacing: 4,
  },
  buttonGridProps: {
    item: true,
    mobileSmall: 6,
  },
  tertiaryButtonGridProps: {
    container: true,
    item: true,
    mobileSmall: 6,
    columnSpacing: 0,
  },
  cancelIconProps: {
    sx: { width: '34px', height: '34px' },
  },
  primaryButtonGridProps: {
    item: true,
  },
  primaryButtonProps: {
    fullWidth: true,
    variant: 'mission',
    complete: 'false',
    sx: {
      borderRadius: '100px',
      textTransform: 'capitalize',
      px: 3,
      py: 2,
      fontFamily: 'Satoshi Black',
      fontSize: '17px',
      maxHeight: '50px',
    },
  },
  secondaryButtonProps: {
    extraProps: { padding: '2px', height: '53px' },
    extraButtonProps: {
      fontFamily: 'Satoshi Black',
      fontSize: '17px',
      px: 3,
      py: 2,
    },
  },
};

export default styles;

const styles = {
  mainGridProps: (color, extraProps, left, disabled) => ({
    container: true,
    mobileSmall: 6,
    opacity: disabled ? 0.2 : 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    borderRadius: '100px',
    maxHeight: '53px',
    py: '1px',
    pl: left ? '0.5px' : '1px',
    pr: left ? '1px' : '0.5px',
    ...extraProps,
    sx: (theme) => ({
      background: disabled
        ? theme.palette.Greyscale[500]
        : theme.palette.Background.gradient[color],
      borderBottomLeftRadius: left && '0px',
      borderTopLeftRadius: left && '0px',
      borderLeft: left && 'none',
      borderBottomRightRadius: !left && '0px',
      borderTopRightRadius: !left && '0px',
    }),
  }),
  buttonProps: (
    color,
    bgcolor,
    active,
    extraButtonProps,
    left,
    disabled,
    textFillColor
  ) => ({
    sx: (theme) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      opacity: disabled ? 0.5 : 1,
      borderRadius: '100px',
      columnGap: '10px',
      textTransform: 'capitalize',
      background: active ? theme.palette.Background.gradient[color] : bgcolor,
      padding: '0px',
      paddingRight: '0 !important',
      paddingLeft: '0 !important',
      paddingTop: '0 !important',
      paddingBottom: '0 !important',
      borderBottomLeftRadius: left && '0px',
      borderTopLeftRadius: left && '0px',
      borderBottomRightRadius: !left && '0px',
      borderTopRightRadius: !left && '0px',
      ...extraButtonProps,
      span: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.Background.gradient[color],
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: textFillColor,
        height: '100%',
        width: 'auto',
        span: {
          WebkitTextFillColor: 'white',
          marginRight: 1,
        },
      },
      '&:hover': {
        span: {
          WebkitTextFillColor: theme.palette.Common.White['100p'],
        },
        path: {
          stroke: 'white',
        },
      },
    }),
  }),
};

export default styles;

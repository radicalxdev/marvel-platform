const styles = {
  mainGridProps: (color, inverted, extraProps, disabled, loading) => ({
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    borderRadius: '100px',
    padding: '1px',
    ...extraProps,
    sx: (theme) => ({
      background: () => {
        if (disabled || loading) return theme.palette.Greyscale[650];
        if (inverted) return 'transparent';
        return theme.palette.Background.gradient[color];
      },
      '&:hover': {
        ...(inverted && {
          background: () => {
            if (disabled || loading) return theme.palette.Greyscale[650];
            return theme.palette.Background.gradient[color];
          },
        }),
      },
    }),
  }),
  buttonProps: (
    color,
    bgcolor,
    active,
    extraButtonProps,
    inverted,
    textColor,
    disabled,
    loading,
    backgroundColor
  ) => ({
    sx: (theme) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      borderRadius: '100px',
      columnGap: '10px',
      textTransform: 'capitalize',
      background: backgroundColor,
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      ...extraButtonProps,
      span: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(!inverted && {
          background:
            disabled || loading
              ? theme.palette.Greyscale[650]
              : theme.palette.Background.gradient[color],
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor:
            active || disabled || loading ? 'white' : 'transparent',
        }),
        color: () => {
          if (disabled || loading) return theme.palette.Greyscale[400];
          if (inverted) return 'black';
          return '';
        },
        height: '100%',
        width: 'auto',
        span: {
          WebkitTextFillColor: 'white',
          marginRight: 1,
        },
      },
      '&:hover': {
        boxShadow: 'none',
        ...(inverted && {
          background:
            disabled || loading ? theme.palette.Greyscale[650] : bgcolor,
        }),
        span: {
          ...(!inverted && {
            WebkitTextFillColor:
              textColor || theme.palette.Common.White['100p'],
          }),
          ...(inverted && {
            background: theme.palette.Background.gradient[color],
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: active ? 'white' : 'transparent',
          }),
        },
        svg: {
          color: !inverted
            ? theme.palette.Common.White['100p']
            : theme.palette.Background.gradient[color],
        },
      },
    }),
  }),
};

export default styles;

const styles = {
  mainGridProps: (color, size) => ({
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    borderRadius: '100px',
    padding: `${size}px`,
    sx: (theme) => ({
      background: theme.palette.Background.gradient[color],
    }),
  }),
  buttonProps: (bgcolor, gap, extraButtonProps) => ({
    sx: (theme) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      borderRadius: '100px',
      columnGap: gap || '10px',
      textTransform: 'capitalize',
      background: bgcolor,
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      color: 'white',
      span: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '4px',
      },
      ...extraButtonProps,
      '&:hover': {
        cursor: 'default',
        background: bgcolor,
        color: 'inherit',
      },
    }),
  }),
};

export default styles;

const styles = {
  inputProps: (error, icon, showPassword) => ({
    notched: false,
    error,
    autoComplete: 'off',
    endAdornment: icon,
    type: showPassword ? 'text' : 'password',
    sx: (theme) => ({
      'label + &': {
        marginTop: 2.5,
      },
      fieldset: {
        borderColor: '#D7D7D7',
        borderWidth: '2px',
      },
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '16px', desktop: '18px' },
      borderRadius: '10px',
      color: theme.palette.Greyscale[400],
    }),
  }),
  inputLabelProps: (error) => ({
    error,
    shrink: true,
    sx: {
      color: 'white',
      fontFamily: 'Satoshi Bold',
      left: '-12px',
      fontSize: { laptop: '16px', desktop: '18px' },
      lineHeight: '20px',
    },
  }),
};

export default styles;

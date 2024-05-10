const styles = {
  mainGridProps: {
    sx: {
      width: '100%',
    },
  },
  inputProps: (error, extraInputProps, borderColor) => ({
    notched: false,
    error,
    autoComplete: 'off',
    sx: (theme) => ({
      notched: false,
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '16px', desktopMedium: '18px' },
      background: theme.palette.Common.White['100p'],
      borderRadius: '54px',
      color: 'black',
      px: 4,
      ...extraInputProps,
      transition: theme.transitions.create('all'),
      fieldset: {
        transition: theme.transitions.create('all'),
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${borderColor || theme.palette.Background.darkgray}`,
      },
      '& input::placeholder': {
        fontStyle: 'italic',
        color: theme.palette.Background.gray,
      },
      '& input::-webkit-input-placeholder': {
        fontStyle: 'italic',
        color: theme.palette.Background.gray,
      },
      'label + &': {
        marginTop: 2,
      },
    }),
  }),
  inputLabelProps: (error, extraInputLabelProps) => ({
    error,
    shrink: true,
    sx: {
      marginLeft: '.5rem',
      top: '-10px',
      color: 'black',
      fontSize: { laptop: '24px', desktop: '26px' },
      fontFamily: 'Satoshi Bold',
      overflow: 'visible',
      ...extraInputLabelProps,
    },
  }),
  helperTextProps: (isDescription, error) => ({
    error,
    sx: {
      hidden: !isDescription,
      fontFamily: 'Satoshi Regular',
      fontSize: { laptop: '12px', desktop: '14px' },
      ...(isDescription && {
        position: 'absolute',
        top: '-60px',
        left: '-10px',
        color: (theme) => theme.palette.Common.Black['100p'],
      }),
    },
  }),
};

export default styles;

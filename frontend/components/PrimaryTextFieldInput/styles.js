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
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '16px', desktopMedium: '18px' },
      background: theme.palette.Common.White['100p'],
      borderRadius: '5px',
      color: 'black',
      ...extraInputProps,
      transition: theme.transitions.create('all'),
      px: 1.5,
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
      ':hover': {
        fieldset: {
          borderColor: 'inherit !important',
        },
      },
    }),
  }),
  inputLabelProps: (error, extraInputLabelProps) => ({
    error,
    shrink: true,
    sx: {
      top: '-14px',
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

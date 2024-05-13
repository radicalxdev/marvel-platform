const styles = {
  mainGridProps: {
    sx: {
      width: '100%',
    },
  },
  inputProps: (
    error,
    extraInputProps,
    borderColor,
    handleOnChange,
    endIcon,
    handleCarouselInput,
    disabled
  ) => ({
    notched: false,
    error,
    disabled,
    autoComplete: 'off',
    onChange: handleOnChange,
    onClick: handleCarouselInput,
    endAdornment: endIcon,
    sx: (theme) => ({
      notched: false,
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '16px', desktopMedium: '18px' },
      background: theme.palette.Background.darkgray,
      borderRadius: '54px',
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
      color: 'white',
      fontSize: { laptop: '20px', desktop: '24px' },
      fontFamily: 'Satoshi Bold',
      overflow: 'visible',
      ...extraInputLabelProps,
    },
  }),
  helperTextProps: (error) => ({
    error,
    sx: {
      fontFamily: 'Satoshi Regular',
      fontSize: { laptop: '12px', desktop: '14px' },
    },
  }),
  SelectProps: (
    color,
    bgColor,
    // multiple,
    displayEmpty,
    renderPlaceholder
    // renderInput
  ) => ({
    displayEmpty,
    // multiple,
    renderValue: (value) => renderPlaceholder(value),
    // renderInput: renderInput(),
    SelectDisplayProps: {
      sx: (theme) => ({
        background: bgColor,
        '& .MuiMenuItem-root': {
          fontSize: { mobile: '18px', mobileSmall: '14px' },
          '&:hover': {
            background: `${theme.palette.Background.gradient[color]}29`,
          },
        },
        '& .Mui-selected': {
          backgroundColor: 'transparent !important',
        },
      }),
    },
  }),
  listBoxProps: (bgColor, color) => ({
    sx: (theme) => ({
      background: bgColor,
      fontSize: { mobile: '18px', mobileSmall: '14px' },
      div: {
        '&:hover': {
          background: `${theme.palette.Background.gradient[color]}29`,
        },
        '& .Mui-selected': {
          backgroundColor: 'transparent !important',
        },
      },
    }),
  }),
};

export default styles;

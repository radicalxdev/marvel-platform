const styles = {
  selectInputProps: (
    expandMoreIcon,
    bgColor,
    color,
    renderPlaceholder,
    displayEmpty,
    extraInputProps
  ) => ({
    fullWidth: true,
    SelectProps: {
      displayEmpty,
      notched: false,
      IconComponent: expandMoreIcon,
      renderValue: (value) => renderPlaceholder(value),
      MenuProps: {
        MenuListProps: {
          sx: {
            columnGap: 1,
            maxHeight: '400px',
            li: {
              pl: 3,
            },
          },
        },
        PaperProps: {
          sx: (theme) => ({
            background: bgColor,
            color: 'black',
            '& .MuiMenuItem-root': {
              fontSize: { laptop: '14px', desktop: '18px' },
              paddingLeft: '32px !important',
              '&:hover': {
                background: `${theme.palette.Background.gradient[color]}29`,
              },
            },
            '& .Mui-selected': {
              background: `${theme.palette.Background.gradient[color]} !important`,
              color: 'white',
            },
          }),
        },
      },
      sx: {
        svg: {
          display: 'block',
          mr: 1.8,
          color: (theme) => theme.palette.Greyscale[700],
          fontSize: '32px !important',
        },
        border: '2px solid black',
        color: 'black',
      },
    },
    InputProps: {
      notched: false,
    },
    sx: {
      alignItems: 'flex-start',
      '& .MuiOutlinedInput-root': {
        backgroundColor: bgColor,
        borderRadius: '30px',
        paddingLeft: '25px',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      width: '100%',
      '& input::placeholder': {
        fontStyle: 'italic',
        color: (theme) => theme.palette.Background.gray,
      },
      '& input::-webkit-input-placeholder': {
        fontStyle: 'italic',
        color: (theme) => theme.palette.Background.gray,
      },
      notched: false,
      ...extraInputProps,
    },
  }),
  inputLabelProps: {
    shrink: true,
    sx: {
      position: 'relative',
      top: '8px',
      color: (theme) => `${theme.palette.Common.Black['100p']} !important`,
      overflow: 'visible',
      transformOrigin: 'left',
    },
  },
  helperTextProps: (error) => ({
    error,
    sx: {
      fontFamily: 'Satoshi Regular',
      fontSize: { laptop: '12px', desktop: '14px' },
      color: (theme) => theme.palette.Common.Black['100p'],
    },
  }),
  placeholderProps: {
    fontStyle: 'italic',
    color: (theme) => theme.palette.Background.gray,
    fontFamily: 'Satoshi Bold',
    sx: {
      opacity: 0.5,
    },
  },
  selectedTextProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '16px',
  },
};

export default styles;

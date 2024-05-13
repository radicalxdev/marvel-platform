const styles = {
  selectInputProps: (color, bgColor) => ({
    fullWidth: true,
    sx: {
      '& .MuiSelect-select': {
        div: {
          columnGap: 1,
        },
        WebkitTextFillColor: 'rgba(0, 0, 0, 0.5) !important',
      },
      '& .MuiOutlinedInput': {
        border: '2px solid black',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '2px solid black',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '2px solid black',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '2px solid black',
      },
      width: '100%',
      backgroundColor: bgColor,
      borderRadius: '5px',
      whiteSpace: 'wrap',
      px: 1.5,
      fieldset: {
        borderColor: (theme) =>
          `${theme.palette.Common.Black['100p']} !important`,
      },
      '& input::placeholder': {
        fontStyle: 'italic',
        color: (theme) => theme.palette.Background.gray,
      },
      '& input::-webkit-input-placeholder': {
        fontStyle: 'italic',
        color: (theme) => theme.palette.Background.gray,
      },
      notched: false,
    },
  }),
  helperTextProps: (isDescription) => ({
    sx: {
      hidden: !isDescription,
      display: 'inline-block',
      lineHeight: '20px',
      fontFamily: 'Satoshi Regular',
      fontSize: { laptop: '12px', desktop: '14px' },
      color: (theme) => theme.palette.Background.white,
      textAlign: 'left',
      width: '100%',
      mb: '10px',
    },
  }),
  iconProps: {
    sx: { color: (theme) => theme.palette.Background.gray, fontSize: '45px' },
  },
  placeholderProps: {
    fontStyle: 'italic',
    color: (theme) => theme.palette.Background.gray,
    fontFamily: 'Satoshi Bold',
    sx: {
      opacity: 0.5,
    },
  },
  chipProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '16px',
    sx: {
      color: 'black',
      background: 'grey',
    },
  },
  chipGroupProps: {
    container: true,
    item: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 1,
  },
  labelGridProps: {
    container: true,
    mobileSmall: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 1,
    color: (theme) => theme.palette.Common.Black['100p'],
    ml: 2,
    sx: {
      transform: 'scale(0.75)',
      transformOrigin: 'left',
    },
  },
  labelProps: (error) => ({
    color: (theme) => (error ? theme.palette.error.main : 'inherit'),
    fontSize: { laptop: '24px', desktop: '26px' },
    fontFamily: 'Satoshi Bold',
  }),
};

export default styles;

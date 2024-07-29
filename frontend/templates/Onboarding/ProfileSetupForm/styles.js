const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  flexContainer: {
    display: 'flex',
    gap: '24px',
    sx: {
      '& > div': {
        flex: 1,
      },
    },
  },
  socialLinksContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  imageUploadContainer: {
    sx: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '10px',
      borderRadius: '24px',
      color: '#BDBDBD',
      height: '96px',
      width: '100%',
      border: '1px solid #D7D7D7',
      fontFamily: 'Satoshi Bold',
      'p, span': {
        fontFamily: 'Satoshi Bold',
        fontSize: '18px',
      },
      span: {
        color: 'rgb(105, 73, 255)',
      },
      'p:nth-of-type(2)': {
        fontSize: '14px',
      },
      '&:hover p': {
        color: '#BDBDBD',
      },
      input: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: '0',
        cursor: 'pointer',
      },
      '& > div > span': {
        marginRight: '20px',
        color: 'white',
        fontSize: '16px',
      },
    },
  },
  label: {
    sx: {
      fontFamily: 'Satoshi Bold',
      color: 'white',
      fontWeight: 700,
      textAlign: 'left',
      margin: '0 0 12px 20px',
    },
  },
  input: {
    sx: {
      width: '100%',
      fontSize: { laptop: '16px', desktopMedium: '18px' },
      height: { laptop: '50px', desktopMedium: '52px' },
      border: '1px solid #D7D7D7',
      borderRadius: '999px',
      background: 'transparent',
      color: '#BDBDBD',
      justifyContent: 'center',
      padding: '17px 20px',
      '.MuiInputBase-root': {
        padding: 0,
        gap: '10px',
      },
      span: {
        color: '#BDBDBD',
      },
      svg: {
        color: '#8065FF',
      },
      input: {
        fontFamily: 'Satoshi Bold',
        fontWeight: 700,
        padding: 0,
      },
      fieldset: {
        border: 'none',
      },
    },
  },
  textarea: {
    sx: {
      width: '100%',
      fontSize: { laptop: '16px', desktopMedium: '18px' },
      border: '1px solid #D7D7D7',
      borderRadius: '24px',
      background: 'transparent',
      color: '#D7D7D7',
      justifyContent: 'center',
      '.MuiInputBase-root': {
        padding: '17px 20px',
      },
      textarea: {
        padding: '0',
        fontSize: '18px',
      },
      fieldset: {
        border: 'none',
      },
    },
  },
  wordLimit: {
    fontFamily: 'Satoshi Bold',
    fontWeight: 700,
    textAlign: 'right',
    mt: '12px',
    color: '#444154',
    sx: {
      span: {
        color: 'white',
      },
    },
  },
};
export default styles;

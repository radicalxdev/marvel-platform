const styles = {
  passwordGridProps: {
    position: 'relative',
    container: true,
    rowGap: 1,
    mb: 1,
  },
  passwordInputGridProps: {
    item: true,
    mobileSmall: 12,
  },
  forgotPasswordGridProps: {
    position: 'absolute',
    right: 0,
    bottom: (theme) => ({
      laptop: `-${theme.spacing(3)}`,
      desktop: `-${theme.spacing(4)}`,
      desktopMedium: `-${theme.spacing(5)}`,
    }),
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  forgotPasswordProps: {
    component: 'button',
    type: 'button',
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '12px', desktopMedium: '14px' },
    sx: {
      mr: 1,
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
      color: (theme) => theme.palette.Greyscale[50],
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  submitButtonProps: {
    type: 'submit',
    color: 'purple4',
    inverted: true,
    extraProps: {
      padding: '2px',
      height: { laptop: '54px', desktopMedium: '60px' },
      width: '60%',
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      px: 4,
    },
  },
  errorNotificationProps: {
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    sx: {
        position: 'absolute',
        top: '7%',
        left: '50%',
        height: '24px',
        transform: 'translate(-50%, -50%)',
        width: '60%', // Adjust the max-width as needed
    }
  },
  successNotificationProps: {
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    sx: {
        position: 'absolute',
        top: '7%',
        left: '50%',
        height: '24px',
        transform: 'translate(-50%, -50%)',
        width: '40%', // Adjust the max-width as needed
    }
}
};

export default styles;

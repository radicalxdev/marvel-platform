const styles = {
  descriptionTextProps: (paymentPageStyles) => ({
    sx: (theme) => ({
      color: theme.palette.Greyscale[400],
      '> div': {
        marginBottom: '1rem',
      },
    }),
    ...paymentPageStyles.paymentPageOverviewText,
  }),
  challengeIntroGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    columnGap: 4,
  },
  certficateGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    px: { laptop: 3, desktop: 4, desktopMedium: 5 },
    py: { laptop: 2, desktop: 3, desktopMedium: 4 },
    borderRadius: '22px',
    sx: {
      background: (theme) => theme.palette.Background.gradient.purple2,
    },
  },
  textGridProps: {
    mobileSmall: true,
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  certificateTitleProps: {
    color: 'white',
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '32px', desktop: '30px', desktopMedium: '36px' },
    lineHeight: { laptop: '50px', desktop: '60px', desktopMedium: '70px' },
  },
  subtitleProps: {
    color: 'white',
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
  },
  buttonGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 'auto',
  },
  certificateButtonProps: {
    variant: 'white',
    sx: {
      px: { laptop: 2, desktop: 3, desktopMedium: 4 },
      height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
      fontSize: { laptop: '14px', desktop: '16px' },
      color: (theme) => theme.palette.Primary.Main,
      fontFamily: 'Satoshi Bold',
    },
  },
};

export default styles;

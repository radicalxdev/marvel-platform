const styles = {
  mainGridProps: {
    item: true,
    container: true,
    justifyContent: 'center',
    alignItems: { tablet: 'flex-start', mobileSmall: 'center' },
    alignContent: 'flex-start',
    width: { mobile: '1450px', mobileSmall: '100%' },
    minWidth: {
      desktop: '1200px',
      laptop: '944px',
      tablet: '688px',
      mobileSmall: 0,
    },
    sx: {
      background: (theme) => theme.palette.Background.gradient.primary,
      borderRadius: '24px',
      padding: 6,
      rowGap: 12,
    },
  },
  colorTextProps: {
    component: 'span',
    sx: {
      color: (theme) => theme.palette.Background.green,
      fontFamily: 'inherit',
      fontSize: 'inherit',
    },
  },
  learnMoreGridProps: {
    container: true,
    mobileSmall: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: 7,
  },
  learnMoreButtonProps: {
    variant: 'green-btn-2',
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '100px',
      textTransform: 'capitalize',
      px: 4,
      fontFamily: 'Satoshi Black',
      fontSize: '16px',
    },
  },
  avatarIconsGroup: {
    container: true,
    item: true,
    alignItems: 'center',
    justifyContent: 'center',
    mobileSmall: 'auto',
    sx: {
      button: {
        marginLeft: '-8px',
      },
    },
  },
  learnersDetailsGridProps: {
    container: true,
    item: true,
    columnGap: 3,
    mobileSmall: 'auto',
  },
  learnersGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  learnerNumbersProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '18px', desktop: '20px' },
    color: 'white',
  },
  otherLearnersProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: { laptop: '14px', desktop: '16px' },
    color: 'white',
  },
  secondaryButtonProps: {
    extraProps: { padding: '2px', height: '45px' },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      boxShadow: '0px 7px 25px #3A1E5D',
      px: 4,
    },
  },
};

export default styles;

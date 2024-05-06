const styles = {
  mainGridProps: {
    container: true,
    flexDirection: 'column',
    justifyContent: 'cennter',
    alignItems: 'flex-start',
    mobileSmall: 12,
    height: '100%',
    rowGap: 6,
  },
  contentGridProps: {
    container: true,
    item: true,
    mobileSmall: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 'fit-content',
    rowGap: 4,
  },
  extraContentGridProps: {
    pt: 7,
    pb: 0,
    px: { laptop: 4, desktop: 5, desktopMedium: 6 },
    bgcolor: (theme) => theme.palette.Dark_Colors.Dark[3],
  },
  extraMainGridProps: {
    minHeight: '650px',
    width: '100%',
    pl: { laptop: '5%', desktop: '10%', desktopMedium: '15%' },
    pr: { laptop: '5%', desktop: '10%', desktopMedium: '15%' },
  },
  titleProps: {
    fontFamily: 'Satoshi Medium',
    fontSize: { laptop: '36px', desktop: '38px', desktopMedium: '42px' },
    letterSpacing: '-0.92px',
    lineHeight: '69px',
    color: 'white',
  },
  descriptionProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: { laptop: '14px', desktopMedium: '16px' },
    color: 'white',
  },
  pillsGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: { laptop: 2, desktop: 3 },
    mt: 2.5,
  },
  pillProps: {
    height: '28px',
    extraChipGridProps: {
      width: 'auto',
      boxShadow: '0px 3.453px 3.453px 0px rgba(0, 0, 0, 0.25)',
    },
    extraChipProps: {
      px: { mobileSmall: 1, desktopMedium: '10px' },
      fontSize: '16px !important',
      textTransform: 'uppercase',
      svg: {
        width: '20px',
        height: '20px',
      },
    },
    extraChipContainerProps: {
      justifyContent: 'flex-start !important',
    },
  },
  textGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
  },
  descriptionGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    mt: 0.5,
  },
  actionButtonProps: {
    container: true,
    item: true,
    columnGap: 3,
  },
  challengeNameProps: {
    component: 'span',
    sx: {
      color: (theme) => theme.palette.Background.green,
      fontSize: 'inherit',
      fontFamily: 'inherit',
    },
  },
  cancelButtonProps: {
    color: 'white',
    extraProps: {
      padding: '2px',
      height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Medium',
      fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
      px: { laptop: 3, desktop: 4, desktopMedium: 5 },
    },
  },
  enrollButtonProps: {
    color: 'green2',
    extraProps: {
      padding: '2px',
      height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
      minWidth: { laptop: '100px', desktop: '120px', desktopMedium: '145px' },
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '14px', desktop: '16px' },
      boxShadow: '0px 7px 25px #3A1E5D',
      px: { laptop: 2, desktop: 3, desktopMedium: 4 },
    },
  },
  imageGridProps: {
    position: 'relative',
    container: true,
    item: true,
    mobileSmall: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageProps: {
    layout: 'fill',
    objectFit: 'contain',
    priority: true,
  },
};

export default styles;

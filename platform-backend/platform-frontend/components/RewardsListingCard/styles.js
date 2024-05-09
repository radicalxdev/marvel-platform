const styles = {
  rewardsCardProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    px: 6,
    mobileSmall: 12,
    mb: 10,
  },
  containerGridProps: {
    item: true,
    container: true,
    bgcolor: 'rgba(36, 39, 49, 0.20)',
    borderRadius: '0 0 24px 24px',
    rowGap: 4,
  },
  innerCardProps: (dataLength) => ({
    container: true,
    item: true,
    justifyContent: {
      mobile: 'flex-start',
      mobileSmall: dataLength === 1 && 'center',
    },
    boxSizing: 'border-box',
    width: 'auto',
    overflow: 'auto',
    flexWrap: { tablet: 'wrap', mobileSmall: 'nowrap' },
    spacing: {
      desktopLarge: 5,
      desktop: 4,
      laptop: 5,
      tablet: 4,
      mobile: 3,
      mobileSmall: 1,
    },
    paddingRight: 1,
    paddingBottom: 1,
  }),
  bannerProps: {
    sx: {
      display: {
        tablet: 'flex',
        mobileSmall: 'none',
      },
      borderRadius: '24px 24px 0 0',
    },
  },
  titleGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    py: 5,
    borderTop: (theme) => `1px solid ${theme.palette.Greyscale[500]} `,
  },
  titleProps: {
    color: 'white',
    fontFamily: 'Ethnocentric Regular Italics',
    lineHeight: '45px',
    fontSize: {
      mobileSmall: '36px',
      desktop: '38px',
      desktopMedium: '40px',
    },
    sx: {
      textShadow: '0px 7.169px 17.922px rgba(0, 0, 0, 0.83)',
    },
  },
};

export default styles;

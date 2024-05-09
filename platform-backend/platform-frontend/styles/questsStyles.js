const questsStyles = {
  commonMainGridProps: {
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
    rowGap: 6,
  },
  buttonContainer: {
    container: true,
    gap: 2,
    mobileSmall: 6,
    justifyContent: 'flex-start',
  },
  filterContainer: {
    container: true,
    gap: 2,
    mobileSmall: 6,
    justifyContent: 'flex-end',
  },
  menuItemProps: {
    variant: 'outlined',
    sx: {
      fontSize: { mobile: '14px', mobileSmall: '12px' },
      fontFamily: 'Satoshi Medium',
    },
  },
  selectorGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'fit-content',
    columnGap: '20px',
  },
  descriptionTextProps: (paymentPageStyles) => ({
    sx: (theme) => ({
      color: theme.palette.Greyscale[400],
      '> div': {
        marginBottom: '1rem',
      },
    }),
    ...paymentPageStyles.paymentPageOverviewText,
  }),
};

export default questsStyles;

const styles = {
  mainGridProps: (isPractice) => ({
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    columnGap: isPractice ? 1 : 4,
    pr: isPractice ? 4 : 2,
    pl: 2,
    py: 2,
    borderRadius: '20px',
    sx: {
      background: (theme) => theme.palette.Dark_Colors.Dark[2],
    },
  }),
  closeIconGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    mr: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default styles;

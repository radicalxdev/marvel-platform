const styles = {
  /**
   * Styling for the main grid of the component.
   * Contains properties for container, justifyContent, alignItems, maxWidth, width, height, padding and sx.
   */
  mainGridProps: {
    container: true,
    display: { tablet: 'none', mobileSmall: 'flex' },
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: { mobileSmallPlus: 'none', mobileSmall: '110px' },
    width: { desktopLarge: '130px', mobileSmall: 'auto' },
    height: { mobile: '36px', mobileSmall: '28px' },
    borderRadius: '100px',
    padding: '1px',
    sx: (theme) => ({
      background: theme.palette.Background.gradient.blue2,
    }),
  },
  /**
   * Styling for the menu item of the component.
   * Contains properties for sx.
   */
  menuItemProps: {
    sx: {
      fontSize: { mobile: '14px', mobileSmall: '12px' },
      fontFamily: 'Satoshi Medium',
    },
  },
  /**
   * Styling for the dropdown menu of the component.
   * Contains properties for id, select, InputProps, sx.
   */
  gradientSelectMenuProps: {
    id: 'dropDowm-menu',
    select: true,
    InputProps: {
      sx: (theme) => ({
        borderRadius: '100px',
        fontSize: { mobile: '14px', mobileSmall: '12px' },
        fontFamily: 'Satoshi Medium',
        height: '100%',
        width: '100%',
        background: theme.palette.Background.gradient.blue2,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        [theme.breakpoints.down('mobile')]: {
          '& svg': {
            width: '12px',
          },
          '& .MuiOutlinedInput-input': {
            paddingRight: '24px !important',
          },
        },
      }),
    },
    sx: (theme) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      borderRadius: '100px',
      background: theme.palette.Dark_Colors.Dark[1],

      '#icon': {
        marginRight: theme.spacing(1),
      },
    }),
  },
};

export default styles;

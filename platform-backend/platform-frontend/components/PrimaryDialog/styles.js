const styles = {
  mainGridProps: (extraMainGridProps) => ({
    PaperProps: {
      sx: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '30px',
        maxWidth: 'none',
        ...extraMainGridProps,
        background: 'transparent',
        boxShadow: 'none',
        margin: 0,
      },
    },
  }),
  titleGridProps: (removeCloseIcon) => ({
    container: true,
    item: true,
    mobileSmall: removeCloseIcon ? 12 : 8,
    justifyContent: removeCloseIcon ? 'center' : 'flex-start',
    alignItems: 'center',
    px: { laptop: 4, desktop: 5, desktopMedium: 6 },
  }),
  headerGridProps: {
    position: 'relative',
    container: true,
    item: true,
    justifyContent: 'space-between',
    alignItems: 'center',
    mobileSmall: 12,
    height: 'auto',
    sx: {
      transform: 'translate(0, 50%)',
    },
  },
  titleProps: {
    fontSize: { laptop: '56px', desktop: '68px', desktopMedium: '74px' },
    lineHeight: '68px',
    color: 'white',
    fontFamily: 'Ethnocentric Regular Italics',
    sx: {
      textShadow: '0px 8px 20px rgba(0, 0, 0, 0.83)',
    },
  },
  iconGridProps: {
    position: 'relative',
    container: true,
    item: true,
    mobileSmall: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      transform: 'translate(26px, 9px)',
    },
  },
  iconButtonProps: {
    sx: (theme) => ({
      width: { laptop: '46px', desktop: '50px', desktopMedium: '56px' },
      height: { laptop: '46px', desktop: '50px', desktopMedium: '56px' },
      bgcolor: theme.palette.Background.green,
      transition: theme.transitions.create('all'),
      '&:hover': {
        bgcolor: theme.palette.Background.green,
        opacity: 0.9,
      },
    }),
  },
  iconProps: {
    sx: {
      width: { laptop: '32px', desktop: '40px', desktopMedium: '48px' },
      height: { laptop: '32px', desktop: '40px', desktopMedium: '48px' },
      color: (theme) => theme.palette.Dark_Colors.Dark[1],
    },
  },
  contentGridProps: (extraProps, removeBoxShadow) => ({
    container: true,
    item: true,
    mobileSmall: true,
    pt: 7,
    pb: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    sx: {
      boxShadow: !removeBoxShadow && '0px 10px 100px 0px #19363A',
      borderRadius: '30px',
      overflow: 'hidden',
      ...extraProps,
    },
  }),
};

export default styles;

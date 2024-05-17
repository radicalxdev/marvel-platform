const styles = {
  accordianProps: {
    sx: {
      background: (theme) => theme.palette.Common.White['100p'],
      borderRadius: '10px !important',
      width: '100%',
    },
  },
  accordionDetailsProps: (extraAccordionDetailsProps) => ({
    sx: {
      ...extraAccordionDetailsProps,
    },
  }),
  accordionSummaryProps: {
    sx: {
      px: 4,
      py: 2,
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '20px', desktop: '24px' },
      color: 'black',
      display: 'flex',
      justifyContent: 'center !important',
      alignItems: 'center',
    },
  },
  titleGridProps: {
    position: 'relative',
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
  },
  outlinedButtonProps: {
    color: 'purple',
    extraProps: {
      position: 'absolute',
      right: (theme) => theme.spacing(4),
      padding: '2px',
      height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Medium',
      fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
      px: { laptop: 1, desktop: 2, desktopMedium: 3 },
    },
  },
  descriptionGridProps: {
    sx: {
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
      color: (theme) => theme.palette.Greyscale[450],
      textAlign: 'center',
    },
  },
  stackProps: {
    justifyContent: 'center',
    spacing: 2,
    sx: { width: '100%' },
  },
};

export default styles;

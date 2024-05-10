const styles = {
  accordianProps: {
    sx: {
      background: (theme) => theme.palette.Common.White['100p'],
      borderRadius: '30px !important',
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
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};

export default styles;

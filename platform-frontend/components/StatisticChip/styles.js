const styles = {
  mainGridProps: (extraChipContainerProps) => ({
    container: true,
    item: true,
    rowGap: { laptop: 1, mobileSmall: '4px' },
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      ...extraChipContainerProps,
    },
  }),
  chipGridProps: (color, height, extraChipGridProps) => ({
    item: true,
    container: true,
    xl: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '40px',
    height: height || '30px',
    sx: () => ({
      ...extraChipGridProps,
    }),
  }),
  chipProps: (color, extraProps) => ({
    sx: () => ({
      width: '100%',
      height: '100%',
      borderRadius: '40px',
      color: 'white',
      fontSize: { laptop: '18px', tablet: '12px', mobileSmall: '10px' },
      columnGap: '4px',
      ...extraProps,
      '& .MuiChip-label': {
        paddingLeft: { tablet: 1, mobile: '6px', mobileSmall: '3px' },
        paddingRight: { tablet: 1, mobile: '6px', mobileSmall: '3px' },
      },
    }),
  }),
  statLabelGridConfig: {
    item: true,
    container: true,
    xl: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabelTextConfig: {
    variant: 'Subtitle 2',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: { tablet: '14px', mobileSmall: '12px' },
  },
};

export default styles;

const styles = {
  mainGridProps: {
    position: 'relative',
    container: true,
    mobileSmall: 12,
    height: '100vh',
    maxHeight: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
    sx: {
      background: (theme) => {
        return theme.palette.Background.primary;
      },
    },
  },
  lineGuideGridProps: {
    width: '614px',
    height: '50px',
    item: true,
    container: true,
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginBottom: '50px',
    position: 'relative',
    sx: {
      border: (theme) => `1px solid ${theme.palette.primary.main}`,
      borderImageSource:
        'linear-gradient(327.23deg, #3D3F4E 19.47%, #8653FF 80.53%)',
      background: '#181A20',
      'margin-top': '52px',
      borderRadius: '10px',
      padding: '0 10px',
      gap: '10px',
    },
  },
  guideDotProps: {
    item: true,
    width: '21px',
    height: '21px',
    borderRadius: '50%',
    sx: {
      background: '#656277',
      border: '2px solid #444154',
    },
  },
  guideLineProps: {
    item: true,
    width: '140px',
    height: '8px',
    borderRadius: '11px',
    sx: {
      background: '#444154',
    },
  },
  guideItemFocusProps: {
    sx: {
      background: '#444154',
      border: (theme) => `2px solid ${theme.palette.primary.main}`,
    },
  },
  MainSectionProps: {
    fontFamily: 'Satoshi',
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: '54px',
    letterSpacing: '-0.02em',
    color: '#ffffff',
    textAlign: 'center',
  },
  MainSectionTwoProps: {
    fontFamily: 'Satoshi',
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: '32.4px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '20px',
  },
  submitButtonProps: {
    color: 'purple',
    inverted: true,
    extraProps: {
      padding: '2px',
      width: 'auto',
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      px: 4,
    },
  },
};

export default styles;

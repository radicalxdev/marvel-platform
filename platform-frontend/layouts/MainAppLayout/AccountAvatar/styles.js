const styles = {
  mainGridProps: {
    item: true,
  },
  iconButtonProps: {
    'aria-haspopup': 'true',
    width: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
    height: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
    sx: {
      padding: '4px',
      '& .MuiBadge-badge': {
        bottom: { mobile: '15%', mobileSmall: '20%' },
        right: { mobile: '15%', mobileSmall: '25%' },
      },
    },
  },
  badgeProps: {
    variant: 'dot',
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
    color: 'success',
    overlap: 'circular',
  },
  avatarContainerConfig: (avatarColour) => ({
    sx: () => ({
      backgroundColor: avatarColour,
      width: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
      height: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
      '& span': {
        marginTop: '5px',
        transform: 'scale(1.2)',
      },
    }),
  }),
  avatarConfig: {
    layout: 'fill',
    objectFit: 'contain',
  },
  avatarPlaceholderConfig: {
    objectFit: 'contain',
  },
};

export default styles;

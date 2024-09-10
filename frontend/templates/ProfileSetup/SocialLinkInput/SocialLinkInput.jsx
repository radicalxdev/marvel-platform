import React, { forwardRef } from 'react';

import { Facebook, LinkedIn, Twitter } from '@mui/icons-material';

import FormTextField from '@/components/FormTextField';

import { iconStyle } from './styles';

const iconMap = {
  facebook: <Facebook sx={iconStyle} />,
  linkedin: <LinkedIn sx={iconStyle} />,
  twitter: <Twitter sx={iconStyle} />,
};

const SocialLinkInput = forwardRef(({ icon, control, name, ...props }, ref) => {
  const Icon = iconMap[icon];

  return (
    <FormTextField
      name={name}
      ref={ref}
      placeholderText={`| Paste ${
        icon.charAt(0).toUpperCase() + icon.slice(1)
      } Link`}
      fullWidth
      control={control}
      icon={Icon}
      sx={{ mb: 1, color: 'text.primary' }}
      {...props}
    />
  );
});

export default SocialLinkInput;

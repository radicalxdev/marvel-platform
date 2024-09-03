import React, { forwardRef } from 'react';

import { Facebook, LinkedIn, Twitter } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

const iconMap = {
  facebook: Facebook,
  linkedin: LinkedIn,
  twitter: Twitter,
};

// Forwarding ref to the TextField component
const SocialLinkInput = forwardRef(
  ({ icon, error, helperText, ...props }, ref) => {
    const Icon = iconMap[icon];

    return (
      <TextField
        {...props}
        ref={ref}
        label={`${icon.charAt(0).toUpperCase() + icon.slice(1)} Link`}
        placeholder={`Paste ${
          icon.charAt(0).toUpperCase() + icon.slice(1)
        } Link`}
        fullWidth
        error={error}
        helperText={helperText}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 1, color: 'text.primary' }} // Add some bottom margin
      />
    );
  }
);

export default SocialLinkInput;

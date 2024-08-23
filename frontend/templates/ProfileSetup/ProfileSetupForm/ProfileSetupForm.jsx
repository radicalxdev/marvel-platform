import React from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';

import SocialLinkInput from '../SocialLinkInput';
import ImageUpload from '@/components/ImageUpload';

import useWatchFields from '@/hooks/useWatchFields';
import ONBOARDING_REGEX from '@/regex/onboarding';

const WATCH_FIELDS = [
    { fieldName: 'fullName', regexPattern: ONBOARDING_REGEX.fullName.regex },
    { fieldName: 'occupation', regexPattern: ONBOARDING_REGEX.occupation.regex },
    { fieldName: 'facebookLink', regexPattern: ONBOARDING_REGEX.url.regex },
    { fieldName: 'linkedinLink', regexPattern: ONBOARDING_REGEX.url.regex },
    { fieldName: 'twitterLink', regexPattern: ONBOARDING_REGEX.url.regex },
    { fieldName: 'bio', regexPattern: ONBOARDING_REGEX.bio.regex },
];

const ProfileSetupForm = ({ onSubmit, isLoading, user }) => {
    const { register, control, handleSubmit, fieldStates, watch } = useWatchFields(WATCH_FIELDS);
    
    const onSubmitForm = (data) => {
      // Check if at least one social media link is filled
      if (!data.facebookLink && !data.linkedinLink && !data.twitterLink) {
        alert('Please fill in at least one social media link.');
        return;
      }
      onSubmit(data);
    };

    // Watch the bio field for changes
    const bioValue = watch("bio", "");
    let remainingChars = 200 - bioValue.length;

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
          {/* Title */}
          <Box sx={{ width: '100%', mb: 4 }}>
            <Typography variant="h4" align="center" sx={{ mb: 1 }}>Profile Setup</Typography>
            <Typography variant="subtitle1" align="center">Get started by setting up your profile</Typography>
          </Box>
          
          {/* Fullname and occupation */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                {...register('fullName', { required: 'Full Name is required' })}
                label="Full Name"
                placeholder="Enter Name"
                fullWidth
                defaultValue={user.fullName || ''}
                error={fieldStates.fullName.status === 'error'}
                helperText={fieldStates.fullName.status === 'error' ? ONBOARDING_REGEX.fullName.message : ''}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                {...register('occupation', { required: 'Occupation is required' })}
                label="Occupation"
                placeholder="Enter Occupation"
                fullWidth
                defaultValue={user.occupation || ''}
                error={fieldStates.occupation.status === 'error'}
                helperText={fieldStates.occupation.status === 'error' ? ONBOARDING_REGEX.occupation.message : ''}
              />
            </Box>
          </Box>

          {/* Social Links */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Social Links</Typography>
            <SocialLinkInput
              {...register('facebookLink')}
              icon="facebook"
              defaultValue={user.socialLink?.facebook || ''}
              error={fieldStates.facebookLink.status === 'error'}
              helperText={fieldStates.facebookLink.status === 'error' ? ONBOARDING_REGEX.url.message : ''}
            />
            <SocialLinkInput
              {...register('linkedinLink')}
              icon="linkedin"
              defaultValue={user.socialLink?.linkedin || ''}
              error={fieldStates.linkedinLink.status === 'error'}
              helperText={fieldStates.linkedinLink.status === 'error' ? ONBOARDING_REGEX.url.message : ''}
            />
            <SocialLinkInput
              {...register('twitterLink')}
              icon="twitter"
              defaultValue={user.socialLink?.twitter || ''}
              error={fieldStates.twitterLink.status === 'error'}
              helperText={fieldStates.twitterLink.status === 'error' ? ONBOARDING_REGEX.url.message : ''}
            />
          </Box>

          {/* Profile Image */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Profile</Typography>
            <ImageUpload
              name="profileImage"
              control={control}
              uid={user.id}
              initialPhotoURL={user.profilePhotoUrl || ''}
            />
          </Box>

          {/* Bio */}
          <Box sx={{ mb: 3 }}>
            <TextField
              {...register('bio', { required: 'Occupation is required' })}
              label="Bio"
              placeholder="Introduce yourself in a few words"
              multiline
              rows={4}
              fullWidth
              defaultValue={user.bio || ''}
              error={fieldStates.bio.status === 'error'}
              helperText={fieldStates.bio.status === 'error' ? ONBOARDING_REGEX.bio.message : ''}
            />
            <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 1 }}>
              Word Limit: {remainingChars} Words
            </Typography>
          </Box>

          {/* Submit Button */}
          <Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
              fullWidth
              sx={{ py: 1.5 }}
            >
              {isLoading ? 'Submitting...' : 'Next'}
            </Button>
          </Box>
        </form>
    );
}

export default ProfileSetupForm;
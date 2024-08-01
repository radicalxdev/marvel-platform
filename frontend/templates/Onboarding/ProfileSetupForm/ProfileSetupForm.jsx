import { useContext } from 'react';

import { Facebook, LinkedIn, X as XIcon } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import {
  Controller,
  FormContainer,
  TextareaAutosizeElement,
  useForm,
} from 'react-hook-form-mui';

import { useDispatch } from 'react-redux';

import ProfileTextField, {
  InputWrapper,
} from '@/components/ProfileTextField/index.js';

import ALERT_COLORS from '@/constants/notification.js';

import stylesOnboarding from '../styles.js';

import styles from './styles.js';

import { AuthContext } from '@/providers/GlobalProvider.jsx';

import { setTempData } from '@/redux/slices/onboardingSlice.js';

const ProfileSetupForm = ({ onNext, tempData }) => {
  const dispatch = useDispatch();
  const { handleOpenSnackBar } = useContext(AuthContext);

  const formContext = useForm({
    defaultValues: tempData,
    mode: 'onChange',
  });

  const {
    control,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = formContext;

  const onSubmit = (data) => {
    const template = {
      fullName: '',
      occupation: '',
      facebook: '',
      linkedin: '',
      x: '',
      profile: '',
      bio: '',
    };

    // Merge the template with the user-provided data, overriding defaults
    const completeData = Object.keys(template).reduce((acc, key) => {
      acc[key] = data[key] !== undefined ? data[key] : template[key];
      return acc;
    }, {});

    dispatch(setTempData(completeData)); // Store complete form data in Redux
    onNext(completeData); // Pass complete data to OnboardingPage and proceed to the next step
  };

  const onError = () => {
    handleOpenSnackBar(ALERT_COLORS.ERROR, 'Oops! Some fields contain errors');
  };

  const renderFullName = () => (
    <InputWrapper label="Full Name" required>
      <ProfileTextField
        name="fullName"
        control={control}
        rules={{ required: 'Full Name is required!' }}
        placeholder="Enter Name"
        error={errors.fullName}
      />
    </InputWrapper>
  );

  const renderOccupation = () => (
    <InputWrapper label="Occupation" required>
      <ProfileTextField
        name="occupation"
        control={control}
        rules={{ required: 'Occupation is required!' }}
        placeholder="Enter Occupation"
        error={errors.occupation}
      />
    </InputWrapper>
  );

  const renderSocialLinks = () => (
    <InputWrapper label="Social Links">
      <Grid {...styles.socialLinksContainer}>
        <ProfileTextField
          name="facebook"
          control={control}
          rules={{
            pattern: {
              value: /https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._-]+\/?/,
              message: 'Invalid Facebook URL',
            },
          }}
          icon={Facebook}
          placeholder="Paste Link"
          error={errors.facebook}
        />
        <ProfileTextField
          name="linkedin"
          control={control}
          rules={{
            pattern: {
              value:
                /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/gm,
              message: 'Invalid LinkedIn URL',
            },
          }}
          icon={LinkedIn}
          placeholder="Paste Link"
          error={errors.linkedin}
        />
        <ProfileTextField
          name="x"
          control={control}
          rules={{
            pattern: {
              value: /https?:\/\/(www\.)?x\.com\/\w+/g,
              message: 'Invalid X URL',
            },
          }}
          icon={XIcon}
          placeholder="Paste Link"
          error={errors.x}
        />
      </Grid>
    </InputWrapper>
  );

  const watchProfile = watch('profile');
  const renderProfile = () => {
    const handleImageUpload = (e, onChange) => {
      e.preventDefault();
      const file =
        e.type === 'change' ? e.target.files[0] : e.dataTransfer.files[0];
      const maxSizeInBytes = 1024 ** 2; // 1MB

      if (file) {
        if (file.size > maxSizeInBytes) {
          handleOpenSnackBar(
            ALERT_COLORS.ERROR,
            'The profile file size is over 1MB'
          );
        } else {
          onChange(file.name);
        }
      }
    };
    return (
      <Controller
        name="profile"
        control={control}
        render={({ field: { onChange, onBlur, name } }) => (
          <InputWrapper label="Profile">
            <Grid
              {...styles.imageUploadContainer}
              onDrop={(e) => handleImageUpload(e, onChange)}
            >
              {watchProfile ? (
                <Grid>
                  <Typography component="span">{watchProfile}</Typography>
                  <Button
                    variant="contained"
                    {...stylesOnboarding.button}
                    onClick={() => setValue('profile', '')}
                  >
                    Cancel
                  </Button>
                </Grid>
              ) : (
                <>
                  <Typography>
                    Drag & Drop OR{' '}
                    <Typography component="span">Upload an Image</Typography>
                  </Typography>
                  <Typography>Formats: JPG, PNG, PDF | Up to 1 MB</Typography>
                </>
              )}
              <input
                hidden={!!watchProfile}
                type="file"
                accept="image/png, image/jpg, application/pdf"
                onChange={(e) => handleImageUpload(e, onChange)}
                name={name}
                onBlur={onBlur}
              />
            </Grid>
          </InputWrapper>
        )}
      />
    );
  };

  const watchBio = watch('bio');
  const renderBio = () => (
    <InputWrapper label="Bio">
      <Controller
        name="bio"
        control={control}
        rules={{
          validate: (fieldValue) =>
            fieldValue ? fieldValue.trim().split(/\s+/).length <= 200 : true,
        }}
        render={({ field }) => (
          <TextareaAutosizeElement
            placeholder="Introduce yourself in a few words"
            resizeStyle="vertical"
            rows={3}
            {...styles.textarea}
            {...field}
          />
        )}
      />
      <Typography {...styles.wordLimit}>
        Words:{' '}
        <Typography {...styles.wordLimitError(errors.bio)}>
          {watchBio ? watchBio.trim().split(/\s+/).length : '0'}/200
        </Typography>
      </Typography>
    </InputWrapper>
  );

  return (
    <Grid {...stylesOnboarding.mainGrid} {...styles.mainGrid}>
      <Typography {...stylesOnboarding.titleProps}>Profile Setup</Typography>
      <Typography {...stylesOnboarding.descriptionProps}>
        Get started by setting up your profile
      </Typography>

      <FormContainer
        formContext={formContext}
        onSuccess={handleSubmit(onSubmit)}
        onError={onError}
      >
        <Grid {...styles.formContainer}>
          <Grid {...styles.flexContainer}>
            {renderFullName()}
            {renderOccupation()}
          </Grid>
          {renderSocialLinks()}
          {renderProfile()}
          {renderBio()}
          <Button {...stylesOnboarding.buttonProps}>Next</Button>
        </Grid>
      </FormContainer>
    </Grid>
  );
};

export default ProfileSetupForm;

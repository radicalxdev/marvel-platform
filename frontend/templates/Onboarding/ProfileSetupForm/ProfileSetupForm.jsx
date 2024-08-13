import { useContext, useState } from 'react';

import { Facebook, LinkedIn, X as XIcon } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image.js';
import {
  Controller,
  FormContainer,
  TextareaAutosizeElement,
  useForm,
} from 'react-hook-form-mui';
import { useDispatch } from 'react-redux';

import { InputWrapper, ProfileTextField } from '@/components/ProfileTextField';

import ALERT_COLORS from '@/constants/notification.js';

import stylesOnboarding from '../styles.js';

import styles from './styles.js';

import { AuthContext } from '@/providers/GlobalProvider.jsx';
import { setTempData } from '@/redux/slices/onboardingSlice.js';
import ONBOARDING_REGEX from '@/regex/onboarding.js';

const ProfileSetupForm = ({ onNext, tempData }) => {
  const dispatch = useDispatch();
  const { handleOpenSnackBar } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState(null);

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
        rules={ONBOARDING_REGEX.fullName}
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
        rules={ONBOARDING_REGEX.occupation}
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
          rules={ONBOARDING_REGEX.facebook}
          icon={Facebook}
          placeholder="Paste Link"
          error={errors.facebook}
        />
        <ProfileTextField
          name="linkedin"
          control={control}
          rules={ONBOARDING_REGEX.linkedin}
          icon={LinkedIn}
          placeholder="Paste Link"
          error={errors.linkedin}
        />
        <ProfileTextField
          name="x"
          control={control}
          rules={ONBOARDING_REGEX.x}
          icon={XIcon}
          placeholder="Paste Link"
          error={errors.x}
        />
      </Grid>
    </InputWrapper>
  );

  const watchProfile = watch('profile');
  const renderProfile = () => {
    const handleImageUpload = async (e, onChange) => {
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
          try {
            setImagePreview(URL.createObjectURL(file));

            // const storage = getStorage();
            // const storageRef = ref(storage, `profile_images/${file.name}`);
            // await uploadBytes(storageRef, file);

            // const downloadURL = await getDownloadURL(storageRef);

            onChange(file);
          } catch (error) {
            handleOpenSnackBar(ALERT_COLORS.ERROR, 'Error uploading the file');
          }
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
              {imagePreview ? (
                <Grid {...styles.imageUploadContainerFlex}>
                  <Image
                    src={imagePreview}
                    alt="Profile"
                    {...styles.imageProps}
                  />
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
        rules={ONBOARDING_REGEX.bio}
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

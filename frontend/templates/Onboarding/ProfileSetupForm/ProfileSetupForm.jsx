import { useState } from 'react';

import { Facebook, LinkedIn, X as XIcon } from '@mui/icons-material';
import { Button, Grid, InputLabel, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import {
  FormContainer,
  TextareaAutosizeElement,
  TextFieldElement,
} from 'react-hook-form-mui';

import stylesOnboarding from '../styles.js';

import styles from './styles.js';

const InputWrapper = (props) => {
  const { label, children } = props;
  return (
    <Grid>
      <InputLabel {...styles.label}>{label}</InputLabel>
      {children}
    </Grid>
  );
};

const ProfileTextField = (props) => {
  const { icon: Icon, ...otherProps } = props;
  if (Icon) {
    return (
      <TextFieldElement
        {...styles.input}
        {...otherProps}
        InputProps={{
          startAdornment: (
            <>
              <Icon />
              <span>|</span>
            </>
          ),
        }}
      />
    );
  }
  return <TextFieldElement {...styles.input} {...otherProps} />;
};

const ProfileSetupForm = () => {
  const router = useRouter();

  const [image, setImage] = useState('');

  const handleSubmit = () => {
    router.push('/onboarding/2');
  };

  const handleTextarea = (e) => {
    const wordCount = e.target.value.trim().split(/\s+/).length;
    if (wordCount <= 200) {
      // TODO
    } else {
      alert('No more than 200 words');
    }
  };

  const renderFullName = () => (
    <InputWrapper label="Full Name">
      <ProfileTextField placeholder="Enter Name" name="name" fullWidth />
    </InputWrapper>
  );

  const renderOccupation = () => (
    <InputWrapper label="Occupation">
      <ProfileTextField
        placeholder="Enter Occupation"
        name="occupation"
        fullWidth
      />
    </InputWrapper>
  );

  const renderSocialLinks = () => (
    <InputWrapper label="Social Links">
      <Grid {...styles.socialLinksContainer}>
        <ProfileTextField
          icon={Facebook}
          placeholder="Paste Link"
          name="facebook"
        />
        <ProfileTextField
          icon={LinkedIn}
          placeholder="Paste Link"
          name="linkedin"
        />
        <ProfileTextField icon={XIcon} placeholder="Paste Link" name="x" />
      </Grid>
    </InputWrapper>
  );

  const renderProfile = () => {
    const handleImageUpload = (e) => {
      e.preventDefault();
      const file =
        e.type === 'change' ? e.target.files[0] : e.dataTransfer.files[0];
      const maxSizeInBytes = 1024 ** 2; // 1MB

      if (file) {
        // Check the file size
        if (file.size > maxSizeInBytes) {
          alert('File is too large');
        } else {
          setImage({ name: file.name });
          // console.log(file);
        }
      }
    };
    return (
      <InputWrapper label="Profile">
        <Grid
          {...styles.imageUploadContainer}
          // onDragOver={(e) => e.preventDefault()}
          onDrop={handleImageUpload}
        >
          {image ? (
            <Grid>
              <Typography component="span">{image.name}</Typography>
              <Button
                variant="contained"
                {...stylesOnboarding.button}
                onClick={() => setImage('')}
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
              <Typography>Formats: JPG, PNG, PDF | Upto 1 MB</Typography>
              <input
                type="file"
                accept="image/png, image/jpg, application/pdf"
                onChange={handleImageUpload}
              />
            </>
          )}
        </Grid>
      </InputWrapper>
    );
  };

  const renderBio = () => (
    <InputWrapper label="Bio">
      <TextareaAutosizeElement
        placeholder="Introduce yourself in a few words"
        name="bio"
        resizeStyle="vertical"
        rows={3}
        {...styles.textarea}
        onChange={handleTextarea}
      />
      <Typography {...styles.wordLimit}>
        Word Limit: <Typography component="span">200 Words</Typography>
      </Typography>
    </InputWrapper>
  );

  return (
    <Grid {...stylesOnboarding.mainGrid}>
      <Typography variant="h4" gutterBottom>
        Profile Setup
      </Typography>
      <Typography>Get started by setting up your profile</Typography>

      <FormContainer defaultValues={{}} onSuccess={handleSubmit}>
        <Grid {...styles.formContainer}>
          <Grid {...styles.flexContainer}>
            {renderFullName()}
            {renderOccupation()}
          </Grid>

          {renderSocialLinks()}

          {renderProfile()}

          {renderBio()}

          <Button
            variant="contained"
            onClick={handleSubmit}
            {...stylesOnboarding.button}
          >
            Next
          </Button>
        </Grid>
      </FormContainer>
    </Grid>
  );
};

export default ProfileSetupForm;

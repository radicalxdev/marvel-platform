import { useContext, useState } from 'react';

import { Grid, IconButton, useTheme } from '@mui/material';
import { updateProfile } from 'firebase/auth';
import { FormContainer } from 'react-hook-form-mui';
import { useDispatch, useSelector } from 'react-redux';

import useWatchFields from '@/hooks/useWatchFields';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import PencilIcon from '@/assets/svg/Pencil.svg';

import ALERT_COLORS from '@/constants/notification';

import ChangeEmailAddress from '../ChangeEmailAddress';
import ProfileInputField from '../ProfileInputField';

import styles from './styles';

import { AuthContext } from '@/providers/GlobalProvider';
import { auth, firestore } from '@/redux/store';
import fetchUserData from '@/redux/thunks/user';
import updateUserProfile from '@/services/users/updateUserProfile';

const DEFAULT_ERR_STATE = {
  email: false,
  fullName: false,
  userName: false,
};

const WATCH_FIELDS = [
  {
    fieldName: 'fullName',
    regexPattern: /.+/,
  },
  {
    fieldName: 'userName',
    regexPattern: /.+/,
  },
];

const ProfileForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { data: userData } = useSelector((state) => state.user);
  const { data: authUser } = useSelector((state) => state.auth);

  const DEFAULT_FORM_VALUES = {
    email: authUser?.email,
    fullName: userData?.fullName,
    userName: authUser?.displayName,
  };

  const [openEmailAddressModal, setOpenEmailAddressModal] = useState(false);
  const [error, setError] = useState(DEFAULT_ERR_STATE);
  const [loading, setLoading] = useState(false);

  const { handleOpenSnackBar } = useContext(AuthContext);

  const { register, control, fieldStates, reset } =
    useWatchFields(WATCH_FIELDS);

  const toggleEmailAddressModal = () =>
    setOpenEmailAddressModal((prev) => !prev);

  const handleSubmit = async () => {
    const { fullName, userName } = fieldStates;

    setLoading(true);

    try {
      if (fullName.valid) {
        await updateUserProfile({
          fullName: fullName.value,
        });
        handleOpenSnackBar(ALERT_COLORS.SUCCESS, 'Profile updated');
        await dispatch(fetchUserData({ firestore, id: authUser.uid }));
      }

      if (userName.valid) {
        await updateProfile(auth.currentUser, { displayName: userName.value });
        handleOpenSnackBar(ALERT_COLORS.SUCCESS, 'Profile updated');
      }

      if (!fullName.valid && !userName.valid) {
        setError((prev) => ({
          ...prev,
          fullName: { message: 'Full name is required' },
          userName: { message: 'Username is required' },
        }));
      }
    } catch (err) {
      handleOpenSnackBar(ALERT_COLORS.ERROR, 'Error updating profile');
    } finally {
      reset({
        email: '',
        fullName: '',
        userName: '',
      });
      setLoading(false);
    }
  };

  const renderUserNameInput = () => {
    return (
      <Grid item mobileSmall={6}>
        <ProfileInputField
          id="username"
          label="Username"
          name="userName"
          placeholderText={authUser?.displayName || 'Username'}
          error={!!error.userName}
          control={control}
          helperText={error.userName?.message}
          state={fieldStates.userName?.status}
          ref={register}
          focused={fieldStates.userName?.valid}
          showPassword
        />
      </Grid>
    );
  };

  const renderFullNameInput = () => {
    return (
      <Grid item mobileSmall={6}>
        <ProfileInputField
          id="fullName"
          label="Full Name"
          name="fullName"
          placeholderText={userData?.fullName}
          error={!!error.fullName}
          helperText={error.fullName?.message}
          state={fieldStates.fullName?.status}
          control={control}
          ref={register}
          focused={fieldStates.fullName?.valid}
          showPassword
        />
      </Grid>
    );
  };

  const renderEmailInput = () => {
    return (
      <Grid {...styles.emailInputGridProps}>
        <IconButton
          onClick={toggleEmailAddressModal}
          {...styles.editButtonProps}
        >
          <PencilIcon />
        </IconButton>
        <ProfileInputField
          disabled
          id="email"
          label="Email Address"
          placeholderText={authUser?.email}
          error={!!error.email}
          helperText={error.email?.message}
          showPassword
        />
      </Grid>
    );
  };

  const renderSubmitButton = () => {
    return (
      <Grid {...styles.submitButtonGridProps}>
        <GradientOutlinedButton
          color="green2"
          inverted
          loading={loading}
          text="Save Changes"
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          clickHandler={handleSubmit}
          {...styles.submitButtonProps}
        />
      </Grid>
    );
  };

  return (
    <FormContainer
      defaultValues={DEFAULT_FORM_VALUES}
      FormProps={{ style: { width: '100%' } }}
    >
      <Grid {...styles.formGridProps}>
        {renderFullNameInput()}
        {renderUserNameInput()}
        {renderEmailInput()}
        {renderSubmitButton()}
      </Grid>
      <ChangeEmailAddress
        open={openEmailAddressModal}
        handleCloseModal={toggleEmailAddressModal}
      />
    </FormContainer>
  );
};

export default ProfileForm;

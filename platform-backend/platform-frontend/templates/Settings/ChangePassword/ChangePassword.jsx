import { useContext, useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from '@mui/material';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { FormContainer } from 'react-hook-form-mui';
import { useSelector } from 'react-redux';

import useWatchFields from '@/hooks/useWatchFields';

import BackDropModal from '@/components/BackDropModal';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import { VALIDATION_STATES } from '@/constants/auth';

import ALERT_COLORS from '@/constants/notification';

import ProfileInputField from '../ProfileInputField';

import styles from './styles';

import { AuthContext } from '@/providers/GlobalProvider';
import { auth } from '@/redux/store';
import AUTH_REGEX from '@/regex/auth';

import { passwordCheck } from '@/utils/AuthUtils';

const DEFAULT_FORM_VALUES = {
  currentPassword: '',
  newPassword: '',
  reEnterNewPassword: '',
};

const DEFAULT_ERR_STATE = {
  currentPassword: false,
  newPassword: false,
  reEnterNewPassword: false,
};

const DEFAULT_VIEW_PASSWORD_STATE = {
  currentPassword: false,
  newPassword: false,
};

const WATCH_FIELDS = [
  {
    fieldName: 'currentPassword',
    regexPattern: AUTH_REGEX.password.regex,
  },
  {
    fieldName: 'newPassword',
    regexPattern: AUTH_REGEX.password.regex,
  },
  {
    fieldName: 'reEnterNewPassword',
    regexPattern: AUTH_REGEX.password.regex,
  },
];

/**
 * Renders the ChangePassword component.
 *
 * @param {Object} props - The props object containing open and handleCloseModal.
 * @return {JSX.Element} The rendered ChangePassword component.
 */
const ChangePassword = (props) => {
  const { open, handleCloseModal } = props;

  const theme = useTheme();

  const { data: authData } = useSelector((state) => state.auth);

  const [isFormStep, setIsFormStep] = useState(true);
  const [error, setError] = useState(DEFAULT_ERR_STATE);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(DEFAULT_VIEW_PASSWORD_STATE);

  const { handleOpenSnackBar } = useContext(AuthContext);

  const { register, control, fieldStates } = useWatchFields(WATCH_FIELDS);
  const { newPassword, reEnterNewPassword, currentPassword } = fieldStates;

  const { length, uppercase, lowercase, number, noSpaces } = passwordCheck(
    newPassword.value
  );

  const passwordsMatch = newPassword.value === reEnterNewPassword.value;

  const lastCheckState = () => {
    if (!newPassword?.value) return VALIDATION_STATES.DISABLED;
    if (number.valid && noSpaces.valid) return VALIDATION_STATES.SUCCESS;
    return VALIDATION_STATES.WARNING;
  };

  const handleClickShowPassword = (id) =>
    setShowPassword((show) => {
      return { ...show, [id]: !show[id] };
    });

  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async () => {
    setLoading(true);

    if (newPassword.value !== reEnterNewPassword.value) {
      setError((prev) => ({
        ...prev,
        newPassword: { message: 'Passwords do not match' },
        reEnterNewPassword: { message: 'Passwords do not match' },
      }));
      return setLoading(false);
    }

    setLoading(true);

    try {
      await reauthenticateWithCredential(
        auth.currentUser,
        EmailAuthProvider.credential(authData.email, currentPassword.value)
      );

      await updatePassword(auth.currentUser, newPassword.value);

      setLoading(false);
      return setIsFormStep(false);
    } catch (err) {
      if (err.code === 'auth/wrong-password') {
        setError((prev) => ({
          ...prev,
          currentPassword: { message: 'Invalid password' },
        }));
      } else {
        handleOpenSnackBar(ALERT_COLORS.ERROR, 'Error updating password');
      }

      return setLoading(false);
    }
  };

  const setReEnterNewPasswordState = () => {
    if (passwordsMatch && newPassword.valid && reEnterNewPassword.valid)
      return VALIDATION_STATES.SUCCESS;

    if (!newPassword.value || !reEnterNewPassword.value)
      return VALIDATION_STATES.DEFAULT;

    return VALIDATION_STATES.ERROR;
  };

  const setPrefixIcon = (valid) => {
    return <Box {...styles.prefixIconProps(valid)} />;
  };

  const renderVisibilityIcon = (id) => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => handleClickShowPassword(id)}
          onMouseDown={handleMouseDownPassword}
          edge="end"
          sx={{ mr: 0.25 }}
        >
          {showPassword[id] ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    );
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>
          {isFormStep ? 'Change Your Password' : 'Password Changed'}
        </Typography>
      </Grid>
    );
  };

  const renderValidationChecks = () => {
    return (
      <Grid {...styles.validationCheckGridProps}>
        <Grid {...styles.checkTextGridProps}>
          <Typography {...styles.checkTextProps(length.status)}>
            {setPrefixIcon(length.valid)}Must be at least 6 characters long
          </Typography>
        </Grid>
        <Grid {...styles.checkTextGridProps}>
          <Typography {...styles.checkTextProps(uppercase.status)}>
            {setPrefixIcon(uppercase.valid)}Include 1 uppercase letter
          </Typography>
        </Grid>
        <Grid {...styles.checkTextGridProps}>
          <Typography {...styles.checkTextProps(lowercase.status)}>
            {setPrefixIcon(lowercase.valid)}Include 1 lowercase letter
          </Typography>
        </Grid>
        <Grid {...styles.checkTextGridProps}>
          <Typography {...styles.checkTextProps(lastCheckState())}>
            {setPrefixIcon(number.valid && noSpaces.valid)}Include at least 1
            number and no spaces
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderCurrentPasswordInput = () => {
    return (
      <Grid {...styles.inputGridProps}>
        <ProfileInputField
          id="currentPassword"
          label="Enter Your Current Password"
          name="currentPassword"
          state="text"
          placeholderText="Old Password"
          error={!!error.currentPassword}
          helperText={error.currentPassword?.message}
          icon={renderVisibilityIcon('currentPassword')}
          showPassword={showPassword.currentPassword}
          control={control}
          ref={register}
        />
      </Grid>
    );
  };

  const renderNewPasswordInput = () => {
    return (
      <Grid {...styles.inputGridProps}>
        <ProfileInputField
          id="newPassword"
          label="Enter New Password"
          name="newPassword"
          placeholderText="New Password"
          error={!!error.newPassword}
          helperText={
            !newPassword.valid && !!newPassword.value
              ? AUTH_REGEX.password.message
              : error.newPassword?.message
          }
          icon={renderVisibilityIcon('newPassword')}
          showPassword={showPassword.newPassword}
          state={newPassword.status}
          control={control}
          ref={register}
          style={{ marginBottom: 2 }}
          focused={!!newPassword.value}
        />
        {renderValidationChecks()}
      </Grid>
    );
  };

  const renderReEnterPasswordInput = () => {
    return (
      <Grid {...styles.inputGridProps}>
        <ProfileInputField
          id="reEnterNewPassword"
          label="Re-Enter Password"
          name="reEnterNewPassword"
          placeholderText="Re-Enter Password"
          error={!!error.reEnterNewPassword && !!reEnterNewPassword?.value}
          helperText={
            !passwordsMatch &&
            !!newPassword.value &&
            !!reEnterNewPassword.value &&
            'Password does not match'
          }
          icon={renderVisibilityIcon('newPassword')}
          showPassword={showPassword.newPassword}
          state={setReEnterNewPasswordState()}
          control={control}
          ref={register}
          focused={!!newPassword.value}
        />
      </Grid>
    );
  };

  const renderButtonGroup = () => {
    return (
      <Grid {...styles.buttonGroupGridProps}>
        <Grid {...styles.buttonGridProps}>
          <GradientOutlinedButton
            id="cancelButton"
            bgcolor={theme.palette.Dark_Colors.Dark[2]}
            textColor={theme.palette.Dark_Colors.Dark[2]}
            text="Cancel"
            clickHandler={handleCloseModal}
            {...styles.outlinedButtonProps}
          />
        </Grid>
        <Grid {...styles.buttonGridProps}>
          <GradientOutlinedButton
            id="submitButton"
            bgcolor={theme.palette.Dark_Colors.Dark[2]}
            disabled={!newPassword.valid || !passwordsMatch}
            text="Change Password"
            loading={loading}
            clickHandler={handleSubmit}
            inverted
            {...styles.primaryButtonProps}
          />
        </Grid>
      </Grid>
    );
  };

  const renderForm = () => {
    return (
      <Grid {...styles.formGridProps}>
        <FormContainer defaultValues={DEFAULT_FORM_VALUES}>
          <Grid {...styles.formProps}>
            {renderCurrentPasswordInput()}
            {renderNewPasswordInput()}
            {renderReEnterPasswordInput()}
            {renderButtonGroup()}
          </Grid>
        </FormContainer>
      </Grid>
    );
  };

  const renderSuccessPage = () => {
    return (
      <>
        <Grid {...styles.successTextGridProps}>
          <Typography {...styles.successTextProps}>
            Your password has been changed successfully
          </Typography>
        </Grid>
        <Grid {...styles.okayButtonGridProps}>
          <Button onClick={handleCloseModal} {...styles.primaryButtonProps}>
            Okay
          </Button>
        </Grid>
      </>
    );
  };

  return (
    <BackDropModal
      open={open}
      handleClose={handleCloseModal}
      level={2}
      extraGridContainerProps={{ overflow: 'auto' }}
    >
      <Grid {...styles.passwordGridProps}>
        {renderTitle()}
        {isFormStep ? renderForm() : renderSuccessPage()}
      </Grid>
    </BackDropModal>
  );
};

export default ChangePassword;

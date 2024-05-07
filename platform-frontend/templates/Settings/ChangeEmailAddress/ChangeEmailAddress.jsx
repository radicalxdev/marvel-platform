import { useContext, useState } from 'react';

import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Typography,
  useTheme,
} from '@mui/material';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { FormContainer } from 'react-hook-form-mui';
import { useSelector } from 'react-redux';

import useWatchFields from '@/hooks/useWatchFields';

import BackDropModal from '@/components/BackDropModal';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import ALERT_COLORS from '@/constants/notification';

import ProfileInputField from '../ProfileInputField';

import styles from './styles';

import { AuthContext } from '@/providers/GlobalProvider';
import { auth, functions } from '@/redux/store';
import AUTH_REGEX from '@/regex/auth';
import { amplitudeTracker } from '@/utils/IntegrationUtils';

const PAGE_STEPS = {
  PASSWORD: 0,
  ENTER_EMAIL: 1,
  EMAIL_SENT: 2,
};

const DEFAULT_ERR_STATE = {
  password: false,
  email: false,
};

const DEFAULT_FORM_VALUES = {
  password: '',
  email: '',
};

const WATCH_FIELDS = [
  {
    fieldName: 'password',
    regexPattern: AUTH_REGEX.password.regex,
  },
  {
    fieldName: 'newEmail',
    regexPattern: AUTH_REGEX.email.regex,
  },
];

/**
 * Renders a modal component for changing the email address.
 *
 * @param {Object} props - The props object.
 * @param {boolean} props.open - Indicates whether the modal is open or not.
 * @param {function} props.handleCloseModal - The function to handle closing the modal.
 * @return {JSX.Element} - The JSX element representing the modal component.
 */
const ChangeEmailAddress = (props) => {
  const { open, handleCloseModal } = props;

  const theme = useTheme();

  const { data: authData } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(PAGE_STEPS.PASSWORD);
  const [error, setError] = useState(DEFAULT_ERR_STATE);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { handleOpenSnackBar } = useContext(AuthContext);
  const { register, control, fieldStates } = useWatchFields(WATCH_FIELDS);

  const isVerifyStep = currentPage === PAGE_STEPS.PASSWORD;
  const isEmailStep = currentPage === PAGE_STEPS.ENTER_EMAIL;
  const isEmailSentStep = currentPage === PAGE_STEPS.EMAIL_SENT;

  const handleClickShowPassword = () => setShow((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const setTitle = () => {
    if (isVerifyStep) return 'Verify Your Password';
    if (isEmailSentStep) return 'Email Address Changed';
    return 'Change Email Address';
  };

  const setButtonText = () => {
    if (isVerifyStep) {
      return 'Continue';
    }

    if (isEmailSentStep) {
      return 'Ok';
    }

    return 'Verify Email';
  };

  const setBodyText = () => {
    if (isEmailStep)
      return '📧 Input your new email address and we\u0027ll shoot over an activation link! 🚀';
    if (isEmailSentStep) return '📧 Your email address has been changed! 🚀';
    return '🔒 Please re-enter your password to confirm your email change. 🔑';
  };

  const handleSubmit = () => {
    const { password, newEmail } = fieldStates;

    setLoading(true);

    if (isVerifyStep) {
      return reauthenticateWithCredential(
        auth.currentUser,
        EmailAuthProvider.credential(authData.email, password.value)
      )
        .then(() => {
          setLoading(false);
          setCurrentPage(PAGE_STEPS.ENTER_EMAIL);
        })
        .catch(() => {
          setLoading(false);
          return setError((prev) => ({
            ...prev,
            password: { message: 'Invalid password' },
          }));
        });
    }

    if (isEmailStep) {
      const updateEmailAddress = httpsCallable(functions, 'updateEmail');

      return updateEmailAddress({ uid: authData.uid, newEmail: newEmail.value })
        .then(() => {
          setLoading(false);
          setCurrentPage(PAGE_STEPS.EMAIL_SENT);
          // Track Email Changed
          amplitudeTracker('Profile_Updated', {
            email: newEmail.value,
            id: authData.uid,
            fieldUpdated: 'Email',
          });
        })
        .catch(() => {
          setLoading(false);
          handleOpenSnackBar(ALERT_COLORS.ERROR, 'Error updating email');
        });
    }

    return handleCloseModal();
  };

  const handleGoBack = () => {
    if (isEmailStep) return setCurrentPage(PAGE_STEPS.PASSWORD);

    return setCurrentPage(PAGE_STEPS.ENTER_EMAIL);
  };

  const renderVisibilityIcon = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
          sx={{ mr: 0.25 }}
        >
          {show ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    );
  };

  const renderGoBack = () => {
    return (
      <IconButton {...styles.goBackProps} size="large" onClick={handleGoBack}>
        <ArrowBack />
      </IconButton>
    );
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>{setTitle()}</Typography>
      </Grid>
    );
  };

  const renderBody = () => {
    return (
      <Grid {...styles.bodyGridProps}>
        <Typography {...styles.bodyProps}>{setBodyText()}</Typography>
      </Grid>
    );
  };

  const renderPasswordInput = () => {
    if (isEmailStep || isEmailSentStep) return null;

    return (
      <Grid {...styles.inputGridProps}>
        <ProfileInputField
          id="password"
          label="Password"
          name="password"
          placeholderText="Enter Current Password"
          error={!!error.password}
          helperText={error.password?.message}
          state={fieldStates.password.status}
          icon={renderVisibilityIcon()}
          showPassword={show}
          control={control}
          ref={register}
        />
      </Grid>
    );
  };

  const renderEmailInput = () => {
    if (isVerifyStep || isEmailSentStep) return null;
    return (
      <Grid {...styles.inputGridProps}>
        <ProfileInputField
          id="newEmail"
          label="Email Address"
          name="newEmail"
          placeholderText="Enter New Email Address"
          error={!!error.email}
          helperText={error.email?.message}
          showPassword
          state={fieldStates.newEmail.status}
          control={control}
          ref={register}
          focused
        />
      </Grid>
    );
  };

  const renderForgotLink = () => {
    if (!isVerifyStep || isEmailSentStep) return null;
    return (
      <Grid {...styles.forgotLinkGridProps}>
        <Link {...styles.forgotLinkProps}>Forgot Password?</Link>
      </Grid>
    );
  };

  const renderButton = () => {
    return (
      <Grid {...styles.buttonGridProps}>
        <Grid item mobileSmall={6}>
          <GradientOutlinedButton
            bgcolor={theme.palette.Dark_Colors.Dark[2]}
            textColor={theme.palette.Dark_Colors.Dark[2]}
            text="Cancel"
            clickHandler={handleCloseModal}
            {...styles.outlinedButtonProps}
          />
        </Grid>
        <Grid item mobileSmall={6}>
          <GradientOutlinedButton
            bgcolor={theme.palette.Dark_Colors.Dark[2]}
            text={setButtonText()}
            loading={loading}
            clickHandler={handleSubmit}
            form="change-email-form"
            inverted
            {...styles.primaryButtonProps}
          />
        </Grid>
      </Grid>
    );
  };

  const renderForm = () => {
    return (
      <FormContainer
        FormProps={{
          id: 'change-email-form',
        }}
        defaultValues={DEFAULT_FORM_VALUES}
        onSuccess={handleSubmit}
      >
        <Grid {...styles.formProps}>
          {renderBody()}
          {renderPasswordInput()}
          {renderEmailInput()}
          {renderForgotLink()}
          {renderButton()}
        </Grid>
      </FormContainer>
    );
  };

  return (
    <BackDropModal open={open} handleClose={handleCloseModal} level={2}>
      <Grid {...styles.containerGridProps}>
        {!isVerifyStep && renderGoBack()}
        {renderTitle()}
        {renderForm()}
      </Grid>
    </BackDropModal>
  );
};

export default ChangeEmailAddress;

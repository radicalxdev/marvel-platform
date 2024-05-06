import { useState } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import EnterEmailView from './EnterEmailView';
import CheckInbox from './CheckInbox';

import { FORGOT_PASSWORD_STEPS } from '@/constants/auth';

import sharedStyles from '@/styles/shared/sharedStyles';

const FORGOT_PASSWORD_PAGE = {
  [FORGOT_PASSWORD_STEPS.EMAIL]: EnterEmailView,
  [FORGOT_PASSWORD_STEPS.CHECK_INBOX]: CheckInbox,
};

const ForgotPasswordPage = (props) => {
  const { handleSwitch } = props;

  const [step, setStep] = useState(FORGOT_PASSWORD_STEPS.EMAIL);
  const [enteredEmail, setEnteredEmail] = useState(null);

  const handleSwitchScreen = () => {
    if (step === FORGOT_PASSWORD_STEPS.EMAIL) {
      handleSwitch();
    }
    if (step === FORGOT_PASSWORD_STEPS.CHECK_INBOX) {
      setStep(FORGOT_PASSWORD_STEPS.EMAIL);
    }
  };

  const renderGoBack = () => {
    return (
      <IconButton
        size="large"
        onClick={handleSwitchScreen}
        {...sharedStyles.backButtonProps}
      >
        <ArrowBack />
      </IconButton>
    );
  };

  const SwitchHandler = FORGOT_PASSWORD_PAGE[step];

  return (
    <>
      {renderGoBack()}
      <SwitchHandler
        goBack={renderGoBack()}
        enteredEmail={enteredEmail}
        setStep={setStep}
        setEnteredEmail={setEnteredEmail}
        handleSwitch={handleSwitchScreen}
      />
    </>
  );
};

export default ForgotPasswordPage;

import { useState } from 'react';

import ResetPassword from '@/templates/Reset/ResetPassword';
import PasswordUpdated from '@/templates/Reset/PasswordUpdated';
import AuthLayout from '@/layouts/AuthLayout';

const Reset = () => {
  const [isPasswordInput, setIsPasswordInput] = useState(true);

  const handleSwitchScreen = () => {
    setIsPasswordInput((prev) => !prev);
  };

  return (
    <>
      {isPasswordInput && <ResetPassword handleSwitch={handleSwitchScreen} />}
      {!isPasswordInput && <PasswordUpdated />}
    </>
  );
};

Reset.getLayout = function getLayout(page) {
  return <AuthLayout isAuthScreen>{page}</AuthLayout>;
};

export default Reset;

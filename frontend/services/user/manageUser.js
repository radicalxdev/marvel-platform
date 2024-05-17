import { sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';

const sendVerification = (user) => {
  return sendEmailVerification(user, {
    url: `/`,
    handleCodeInApp: true,
  });
};

const sendPasswordReset = (auth, email) => {
  return sendPasswordResetEmail(auth, email, {
    url: `/signin`,
    handleCodeInApp: true,
  });
};

export { sendVerification, sendPasswordReset };

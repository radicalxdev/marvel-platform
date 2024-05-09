import { sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';

const sendVerification = (user) => {
  return sendEmailVerification(user, {
    url: `${process.env.NEXT_PUBLIC_LINK}/createavatar`,
    handleCodeInApp: true,
  });
};

const sendPasswordReset = (auth, email) => {
  return sendPasswordResetEmail(auth, email, {
    url: `${process.env.NEXT_PUBLIC_LINK}/signin`,
    handleCodeInApp: true,
  });
};

export { sendVerification, sendPasswordReset };

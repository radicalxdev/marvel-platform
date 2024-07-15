import { Grid, Typography } from '@mui/material';

import Link from 'next/link.js';

import styles from './styles.js';

// import { Snackbar, Button } from '@mui/material';
// import { Box } from '@mui/system';
/**
 * Renders an authentication form with options for local authentication and third-party authentication services.
 *
 * @param {object} props - The props object.
 * @param {JSX.Element} props.form - The JSX element for the local authentication form.
//  * @param {JSX.Element} props.notification - The JSX element for the login error notification.
 * @param {object} props.title - The title object.
 * @param {string} props.title.main - The main title text.
 * @param {string} props.title.subtitle - The subtitle text.
 * @param {string} props.title.route - The link URL.
 * @param {string} props.title.linklabel - The label for the link.
 * @return {JSX.Element} The authentication form JSX.
 */
const AuthForm = (props) => {
  const {
    form,
    notification,
    goBack,
    title: { main, subtitle, route, linklabel },
  } = props;

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.mainTitleProps}>{main}</Typography>
        <Typography {...styles.subTitleProps}>
          {subtitle} <Link href={route}>{linklabel}</Link>
        </Typography>
      </Grid>
    );
  };

  // const renderErrorNotification = () => { 
  //   return (
  //     <Grid {...styles.notificationGridProps} style={{ position: 'relative' }}>
  //       <Box
  //         display="flex"
  //         justifyContent="center"
  //         alignItems="center"
  //         height="100%"
  //       >
  //         {notification}
  //         {/* <Snackbar
  //           open={true}
  //           autoHideDuration={6000}
  //           message="I love snacks"
  //           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  //           style={{
  //             position: 'absolute',
  //             top: '50%',
  //             left: '50%',
  //             transform: 'translate(-50%, -50%)',
  //             maxWidth: '80%', // Adjust the max-width as needed
  //             minWidth: '200px', // Adjust the min-width as needed
  //           }}
  //         /> */}
  //       </Box>
  //     </Grid>

  //   )
  // };

  const renderForm = () => {
    return <Grid {...styles.formGridProps}>{form}</Grid>;
  };

  const renderPolicyInfo = () => {
    return (
      <Grid {...styles.policyInfoGridConfig}>
        <Typography {...styles.policyInfoTextConfig}>
          This site is protected by reCAPTCHA and the Google
        </Typography>
        <Typography {...styles.linksConfig}>
          Privacy Policy and Terms of Service apply.
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {goBack}
      {/* {renderErrorNotification()} */}
      {renderTitle()}
      {renderForm()}
      {renderPolicyInfo()}
    </Grid>
  );
};

export default AuthForm;

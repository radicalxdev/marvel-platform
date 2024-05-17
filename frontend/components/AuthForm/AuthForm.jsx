import { Grid, Typography } from '@mui/material';

import Link from 'next/link.js';

import styles from './styles.js';

/**
 * Renders an authentication form with options for local authentication and third-party authentication services.
 *
 * @param {object} props - The props object.
 * @param {JSX.Element} props.form - The JSX element for the local authentication form.
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
      {renderTitle()}
      {renderForm()}
      {renderPolicyInfo()}
    </Grid>
  );
};

export default AuthForm;

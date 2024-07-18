import { useContext } from 'react';

import { Grid, Typography } from '@mui/material';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import ToolsListingContainer from '@/components/ToolsListingContainer';

import { AUTH_CONTENT } from '@/constants/auth';
import ALERT_COLORS from '@/constants/notification';

import styles from './styles';

import { AuthContext } from '@/providers/GlobalProvider';

const HomePage = (props) => {
  const { data, loading } = props;

  const { handleOpenSnackBar } = useContext(AuthContext);

  const { data: userData } = useSelector((state) => state.user);
  const router = useRouter();
  const userName = userData?.fullName;

  // Login Success Notif
  if (router.query.is_login === 'true') {
    handleOpenSnackBar(
      ALERT_COLORS.SUCCESS,
      AUTH_CONTENT.LOGIN_SUCCESS.message(userName),
      AUTH_CONTENT.LOGIN_SUCCESS.title
    );
    router.replace('/');
  }

  // Sign Up Success Notif
  if (router.query.is_signup === 'true') {
    handleOpenSnackBar(
      ALERT_COLORS.SUCCESS,
      AUTH_CONTENT.SIGNUP_SUCCESS.message(userName),
      AUTH_CONTENT.SIGNUP_SUCCESS.title
    );
    router.replace('/');
  }

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>
          Welcome to{' '}
          <Typography {...styles.highlightTextProps}>Kai Tools</Typography> 👋
        </Typography>
        <Typography {...styles.subtitleProps}>
          Made for{' '}
          <Typography {...styles.highlightTextProps}>educators</Typography>
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      <ToolsListingContainer
        data={data}
        loading={loading}
        category="All Tools"
      />
    </Grid>
  );
};
export default HomePage;

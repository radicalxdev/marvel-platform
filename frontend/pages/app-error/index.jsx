import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import MainAppLayout from '@/layouts/MainAppLayout';

import ErrorIcon from '@/assets/svg/ErrorIcon.svg';
import LargeLogo from '@/assets/svg/MenuLogo.svg';
import Star from '@/assets/svg/Star_3.svg';

import ROUTES from '@/constants/routes';

import pageNotFoundStyles from '@/styles/pageNotFoundStyles';

/**
 * ApplicationError component displays an application error page indicating.
 * It provides an option to navigate back to the homepage.
 *
 *
 * @returns {JSX.Element} ApplicationErrorPagePage component UI
 */
const ApplicationError = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleRouteToHome = () => {
    router.push(ROUTES.HOME);
  };

  const renderLogo = () => (
    <Grid
      onClick={() => router.push(ROUTES.HOME)}
      {...pageNotFoundStyles.logoGridProps}
    >
      <Grid {...pageNotFoundStyles.logoTitleGridProps}>
        <LargeLogo />
      </Grid>
      <Grid {...pageNotFoundStyles.logoTitleGridProps}>
        <Typography {...pageNotFoundStyles.logoTitleProps}>KAI.AI</Typography>
        <Typography {...pageNotFoundStyles.logoSubtitleProps}>
          AI Teaching Assistant
        </Typography>
      </Grid>
    </Grid>
  );

  const renderMainTitle = () => (
    <Grid {...pageNotFoundStyles.titleGridProps}>
      <Typography {...pageNotFoundStyles.subtitleProps}>
        Application Error
      </Typography>
    </Grid>
  );

  const renderBodyText = () => (
    <Grid {...pageNotFoundStyles.bodyGridProps}>
      <Typography {...pageNotFoundStyles.bodyProps}>
        Something went wrong on our end. We&apos;re working to fix this issue.
        <br />
        Please try again later or go back to the homepage.
      </Typography>
    </Grid>
  );

  const renderTopContent = () => (
    <Grid {...pageNotFoundStyles.sectionGridProps}>
      <Typography {...pageNotFoundStyles.titleProps}>
        <ErrorIcon />
      </Typography>
    </Grid>
  );

  const renderGoHomeButton = () => (
    <Grid {...pageNotFoundStyles.buttonGridProps}>
      <GradientOutlinedButton
        bgcolor={theme.palette.Common.White['100p']}
        clickHandler={handleRouteToHome}
        text="Go to Homepage"
        textColor="white"
        {...pageNotFoundStyles.submitButtonProps}
      />
    </Grid>
  );

  const renderBottomContent = () => (
    <Grid {...pageNotFoundStyles.sectionGridProps}>
      <Grid {...pageNotFoundStyles.mainContentGridProps}>
        {renderMainTitle()}
        {renderBodyText()}
        {renderGoHomeButton()}
      </Grid>
    </Grid>
  );

  const renderRadialBackground = () => (
    <>
      <Box {...pageNotFoundStyles.radialBg1Props} />
      <Box {...pageNotFoundStyles.radialBg2Props} />
      <Box {...pageNotFoundStyles.radialBg3Props} />
    </>
  );

  const renderIcons = () => (
    <>
      <Box {...pageNotFoundStyles.star1Props}>
        <Star />
      </Box>
      <Box {...pageNotFoundStyles.star2Props}>
        <Star />
      </Box>
      <Box {...pageNotFoundStyles.star3Props}>
        <Star />
      </Box>
    </>
  );

  return (
    <Grid {...pageNotFoundStyles.mainGridProps}>
      {renderRadialBackground()}
      <Grid {...pageNotFoundStyles.contentGridProps}>
        {renderIcons()}
        {renderLogo()}
        {renderTopContent()}
        {renderBottomContent()}
      </Grid>
    </Grid>
  );
};

ApplicationError.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default ApplicationError;

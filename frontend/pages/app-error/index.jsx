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
 * ApplicationError component displays a page indicating application errors.
 * It provides an option to navigate back to the homepage.
 *
 * Uses MainAppLayout as the layout wrapper.
 *
 * @returns {JSX.Element} ApplicationErrorPage component UI
 */
const ApplicationError = () => {
  const router = useRouter();
  const theme = useTheme();
  const handleRouteToHome = () => {
    router.push(ROUTES.HOME);
  };

  const renderLogo = () => {
    return (
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
  };

  const renderMainTitle = () => {
    return (
      <Grid {...pageNotFoundStyles.titleGridProps}>
        <Typography {...pageNotFoundStyles.subtitleProps}>
          Application Error
        </Typography>
      </Grid>
    );
  };

  const renderBodyText = () => {
    return (
      <Grid {...pageNotFoundStyles.bodyGridProps}>
        <Typography {...pageNotFoundStyles.bodyProps}>
          It’s not you it’s us, we’re trying to fix this issue for you <br />
          Let’s go back to home for the time being!
        </Typography>
      </Grid>
    );
  };

  const renderTopContent = () => {
    return (
      <Grid {...pageNotFoundStyles.sectionGridProps}>
        <Typography {...pageNotFoundStyles.titleProps}>
          <ErrorIcon />
        </Typography>
      </Grid>
    );
  };
  const renderGoHomeButton = () => {
    return (
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
  };

  const renderBottomContent = () => {
    return (
      <Grid {...pageNotFoundStyles.sectionGridProps}>
        <Grid {...pageNotFoundStyles.mainContentGridProps}>
          {renderMainTitle()}
          {renderBodyText()}
          {renderGoHomeButton()}
        </Grid>
      </Grid>
    );
  };

  const renderRadialBackground = () => {
    return (
      <>
        <Box {...pageNotFoundStyles.radialBg1Props} />
        <Box {...pageNotFoundStyles.radialBg2Props} />
        <Box {...pageNotFoundStyles.radialBg3Props} />
      </>
    );
  };

  const renderIcons = () => {
    return (
      <>
        {/* <Box {...pageNotFoundStyles.yellowStarProps}>
          <YellowStar />
        </Box> */}
        {/* <Box {...pageNotFoundStyles.planetProps}>
          <Planet />
        </Box> */}
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
  };

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

import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import MainAppLayout from '@/layouts/MainAppLayout';

import Planet from '@/assets/svg/planet.svg';
import Star from '@/assets/svg/Star_3.svg';
import YellowStar from '@/assets/svg/yellowStar.svg';

import ROUTES from '@/constants/routes';

import pageNotFoundStyles from '@/styles/pageNotFoundStyles';

/**
 * Renders the page for when the requested route is not found.
 *
 * @return {JSX.Element} The JSX element representing the page.
 */
const ApplicationErrorPage = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleRouteToHome = () => {
    router.push(ROUTES.HOME);
  };

  const renderMainTitle = () => {
    return (
      <Grid {...pageNotFoundStyles.titleGridProps}>
        <Typography {...pageNotFoundStyles.subtitleProps}>
          Lost in the Digital Cosmos? ☄️
        </Typography>
      </Grid>
    );
  };

  const renderBodyText = () => {
    return (
      <Grid {...pageNotFoundStyles.bodyGridProps}>
        <Typography {...pageNotFoundStyles.bodyProps}>
          Oops, it seems an Application Error Occurred. Don&apos;t worry, our
          trusty AI, ReX, is here to help navigate you back to the known
          universe. Please try again.
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

  const renderTopContent = () => {
    return (
      <Grid {...pageNotFoundStyles.sectionGridProps}>
        <Typography {...pageNotFoundStyles.midTitleProps}>
          {' '}
          Application Error
        </Typography>
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
        <Box {...pageNotFoundStyles.yellowStarProps}>
          <YellowStar />
        </Box>
        <Box {...pageNotFoundStyles.planetProps}>
          <Planet />
        </Box>
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
        {renderTopContent()}
        {renderBottomContent()}
      </Grid>
    </Grid>
  );
};

ApplicationErrorPage.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default ApplicationErrorPage;

import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import MainAppLayout from '@/layouts/MainAppLayout';

import LargeLogo from '@/assets/svg/MenuLogo.svg';
import Meteor from '@/assets/svg/Meteor.svg';
import MeteorDetails1 from '@/assets/svg/MeteorDetails1.svg';
import MeteorDetails2 from '@/assets/svg/MeteorDetails2.svg';
import MeteorTrail1 from '@/assets/svg/MeteorTrail1.svg';
import MeteorTrail2 from '@/assets/svg/MeteorTrail2.svg';
import MeteorTrail3 from '@/assets/svg/MeteorTrail3.svg';
import Star from '@/assets/svg/Star_3.svg';

import ROUTES from '@/constants/routes';

import pageNotFoundStyles from '@/styles/pageNotFoundStyles';

/**
 * Renders the page for when the requested route is not found.
 *
 * @return {JSX.Element} The JSX element representing the page.
 */
const PageNotFound = () => {
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
          Lost in the Digital Cosmos? ☄️
        </Typography>
      </Grid>
    );
  };

  const renderBodyText = () => {
    return (
      <Grid {...pageNotFoundStyles.bodyGridProps}>
        <Typography {...pageNotFoundStyles.bodyProps}>
          Oops, it seems you&apos;ve entered a black hole! Don&apos;t worry, our
          trusty AI, ReX, is here to help navigate you back to the known
          universe. Try checking the URL or head back to our homepage to
          continue your tech odyssey.
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
        <Typography {...pageNotFoundStyles.titleProps}>404</Typography>
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
        <Box {...pageNotFoundStyles.meteorProps}>
          <Meteor />
        </Box>
        <Box {...pageNotFoundStyles.meteorDetails1Props}>
          <MeteorDetails1 />
        </Box>
        <Box {...pageNotFoundStyles.meteorDetails2Props}>
          <MeteorDetails2 />
        </Box>
        <Box {...pageNotFoundStyles.meteorTrail1Props}>
          <MeteorTrail1 />
        </Box>
        <Box {...pageNotFoundStyles.meteorTrail2Props}>
          <MeteorTrail2 />
        </Box>
        <Box {...pageNotFoundStyles.meteorTrail3Props}>
          <MeteorTrail3 />
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
        {renderLogo()}
        {renderIcons()}
        {renderTopContent()}
        {renderBottomContent()}
      </Grid>
    </Grid>
  );
};

PageNotFound.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default PageNotFound;

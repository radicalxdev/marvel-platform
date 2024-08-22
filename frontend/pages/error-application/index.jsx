import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import MainAppLayout from '@/layouts/MainAppLayout';

import ErrorWindow from '@/assets/svg/ErrorWindow.svg';
import Logo from '@/assets/svg/KaiAILogo.svg';
import Star3 from '@/assets/svg/Star_3.svg';
import Star4 from '@/assets/svg/Star_4.svg';
import Star5 from '@/assets/svg/Star_5.svg';

import ROUTES from '@/constants/routes';

import ApplicationErrorStyle from '@/styles/ApplicationErrorStyle';

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

  const renderLogo = () => {
    return (
      <Grid
        onClick={() => router.push(ROUTES.HOME)}
        {...ApplicationErrorStyle.LogoGridProps}
      >
        <Grid {...ApplicationErrorStyle.LogoImageGridProps}>
          <Logo />
        </Grid>
      </Grid>
    );
  };

  const renderMainTitle = () => {
    return (
      <Grid {...ApplicationErrorStyle.titleGridProps}>
        <Typography {...ApplicationErrorStyle.subtitleProps}>
          Application Error
        </Typography>
      </Grid>
    );
  };

  const renderBodyText = () => {
    return (
      <Grid {...ApplicationErrorStyle.bodyGridProps}>
        <Typography {...ApplicationErrorStyle.bodyProps}>
          It&apos;s not you it&apos;s us, we&apos;re trying to fix this issue
          for you. Let&apos;s go back to home for the time being!
        </Typography>
      </Grid>
    );
  };

  const renderGoHomeButton = () => {
    return (
      <Grid {...ApplicationErrorStyle.buttonGridProps}>
        <GradientOutlinedButton
          bgcolor={theme.palette.Common.White['100p']}
          clickHandler={handleRouteToHome}
          text="Back to Homepage"
          textColor="white"
          {...ApplicationErrorStyle.submitButtonProps}
        />
      </Grid>
    );
  };

  const renderTopContent = () => {
    return (
      <Grid {...ApplicationErrorStyle.sectionGridProps}>
        <Typography {...ApplicationErrorStyle.titleProps} />
      </Grid>
    );
  };

  const renderBottomContent = () => {
    return (
      <Grid {...ApplicationErrorStyle.sectionGridProps}>
        <Grid {...ApplicationErrorStyle.mainContentGridProps}>
          <Grid {...ApplicationErrorStyle.ErrorWindow}>
            <ErrorWindow />
          </Grid>
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
        <Box {...ApplicationErrorStyle.radialBg1Props} />
        <Box {...ApplicationErrorStyle.radialBg2Props} />
        <Box {...ApplicationErrorStyle.radialBg3Props} />
      </>
    );
  };

  const renderIcons = () => {
    return (
      <>
        <Box {...ApplicationErrorStyle.star1Props}>
          <Star3 />
        </Box>
        <Box {...ApplicationErrorStyle.star2Props}>
          <Star4 />
        </Box>
        <Box {...ApplicationErrorStyle.star3Props}>
          <Star5 />
        </Box>
      </>
    );
  };

  return (
    <Grid {...ApplicationErrorStyle.mainGridProps}>
      {renderRadialBackground()}
      <Grid {...ApplicationErrorStyle.LogocontentGridProps}>
        {renderLogo()}
      </Grid>
      <Grid {...ApplicationErrorStyle.TopcontentGridProps}>
        {renderTopContent()}
      </Grid>
      <Grid {...ApplicationErrorStyle.BottomcontentGridProps}>
        {renderBottomContent()}
      </Grid>
      <Grid {...ApplicationErrorStyle.IconcontentGridprops}>
        {renderIcons()}
      </Grid>
    </Grid>
  );
};

ApplicationErrorPage.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default ApplicationErrorPage;

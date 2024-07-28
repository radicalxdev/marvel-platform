import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import MainAppLayout from '@/layouts/MainAppLayout';

import LargeLogo from '@/assets/svg/MenuLogo.svg';
import Networkerror from '@/assets/svg/NetworkError.svg';
import Star3 from '@/assets/svg/Star_2.svg';
import Star from '@/assets/svg/Star_3.svg';
import Star2 from '@/assets/svg/Star_4.svg';

import ROUTES from '@/constants/routes';

import ApplicationErrorStyle from '@/styles/ApplicationNotFoundStyles';

/**
 * Renders the page for when the requested route is not found.
 *
 * @return {JSX.Element} The JSX element representing the page.
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
        {...ApplicationErrorStyle.LogoGridProps}
      >
        <Grid {...ApplicationErrorStyle.LogoImageGridProps}>
          <LargeLogo />
        </Grid>
        <Grid {...ApplicationErrorStyle.LogotitleGridProps}>
          <Typography {...ApplicationErrorStyle.LogotitleProps}>
            KAI.AI
          </Typography>
          <Typography {...ApplicationErrorStyle.LogosubtitleProps}>
            AI Teaching Assistant
          </Typography>
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

  const renderBottomContent = () => {
    return (
      <Grid {...ApplicationErrorStyle.BottomGridprops}>
        <Typography {...ApplicationErrorStyle.bodyProps}>
          It&apos;s not you it&apos;s us, we&apos;re trying to fix this issue
          for you
          <br />
          Let&apos;s go back to home for the time being!
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

  const renderApplicationError = () => {
    return (
      <Grid {...ApplicationErrorStyle.NetworkLogo}>
        <Networkerror />
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
          <Star />
        </Box>
        <Box {...ApplicationErrorStyle.star2Props}>
          <Star2 />
        </Box>
        <Box {...ApplicationErrorStyle.star3Props}>
          <Star3 />
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
        {renderMainTitle()}
      </Grid>
      <Grid {...ApplicationErrorStyle.BottomcontentGridProps}>
        {renderBottomContent()}
      </Grid>
      <Grid {...ApplicationErrorStyle.LogocontentGridProps}>
        {renderApplicationError()}
      </Grid>
      <Grid {...ApplicationErrorStyle.IconcontentGridprops}>
        {renderIcons()}
      </Grid>
      <Grid {...ApplicationErrorStyle.IconcontentGridprops}>
        {renderGoHomeButton()}
      </Grid>
    </Grid>
  );
};

ApplicationError.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default ApplicationError;

import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

import MainAppLayout from '@/layouts/MainAppLayout';

import ErrorWindow from '@/assets/svg/ErrorWindow.svg';
import Logo from '@/assets/svg/KaiAILogo.svg';
import Star3 from '@/assets/svg/Star_3.svg';
import Star4 from '@/assets/svg/Star_4.svg';
import Star5 from '@/assets/svg/Star_5.svg';

import ROUTES from '@/constants/routes';

import NetworkErrorStyle from '@/styles/pageNotFoundStyles';

/**
 * Renders the page for when the requested route is not found.
 *
 * @return {JSX.Element} The JSX element representing the page.
 */

const NetworkErrorPage = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleRouteToHome = () => {
    router.push(ROUTES.HOME);
  };

  const renderLogo = () => {
    return (
      <Grid
        onClick={() => router.push(ROUTES.HOME)}
        {...NetworkErrorStyle.LogoGridProps}
      >
        <Grid {...NetworkErrorStyle.LogoImageGridProps}>
          <Logo />
        </Grid>
        <Grid {...NetworkErrorStyle.LogotitleGridProps}>
          <Typography {...NetworkErrorStyle.LogotitleProps}>KAI.AI</Typography>
          <Typography {...NetworkErrorStyle.LogosubtitleProps}>
            AI Teaching Assistant
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderMainTitle = () => {
    return (
      <Grid {...NetworkErrorStyle.titleGridProps}>
        <Typography {...NetworkErrorStyle.subtitleProps}>
          Application Error
        </Typography>
      </Grid>
    );
  };

  const renderBottomContent = () => {
    return (
      <Grid {...NetworkErrorStyle.BottomGridprops}>
        <Typography {...NetworkErrorStyle.bodyProps}>
          It&apos;s not you it&apos;s us, we&apos;re trying to fix this issue
          for you
          <br />
          Let&apos;s go back to home for the time being!
        </Typography>
      </Grid>
    );
  };

  const renderApplicationError = () => {
    return (
      <Grid {...NetworkErrorStyle.ErrorWindow}>
        <ErrorWindow />
      </Grid>
    );
  };

  const renderRadialBackground = () => {
    return (
      <>
        <Box {...NetworkErrorStyle.radialBg1Props} />
        <Box {...NetworkErrorStyle.radialBg2Props} />
        <Box {...NetworkErrorStyle.radialBg3Props} />
      </>
    );
  };

  const renderIcons = () => {
    return (
      <>
        <Box {...NetworkErrorStyle.star1Props}>
          <Star3 />
        </Box>
        <Box {...NetworkErrorStyle.star2Props}>
          <Star4 />
        </Box>
        <Box {...NetworkErrorStyle.star3Props}>
          <Star5 />
        </Box>
      </>
    );
  };
  return (
    <Grid {...NetworkErrorStyle.mainGridProps}>
      {renderRadialBackground()}
      <Grid {...NetworkErrorStyle.LogocontentGridProps}>{renderLogo()}</Grid>
      <Grid {...NetworkErrorStyle.TopcontentGridProps}>
        {renderMainTitle()}
      </Grid>
      <Grid {...NetworkErrorStyle.BottomcontentGridProps}>
        {renderBottomContent()}
      </Grid>
      <Grid {...NetworkErrorStyle.LogocontentGridProps}>
        {renderApplicationError()}
      </Grid>
      <Grid {...NetworkErrorStyle.IconcontentGridprops}>{renderIcons()}</Grid>
    </Grid>
  );
};

NetworkErrorPage.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default NetworkErrorPage;

import { Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import MainAppLayout from '@/layouts/MainAppLayout';

import ErrorWindow from '@/assets/svg/ErrorWindow.svg';
import Logo from '@/assets/svg/KaiAILogo.svg';
import Star3 from '@/assets/svg/Star_3.svg';
import Star4 from '@/assets/svg/Star_4.svg';
import Star5 from '@/assets/svg/Star_5.svg';

import ROUTES from '@/constants/routes';

import NetworkErrorStyle from '@/styles/NetworkErrorStyle';

/**
 * Renders the page for when the requested route is not found.
 *
 * @return {JSX.Element} The JSX element representing the page.
 */

const NetworkErrorPage = () => {
  const router = useRouter();

  const renderLogo = () => {
    return (
      <Grid
        onClick={() => router.push(ROUTES.HOME)}
        {...NetworkErrorStyle.LogoGridProps}
      >
        <Grid {...NetworkErrorStyle.LogoImageGridProps}>
          <Logo />
        </Grid>
      </Grid>
    );
  };

  const renderMainTitle = () => {
    return (
      <Grid {...NetworkErrorStyle.titleGridProps}>
        <Typography {...NetworkErrorStyle.subtitleProps}>
          Network Error
        </Typography>
      </Grid>
    );
  };

  const renderBodyText = () => {
    return (
      <Grid {...NetworkErrorStyle.bodyGridProps}>
        <Typography {...NetworkErrorStyle.bodyProps}>
          Seems like there is a problem with your internet, try reconnecting and
          refresh the page to continue.
        </Typography>
      </Grid>
    );
  };

  const renderNetworkError = () => {
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

  const renderTopContent = () => {
    return (
      <Grid {...NetworkErrorStyle.sectionGridProps}>
        <Typography {...NetworkErrorStyle.titleProps} />
      </Grid>
    );
  };

  const renderBottomContent = () => {
    return (
      <Grid {...NetworkErrorStyle.sectionGridProps}>
        <Grid {...NetworkErrorStyle.mainContentGridProps}>
          {renderNetworkError()}
          {renderMainTitle()}
          {renderBodyText()}
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...NetworkErrorStyle.mainGridProps}>
      {renderRadialBackground()}
      <Grid {...NetworkErrorStyle.LogocontentGridProps}>{renderLogo()}</Grid>
      <Grid {...NetworkErrorStyle.TopcontentGridProps}>
        {' '}
        {renderTopContent()}
      </Grid>
      <Grid {...NetworkErrorStyle.BottomcontentGridProps}>
        {renderBottomContent()}
      </Grid>
      <Grid {...NetworkErrorStyle.IconcontentGridprops}>{renderIcons()}</Grid>
    </Grid>
  );
};

NetworkErrorPage.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default NetworkErrorPage;

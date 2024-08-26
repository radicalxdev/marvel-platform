import { Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import MainAppLayout from '@/layouts/MainAppLayout';

import ErrorIcon from '@/assets/svg/ErrorIcon.svg';

import LargeLogo from '@/assets/svg/MenuLogo.svg';

import Star from '@/assets/svg/Star_3.svg';

import ROUTES from '@/constants/routes';

import pageNotFoundStyles from '@/styles/pageNotFoundStyles';

/**
 * NetworkError component displays a page indicating network errors.
 * It suggests reconnecting and refreshing the page to continue.
 *
 * Uses MainAppLayout as the layout wrapper.
 *
 * @returns {JSX.Element} NetworkError component UI
 */

const NetworkError = () => {
  const router = useRouter();

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
          Network Error
        </Typography>
      </Grid>
    );
  };

  const renderBodyText = () => {
    return (
      <Grid {...pageNotFoundStyles.bodyGridProps}>
        <Typography {...pageNotFoundStyles.bodyProps}>
          Seems like there is a problem with your internet, <br />
          try reconnecting and refresh the page to continue
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

  const renderBottomContent = () => {
    return (
      <Grid {...pageNotFoundStyles.sectionGridProps}>
        <Grid {...pageNotFoundStyles.mainContentGridProps}>
          {renderMainTitle()}
          {renderBodyText()}
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

NetworkError.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default NetworkError;

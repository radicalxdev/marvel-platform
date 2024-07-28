import { Box, Grid, Typography } from '@mui/material';

import MainAppLayout from '@/layouts/MainAppLayout';

import LargeLogo from '@/assets/svg/MenuLogo.svg';
import Networkerror from '@/assets/svg/NetworkError.svg';
import Star3 from '@/assets/svg/Star_2.svg';
import Star from '@/assets/svg/Star_3.svg';
import Star2 from '@/assets/svg/Star_4.svg';

import NetWorkErrorStyle from '@/styles/NetWorkErrorStyle';

/**
 * Renders the page for when the requested route is not found.
 *
 * @return {JSX.Element} The JSX element representing the page.
 */

const NetworkError = () => {
  const renderLogo = () => {
    return (
      <Grid {...NetWorkErrorStyle.LogoGridProps}>
        <Grid {...NetWorkErrorStyle.LogoImageGridProps}>
          <LargeLogo />
        </Grid>
        <Grid {...NetWorkErrorStyle.LogotitleGridProps}>
          <Typography {...NetWorkErrorStyle.LogotitleProps}>KAI.AI</Typography>
          <Typography {...NetWorkErrorStyle.LogosubtitleProps}>
            AI Teaching Assistant
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderMainTitle = () => {
    return (
      <Grid {...NetWorkErrorStyle.titleGridProps}>
        <Typography {...NetWorkErrorStyle.subtitleProps}>
          Network Error
        </Typography>
      </Grid>
    );
  };

  const renderBottomContent = () => {
    return (
      <Grid {...NetWorkErrorStyle.BottomGridprops}>
        <Typography {...NetWorkErrorStyle.bodyProps}>
          Seems like there is a problem with your internet, try
          <br />
          reconnecting and refresh the page to continue
        </Typography>
      </Grid>
    );
  };

  const renderNetworkError = () => {
    return (
      <Grid {...NetWorkErrorStyle.NetworkLogo}>
        <Networkerror />
      </Grid>
    );
  };

  const renderRadialBackground = () => {
    return (
      <>
        <Box {...NetWorkErrorStyle.radialBg1Props} />
        <Box {...NetWorkErrorStyle.radialBg2Props} />
        <Box {...NetWorkErrorStyle.radialBg3Props} />
      </>
    );
  };

  const renderIcons = () => {
    return (
      <>
        <Box {...NetWorkErrorStyle.star1Props}>
          <Star />
        </Box>
        <Box {...NetWorkErrorStyle.star2Props}>
          <Star2 />
        </Box>
        <Box {...NetWorkErrorStyle.star3Props}>
          <Star3 />
        </Box>
      </>
    );
  };
  return (
    <Grid {...NetWorkErrorStyle.mainGridProps}>
      {renderRadialBackground()}
      <Grid {...NetWorkErrorStyle.LogocontentGridProps}>{renderLogo()}</Grid>
      <Grid {...NetWorkErrorStyle.TopcontentGridProps}>
        {renderMainTitle()}
      </Grid>
      <Grid {...NetWorkErrorStyle.BottomcontentGridProps}>
        {renderBottomContent()}
      </Grid>
      <Grid {...NetWorkErrorStyle.LogocontentGridProps}>
        {renderNetworkError()}
      </Grid>
      <Grid {...NetWorkErrorStyle.IconcontentGridprops}>{renderIcons()}</Grid>
    </Grid>
  );
};

NetworkError.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default NetworkError;

import { useRouter } from 'next/router';
import { Grid, Typography, useTheme } from '@mui/material';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import IntroductionCard from '@/components/IntroductionCard';

import ImageURLs from '@/assets/urls';

import ROUTES from '@/constants/routes';

import styles from './styles';

/**
 * Generates the HeaderCard component with introduction and redeem button.
 *
 * @return {JSX.Element} The rendered HeaderCard component.
 */
const HeaderCard = () => {
  const router = useRouter();
  const theme = useTheme();

  const renderRedeemButton = () => {
    return (
      <Grid container item>
        <GradientOutlinedButton
          color="green"
          text="Redeem Rewards"
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          inverted
          clickHandler={() => router.push(`${ROUTES.REWARDS}/redeem`)}
          {...styles.secondaryButtonProps}
        />
      </Grid>
    );
  };

  const IntroCardProps = {
    title: (
      <>
        R<Typography {...styles.colorTextProps}>X</Typography> REWARDS
      </>
    ),
    description:
      '🎮 Quest victories = Awesome rewards! 🎉 Turn points into RadicalX coins 💰 and treat yourself to tech gifts, prepaid cards, and cool subscriptions! 🚀🎁',
    launchText: 'Taking off Oct 2023! 🚀',
    image: ImageURLs.RewardsBanner,
    imageAltText: 'Rewards Banner',
    minHeight: { laptop: '420px', desktop: '480px' },
    imgWidth: { laptop: '320px', desktop: '380px' },
    extraLeftGridProps: { px: 7 },
    extraTitleProps: {
      fontSize: {
        laptop: '56px',
        desktop: '76px',
        desktopMedium: '86px',
        desktopLarge: '96px',
      },
    },
    extraComponents: renderRedeemButton(),
  };

  return (
    <Grid {...styles.expeditionCardProps}>
      <IntroductionCard {...IntroCardProps} />
    </Grid>
  );
};

export default HeaderCard;

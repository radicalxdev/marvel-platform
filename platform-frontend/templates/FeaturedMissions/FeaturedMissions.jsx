import { Grid, Link, Typography, useTheme } from '@mui/material';

import MainAppLayout from '@/layouts/MainAppLayout';
import ListingsPage from '@/components/ListingsPage';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import AvatarIcon from '@/components/AvatarIcon';

import Ebay from '@/assets/svg/partners/Ebay.svg';
import EY from '@/assets/svg/partners/EY.svg';
import Google from '@/assets/svg/partners/Google.svg';
import Microsoft from '@/assets/svg/partners/Microsoft.svg';
import PayPal from '@/assets/svg/partners/PayPal.svg';
import Uber from '@/assets/svg/partners/Uber.svg';
import ImageURLs from '@/assets/urls';

import CHALLENGES from '@/constants/challenges';

import styles from './styles';

const DEFAULT_LEARNERS = [
  '64da849ec603b299c0fcd639',
  '64da8fb2cfdd0f000df65006',
  '64da94bbc603b299c0fce9a5',
];

const FeaturedMissions = (props) => {
  const {
    open,
    toggleOpen,
    handleContinueMission,
    enrolledChallenges,
    data,
    loading,
    error,
  } = props;

  const theme = useTheme();

  const renderLearnMore = () => {
    return (
      <Grid {...styles.learnMoreGridProps}>
        <Link href="#challenges-grid" sx={{ textDecoration: 'none' }}>
          <GradientOutlinedButton
            color="green"
            text="Get Started"
            bgcolor={theme.palette.Dark_Colors.Dark[1]}
            inverted
            {...styles.secondaryButtonProps}
          />
        </Link>
        <Grid {...styles.learnersDetailsGridProps}>
          <Grid {...styles.avatarIconsGroup}>
            {DEFAULT_LEARNERS?.map((avatar, index) => (
              <AvatarIcon avatarId={avatar} key={index} />
            ))}
          </Grid>
          <Grid {...styles.learnersGridProps}>
            <Grid item>
              <Typography {...styles.learnerNumbersProps}>120K +</Typography>
            </Grid>
            <Grid item>
              <Typography {...styles.otherLearnersProps}>
                Other Members
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const BlockQuestDialogProps = {
    handleClose: toggleOpen,
    open,
    singleButton: false,
    primaryButtonText: 'Continue Mission 🌟',
    secondaryButtonText: 'Cancel 🦋',
    primaryButtonClickHandler: handleContinueMission,
    secondaryButtonClickHandler: toggleOpen,
    contentText:
      'You have already enrolled in a similar mission and are currently blocked from accessing this one. 🚫',
    mainText: 'Oops! 🙁 It seems you can\u0027t access the current mission.',
    chipLabel: 'Already Registered',
    success: false,
    showScore: false,
    disableExit: false,
  };

  const ListingsCardProps = {
    toggleOpen,
    data,
    loading,
    error,
    enrolledChallenges: enrolledChallenges.data,
    challengeType: CHALLENGES.MISSION,
    isMissions: true,
  };

  const IntroCardProps = {
    title: 'Radical Missions',
    description: (
      <>
        Your tech roadmap to the stars! 🌟 With{' '}
        <Typography {...styles.colorTextProps}>ReX</Typography> , embark on
        curated paths tailored to supercharge your tech career.
      </>
    ),
    launchText: 'Click below to get started! 🚀',
    image: ImageURLs.FeaturedMissions,
    imageAltText: 'Featured Mission Banner',
    minHeight: { laptop: '500px', desktop: '600px', desktopMedium: '680px' },
    imgWidth: { laptop: '500px', desktop: '600px', desktopMedium: '680px' },
    extraTitleProps: {
      fontSize: {
        laptop: '64px',
        desktop: '78px',
        desktopMedium: '86px',
        desktopLarge: '96px',
      },
      width: '60%',
    },
    extraComponents: renderLearnMore(),
  };

  const Partners = [
    { id: 'microsoft', logo: Microsoft },
    { id: 'google', logo: Google },
    { id: 'ebay', logo: Ebay },
    { id: 'paypal', logo: PayPal },
    { id: 'ey', logo: EY },
    { id: 'uber', logo: Uber },
  ];

  return (
    <ListingsPage
      blockDialogProps={BlockQuestDialogProps}
      listingsCardProps={ListingsCardProps}
      introCardProps={IntroCardProps}
      partners={Partners}
    />
  );
};

FeaturedMissions.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default FeaturedMissions;

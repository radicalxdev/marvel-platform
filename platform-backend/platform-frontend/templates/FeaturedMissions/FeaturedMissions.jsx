import { Grid, Link, Typography, useTheme } from '@mui/material';

import AvatarIcon from '@/components/AvatarIcon';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import ListingsPage from '@/components/ListingsPage';
import MainAppLayout from '@/layouts/MainAppLayout';

import ImageURLs from '@/assets/urls';

import styles from './styles';

const DEFAULT_LEARNERS = [
  '64da849ec603b299c0fcd639',
  '64da8fb2cfdd0f000df65006',
  '64da94bbc603b299c0fce9a5',
];

const FeaturedMissions = (props) => {
  const { toggleOpen } = props;

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

  const ListingsCardProps = {
    toggleOpen,
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

  return (
    <ListingsPage
      listingsCardProps={ListingsCardProps}
      introCardProps={IntroCardProps}
    />
  );
};

FeaturedMissions.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default FeaturedMissions;

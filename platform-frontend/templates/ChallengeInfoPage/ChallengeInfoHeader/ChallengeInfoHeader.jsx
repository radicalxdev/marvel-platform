import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Button,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  Link,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { ArrowBack, Check } from '@mui/icons-material';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import AvatarIcon from '@/components/AvatarIcon';
import StatisticChip from '@/components/StatisticChip';
import Registration from './Registration';
import LearnMore from './LearnMore';

import { shimmerEffect, toBase64 } from '@/utils/MiscellaneousUtils';

import CoinsSvg from '@/assets/svg/coin.svg';
import DiamondSvg from '@/assets/svg/diamond.svg';
import UserSvg from '@/assets/svg/user.svg';

import ROUTES from '@/constants/routes';

import styles from './styles';

const ChallengeInfoHeader = (props) => {
  const {
    isPreEnroll,
    completed,
    currentLevel,
    nextLevel,
    timeUp,
    isActive,
    totalLevels,
    challengeDoc,
    challengeDetails,
  } = props;

  const [openLearnMore, setOpenLearnMore] = useState(false);

  const router = useRouter();
  const theme = useTheme();

  const {
    coverImageUrl,
    sponserLogo,
    logo,
    players,
    name,
    category,
    level,
    lastEnrolledPlayersAvatars,
    estimatedTime,
    prizePool,
    overview,
    entryFee,
  } = challengeDoc;

  const overviewRef = useRef(null);
  const [isOverviewTruncated, setIsOverviewTruncated] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);

  const challengePreRegistered =
    isPreEnroll && isActive && !completed && !timeUp;
  const challengeIsActive = isActive && !completed && !timeUp && !isPreEnroll;
  const challengedNotStarted = !isActive && !completed && !timeUp;

  useEffect(() => {
    const isTextTruncated = () =>
      setIsOverviewTruncated(
        overviewRef.current.scrollHeight > overviewRef.current.clientHeight
      );

    window.addEventListener('resize', isTextTruncated);

    isTextTruncated();

    return () => window.removeEventListener('resize', isTextTruncated);
  }, []);

  const handleTooltipClose = () => setOpenTooltip(false);
  const handleTooltipOpen = () => setOpenTooltip(true);
  const toggleOpenRegistration = () => setOpenRegistration((prev) => !prev);

  const toggleOpenLearnMore = () => setOpenLearnMore((prev) => !prev);

  const handleGoBack = () => {
    return router.push(ROUTES.HOME);
  };

  const renderChallengeTags = () => {
    return (
      <Grid {...styles.chipGridProps}>
        {category && <Chip label={category} {...styles.chipProps} />}
        {level && <Chip label={level} {...styles.chipProps} />}
        {estimatedTime && <Chip label={estimatedTime} {...styles.chipProps} />}
      </Grid>
    );
  };

  const renderActionButtons = () => {
    return (
      <Grid {...styles.bottomCenterGridProps}>
        {challengedNotStarted && (
          <GradientOutlinedButton
            bgcolor={theme.palette.Dark_Colors.Dark[1]}
            inverted
            text={isPreEnroll ? 'Pre-Register' : 'Register Now'}
            clickHandler={toggleOpenRegistration}
            textColor={theme.palette.Background.green}
            {...styles.enrollButtonProps(isActive)}
          />
        )}
        {challengeIsActive && (
          <Link
            href={`#level-${currentLevel || nextLevel}`}
            sx={{ textDecoration: 'none' }}
          >
            <Button {...styles.continueButtonProps}>Continue Mission</Button>
          </Link>
        )}
        {challengePreRegistered && (
          <Button endIcon={<Check />} {...styles.registeredButtonProps}>
            Registered
          </Button>
        )}
        {timeUp && <Button {...styles.finishedButtonProps}>Finished</Button>}
        {completed && !timeUp && (
          <Button {...styles.completedButtonProps}>Completed</Button>
        )}
        <GradientOutlinedButton
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          text="Learn More"
          clickHandler={toggleOpenLearnMore}
          {...styles.learnMoreButtonProps}
        />
      </Grid>
    );
  };

  const renderTopLayer = () => {
    return (
      <Grid {...styles.topLayerGridProps}>
        <GradientOutlinedButton
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          clickHandler={handleGoBack}
          icon={
            <ArrowBack sx={{ color: theme.palette.Background.gradient.grey }} />
          }
          {...styles.backButtonProps}
        />
        <Grid {...styles.statsContainerGridProps}>
          <Grid {...styles.statsGridProps}>
            <StatisticChip
              color="grey"
              stat={`${players.total} PLAYERS`}
              icon={<UserSvg />}
              {...styles.statisticChipProps}
            />
          </Grid>
          <Grid {...styles.statsGridProps}>
            <StatisticChip
              color="yellow"
              stat={`${prizePool} IN PRIZES`}
              icon={<CoinsSvg />}
              {...styles.statisticChipProps}
            />
          </Grid>
          <Grid {...styles.statsGridProps}>
            <StatisticChip
              color="blue"
              stat={`${entryFee} ENTRY FEE`}
              icon={<DiamondSvg />}
              {...styles.statisticChipProps}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderLeftGrid = () => {
    return (
      <Grid {...styles.otherLearnersGridProps}>
        <Grid {...styles.imageGridProps}>
          <Image
            src={coverImageUrl}
            layout="fill"
            objectFit="cover"
            alt="cover image"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmerEffect('100%', '100%')
            )}`}
          />
        </Grid>
        <Grid {...styles.learnersDetailsGridProps}>
          <Grid {...styles.avatarIconsGroup}>
            {[
              ...lastEnrolledPlayersAvatars,
              ...Array(3 - (lastEnrolledPlayersAvatars?.length || 0)).fill(
                null
              ),
            ].map((avatar, index) => (
              <AvatarIcon avatarId={avatar} key={index} />
            ))}
          </Grid>
          <Grid {...styles.learnersGridProps}>
            <Grid item>
              <Typography {...styles.learnerNumbersProps}>
                {players?.total} +
              </Typography>
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

  const renderCenterGrid = () => {
    return (
      <Grid {...styles.centerGridProps}>
        <Grid {...styles.topCenterGridProps}>
          <Grid container item justifyContent="flex-start" alignItems="center">
            <Typography {...styles.titleProps}>{name}</Typography>
          </Grid>
          {renderChallengeTags()}
          <Grid {...styles.overviewGridProps}>
            <Typography ref={overviewRef} {...styles.overviewProps}>
              {overview}
            </Typography>
            {isOverviewTruncated && (
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                  onClose={handleTooltipClose}
                  open={openTooltip}
                  title={overview}
                  {...styles.seeMoreTooltipProps}
                >
                  <Typography
                    onClick={handleTooltipOpen}
                    {...styles.seeMoreProps}
                  >
                    See More
                  </Typography>
                </Tooltip>
              </ClickAwayListener>
            )}
          </Grid>
        </Grid>
        {renderActionButtons()}
      </Grid>
    );
  };

  const renderRightGrid = () => {
    return (
      <Grid {...styles.rightGridProps}>
        <Grid {...styles.rightTopGridProps}>
          <Grid {...styles.challengeInfoTitleGridProps}>
            <Typography {...styles.challengeInfoTitleProps}>
              <span {...styles.boldTitleProps}>Certificate</span>
              Upon Completion
            </Typography>
            <Divider {...styles.dividerProps} />
          </Grid>
          <Grid {...styles.challengeInfoTitleGridProps}>
            <Typography {...styles.challengeInfoTitleProps}>
              <span {...styles.boldTitleProps}>Achievements</span>
              Included
            </Typography>
            <Divider {...styles.dividerProps} />
          </Grid>
          <Grid {...styles.challengeInfoTitleGridProps}>
            <Typography
              {...styles.lessonsInfoProps}
            >{`${totalLevels} tasks`}</Typography>
            <Divider {...styles.dividerProps} />
          </Grid>
        </Grid>
        <Grid {...styles.rightBottomGridProps}>
          <Grid item>
            <Typography {...styles.sponseredByProps}>
              BROUGHT TO YOU BY
            </Typography>
          </Grid>
          <Grid {...styles.sponserGridProps}>
            <Image src={sponserLogo || logo} {...styles.logoProps} />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderTopLayer()}
      {renderLeftGrid()}
      {renderCenterGrid()}
      {renderRightGrid()}
      <LearnMore
        open={openLearnMore}
        toggleOpen={toggleOpenLearnMore}
        description={challengeDetails?.[0]?.description}
      />
      <Registration
        open={openRegistration}
        toggleOpen={toggleOpenRegistration}
        challengeDoc={challengeDoc}
        completed={completed}
        isPreEnroll={isPreEnroll}
        isActive={isActive}
        challengedNotStarted={challengedNotStarted}
      />
    </Grid>
  );
};

export default ChallengeInfoHeader;

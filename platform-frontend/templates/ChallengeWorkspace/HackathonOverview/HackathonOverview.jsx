import { useEffect, useRef, useState } from 'react';
import { Grid, Typography } from '@mui/material';

import CountDownTimer from '@/components/CountDownTimer';
import StatisticChip from '@/components/StatisticChip';

import CoinsSvg from '@/assets/svg/coin.svg';
import UserGroupSvg from '@/assets/svg/userGroup.svg';

import styles from './styles';

const HackathonOverview = (props) => {
  const { challengeDoc } = props;

  const workspaceRef = useRef(null);

  const { prizePool, players, resourceLink } = challengeDoc;

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const aspectRatio = 16 / 10;
  const containerHeight = dimensions.width / aspectRatio;

  useEffect(() => {
    const handleResize = () => {
      if (workspaceRef.current)
        setDimensions({
          width: workspaceRef.current.offsetWidth,
          height: workspaceRef.current.offsetHeight,
        });
    };

    if (workspaceRef.current) {
      setDimensions({
        width: workspaceRef.current.offsetWidth,
        height: workspaceRef.current.offsetHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [workspaceRef]);

  const renderTitle = () => (
    <Typography {...styles.jackpotTitleProps}>
      Hackathon Jackpot ⏳💸
    </Typography>
  );

  const renderStatistics = () => {
    return (
      <Grid {...styles.statisticsGrid}>
        <StatisticChip
          color="yellow"
          statlabel="Prize Pool"
          stat={prizePool}
          icon={<CoinsSvg />}
          extraChipGridProps={styles.statisticChipPropsConfig}
        />
        <StatisticChip
          color="green"
          statlabel="Players"
          stat={`${players.total}/${players.capacity}`}
          icon={<UserGroupSvg />}
          extraChipGridProps={styles.statisticChipPropsConfig}
        />
      </Grid>
    );
  };

  const renderCountDownTimer = () => {
    return (
      <CountDownTimer
        challengeDoc={challengeDoc}
        chipContainerProps={styles.chipContainerProps}
        timerUnitContainerProps={styles.timerUnitContainerProps}
        timerContainerProps={styles.timerContainerProps}
        isPaymentPage
        isHackathonPage
        color="red"
      />
    );
  };

  const renderPitchSlides = () => {
    return (
      <Grid {...styles.pitchEmbedGridProps(containerHeight)}>
        <iframe
          title="Pitch Embed"
          src={resourceLink}
          allow="fullscreen"
          allowFullScreen
          width="100%"
          height="100%"
          style={{ border: 'none', borderRadius: '10px' }}
        />
      </Grid>
    );
  };

  const renderJackpot = () => {
    return (
      <Grid {...styles.jackpotGridProps}>
        {renderTitle()}
        {renderStatistics()}
        {renderCountDownTimer()}
      </Grid>
    );
  };

  return (
    <Grid ref={workspaceRef} {...styles.overviewGridProps}>
      {renderPitchSlides()}
      {renderJackpot()}
    </Grid>
  );
};

export default HackathonOverview;

import { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';

import useTimer from '@/hooks/useTimer';

import AssessmentStart from '@/assets/images/AssessmentStart.png';
import AvatarImage from '@/assets/images/ReXWalking.png';
import LoaderArt1 from '@/assets/svg/ArtWork1.svg';

import LoaderArt2 from '@/assets/svg/ArtWork2.svg';

import { ASSESSMENT_PAGES } from '@/constants/assessment';

import styles from './styles';

import { convertToUnixTimestamp } from '@/utils/FirebaseUtils';

const AssessmentLoader = (props) => {
  const { handleTransition } = props;
  const [startTimer, setStartTimer] = useState(false);
  const dateNow = Date.now();

  const setEndTime = () => {
    return moment(convertToUnixTimestamp(dateNow))
      .add(4.01, 'second')
      .valueOf();
  };

  const { seconds } = useTimer(
    setEndTime(),
    startTimer,
    () => {},
    convertToUnixTimestamp(dateNow)
  );

  if (parseInt(seconds[1], 10) === 0 && startTimer) {
    handleTransition(ASSESSMENT_PAGES.QUESTIONS);
  }

  useEffect(() => {
    setStartTimer(true);
  });

  const setCount = () => {
    if (parseInt(seconds[1], 10) > 3) {
      return 3;
    }
    return seconds[1];
  };

  const renderLoaderArt1 = () => {
    return (
      <Grid {...styles.art1GridProps}>
        <LoaderArt1 />
      </Grid>
    );
  };

  const renderLoaderArt2 = () => {
    return (
      <Grid {...styles.art2GridProps}>
        <LoaderArt2 />
      </Grid>
    );
  };

  const renderReXImage = () => {
    return (
      <Grid {...styles.avatarGridProps}>
        <Image {...styles.avatarImgProps} src={AvatarImage} />
      </Grid>
    );
  };

  const renderTimer = () => {
    return (
      <Grid {...styles.timerGridProps}>
        <Grid {...styles.timerTitleGridProps}>Starting in...</Grid>
        <Grid {...styles.loaderGridProps}>
          <Image src={AssessmentStart} {...styles.loaderImageProps} />
          <Grid {...styles.countdownGridProps}>
            <Typography {...styles.countdownProps}>{setCount()}</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderLoaderArt1()}
      {renderLoaderArt2()}
      {renderReXImage()}
      {renderTimer()}
    </Grid>
  );
};

export default AssessmentLoader;

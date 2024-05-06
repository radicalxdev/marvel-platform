import Image from 'next/image';
import { Box, Grid, StepContent, Typography } from '@mui/material';

import LockedIcon from '@/assets/svg/LockedIcon.svg';

import styles from './styles';

const ChallengeContent = (props) => {
  const { active, start, step, complete, challengeActive, details } = props;

  const { titleIcon, description } = details;

  const startFirstLevel = step === 1 && !active && !complete && challengeActive;
  const isActive = active || start || startFirstLevel;

  const renderLeftSide = () => {
    return (
      <Grid {...styles.leftSideGridProps}>
        <Grid {...styles.dotIconGridProps}>
          <Box {...styles.iconProps(isActive || complete)} />
        </Grid>
        <Grid {...styles.titleGridProps}>
          <Grid item>
            <Typography {...styles.descriptionProps}>{description}</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderRightSide = () => {
    return (
      <Grid {...styles.rightSideGridProps}>
        <Grid {...styles.iconGridProps}>
          <Image
            src={titleIcon}
            layout="fill"
            objectFit="contain"
            alt={titleIcon}
            style={{ width: '100%', height: '100%' }}
          />
        </Grid>
        <Grid {...styles.lockedGridProps}>
          {!isActive && !complete && <LockedIcon />}
        </Grid>
      </Grid>
    );
  };

  return (
    <StepContent {...styles.stepProps(complete, isActive)}>
      <Grid {...styles.contentContainerGridProps(isActive)}>
        <Grid {...styles.contentGridProps}>
          {renderLeftSide()}
          {renderRightSide()}
        </Grid>
      </Grid>
    </StepContent>
  );
};

export default ChallengeContent;

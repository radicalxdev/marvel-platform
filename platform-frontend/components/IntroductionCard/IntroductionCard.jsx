import Image from 'next/image';
import { Grid, Typography } from '@mui/material';

import styles from './styles';

const IntroductionCard = (props) => {
  const {
    title,
    description,
    launchText,
    image,
    imageAltText,
    minHeight,
    imgWidth,
    extraComponents,
    extraMainGridProps,
    extraLeftGridProps,
    extraTitleProps,
  } = props;

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.introTitle(extraTitleProps)}>{title}</Typography>
      </Grid>
    );
  };

  const renderDescription = () => {
    return (
      <Grid laptop={5} desktop={4}>
        <Typography {...styles.introDescription}>{description}</Typography>
        <Typography mt={3} {...styles.introDescription}>
          {launchText}
        </Typography>
      </Grid>
    );
  };

  const renderImage = () => {
    return (
      <Grid
        minHeight={minHeight}
        width={imgWidth}
        {...styles.rightSideGridProps}
      >
        <Image src={image} layout="fill" alt={imageAltText} />
      </Grid>
    );
  };

  return (
    <Grid {...styles.introGridProps(minHeight, imgWidth, extraMainGridProps)}>
      <Grid {...styles.leftSideGridProps(extraLeftGridProps)}>
        {renderTitle()}
        {renderDescription()}
        {extraComponents}
      </Grid>
      {renderImage()}
    </Grid>
  );
};

export default IntroductionCard;

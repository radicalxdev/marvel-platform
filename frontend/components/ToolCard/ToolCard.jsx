import { Card, Chip, Grid, Typography } from '@mui/material';

import { useRouter } from 'next/router';

import styles from './styles';

/**
 * Returns a Tool Card component with an image and a chip displaying the amount of coins.
 *
 * @return {JSX.Element} The Tool Card component.
 */
const ToolCard = (props) => {
  const {
    maskedToolUrl,
    backgroundImgURL,
    name,
    description,
    label = 'undefined',
    variant = 'outlined',
  } = props;

  const router = useRouter();

  const handleRoute = () => {
    return router.push(`/${maskedToolUrl}`);
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Typography {...styles.titleProps}>{name}</Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
      </Grid>
    );
  };

  const renderLabel = () => {
    return <Chip label={label} variant={variant} {...styles.labelProps} />;
  };

  return (
    <Grid onClick={handleRoute} {...styles.mainGridProps}>
      <Card {...styles.cardProps}>
        <Grid {...styles.imageProps(backgroundImgURL)} />
        <Grid {...styles.toolDetailsGridProps}>
          {renderTitle()}
          {renderLabel()}
        </Grid>
      </Card>
    </Grid>
  );
};

export default ToolCard;

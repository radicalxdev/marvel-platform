import { Button, Card, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

import ToolImage from '@/assets/images/BookImage.png'; // Replace this with a default image if needed

import styles from './styles';

/**
 * Returns an Output History Card component with an image and a chip displaying the amount of coins.
 *
 * @return {JSX.Element} The Output History Card component.
 */
const OutputHistoryCard = (props) => {
  const { title, content, creationDate, logo, backgroundImgURL } = props; // Include logo and backgroundImgURL

  const router = useRouter();

  const renderImage = () => {
    return (
      <Grid {...styles.imageGridProps(backgroundImgURL)}>
        <Image src={logo || ToolImage} alt="kai logo" {...styles.imageProps} />
      </Grid>
    );
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Typography {...styles.dateProps}>
          {new Date(creationDate.seconds * 1000).toLocaleDateString()}{' '}
          {/* Convert Firestore timestamp to Date */}
        </Typography>
        <Typography {...styles.titleProps}>{title}</Typography>
        <Typography {...styles.descriptionProps}>{content}</Typography>
        <Button {...styles.previewButtonProps}>Preview</Button>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Card {...styles.cardProps}>
        <Grid {...styles.toolDetailsGridProps}>
          {renderImage()}
          {renderTitle()}
        </Grid>
      </Card>
    </Grid>
  );
};

export default OutputHistoryCard;

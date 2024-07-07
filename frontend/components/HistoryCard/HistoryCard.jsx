import { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import Image from 'next/image';

import HistoryPreview from '../HistoryPreview';

import styles from './styles';

/**
 * Component for rendering a history card with an image, details, and a preview button.
 *
 * @param {Object} props - Object containing the following properties:
 *  @param {string} props.backgroundImgURL - URL of the background image for the card
 *  @param {string} props.title - Title of the history card
 *  @param {string} props.logo - URL of the logo image for the history card
 *  @param {string} props.description - Description of the history card
 *  @param {string} props.createdAt - Creation date of the history card
 *  @param {string} props.category - Category of the history card
 *  @param {Array} props.questions - Array of questions related to the history card
 *
 * @return {JSX.Element} Rendered history card component
 */
const HistoryCard = (props) => {
  const {
    backgroundImgURL,
    title,
    logo,
    description,
    createdAt,
    toolId,
    questions,
    onSortByTitle,
    onSortByDate,
    onSortByDescription,
    onSortByToolId,
  } = props;
  const [openPreview, setOpenPreview] = useState(false);

  /**
   * Function to toggle the preview state of the history card.
   */
  const togglePreview = () => {
    setOpenPreview(!openPreview);
  };

  /**
   * Function to render the logo image in the history card.
   *
   * @return {JSX.Element} Rendered logo image component
   */
  const renderImage = () => {
    return (
      <Grid {...styles.imageGridProps}>
        <Image
          src={logo}
          alt="output history logo"
          onClick={onSortByToolId}
          {...styles.imageProps}
        />
      </Grid>
    );
  };

  /**
   * Function to render the details of the history card, including title, description, and a preview button.
   *
   * @return {JSX.Element} Rendered card details component
   */
  const renderCardDetails = () => {
    return (
      <Grid>
        <Typography
          component="span"
          onClick={onSortByDate}
          {...styles.dateProps}
        >
          {createdAt}
        </Typography>
        <Typography
          component="span"
          onClick={onSortByTitle}
          {...styles.titleProps}
        >
          {title}
        </Typography>
        <Typography
          component="span"
          onClick={onSortByDescription}
          {...styles.descriptionProps}
        >
          {description}
        </Typography>
        <Button {...styles.previewButtonProps} onClick={togglePreview}>
          Preview
        </Button>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Card {...styles.historyCardProps}>
        <CardMedia {...styles.cardProps(backgroundImgURL)}>
          {renderImage()}
        </CardMedia>
        <CardContent {...styles.cardContentProps}>
          {renderCardDetails()}
        </CardContent>
      </Card>
      <HistoryPreview
        open={openPreview}
        togglePreview={togglePreview}
        createdAt={createdAt}
        title={title}
        description={description}
        toolId={toolId}
        questions={questions}
      />
    </Grid>
  );
};

export default HistoryCard;

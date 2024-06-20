import { useState } from 'react';

import { Button, Card, Grid, Typography } from '@mui/material';

import Image from 'next/image';

import HistoryDrawer from '../ToolHistoryDrawer/ToolHistoryDrawer';

import styles from './styles';

import { truncateString } from '@/utils/MiscellaneousUtils';

/**
 * Returns a Tool History Card component with the image and the details of the previous tools created.
 * @param {object} props - The properties of the component.
 * @param {string} props.backgroundImgURL - The URL of the background image.
 * @param {string} props.title - The title of the tool.
 * @param {string} props.description - The description of the tool.
 * @param {string} props.createdDate - The date the tool was created.
 * @param {string} props.logo - The URL of the logo.
 * @return {JSX.Element} The Tool History Card component.
 */
const ToolHistoryCard = (props) => {
  const { backgroundImgURL, title, logo, description, createdDate } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const renderImage = () => {
    return (
      <Grid {...styles.imageGridProps}>
        <Image src={logo} alt="kai logo" {...styles.imageProps} />
      </Grid>
    );
  };

  const renderDetails = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Typography {...styles.dateProps}>{createdDate}</Typography>
        <Typography {...styles.titleProps}>
          {truncateString(title, 30)}
        </Typography>
        <Typography {...styles.descriptionProps}>
          {truncateString(description, 50)}
        </Typography>
        <Button {...styles.previewButtonProps} onClick={toggleDrawer}>
          Preview
        </Button>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Grid {...styles.historyCardProps}>
        <Card {...styles.cardProps(backgroundImgURL)}>{renderImage()}</Card>
        <Grid {...styles.toolDetailsGridProps}>{renderDetails()}</Grid>
      </Grid>
      <HistoryDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        createdDate={createdDate}
        title={title}
        description={description}
      />
    </Grid>
  );
};

export default ToolHistoryCard;

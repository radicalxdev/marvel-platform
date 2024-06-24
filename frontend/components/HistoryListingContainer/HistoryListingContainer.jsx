import { Grid, Typography } from '@mui/material';

import HistoryCard from '../HistoryCard';

import styles from './styles';

/**
 * Render HistoryListingContainer with HistoryCards
 *
 * @param {object} props - The properties of the component.
 * @param {object[]} props.data - The array of data items to render.
 * @param {string} props.category - The category of the component.
 * @return {JSX.Element} The rendered HistoryListingContainer.
 */
const HistoryListingContainer = ({ data, category }) => {
  const renderTitle = () => (
    <Grid {...styles.headerGridProps}>
      <Typography {...styles.categoryTitleProps}>
        {category} {data && `(${data?.length})`}
      </Typography>
    </Grid>
  );

  const renderCards = () => (
    <Grid {...styles.containerGridProps}>
      <Grid {...styles.innerListGridProps}>
        {data.map((item, index) => (
          <HistoryCard
            key={index}
            title={item.title}
            description={item.description}
            createdDate={item.createdDate}
            backgroundImgURL={item.backgroundImgURL}
            logo={item.logo}
          />
        ))}
      </Grid>
    </Grid>
  );

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {renderCards()}
    </Grid>
  );
};

export default HistoryListingContainer;

import React from 'react';

import { Grid, Typography } from '@mui/material';

import HistoryToolCard, { HistoryToolCardSkeleton } from '../HistoryToolCard';

import styles from './styles';

import { getToolCardData } from '@/utils/MiscellaneousUtils';

const DEFAULT_HISTORY = new Array(4)
  .fill()
  .map((_, index) => ({ id: index + 1 }));

/**
 * Renders a container displaying a list of historical tool cards,
 * including title, cards, and loader based on data loading state.
 *
 * @component
 * @param {Object} props - React props
 * @param {Array} props.data - Array of historical tool data
 * @param {string} props.category - Category title for the tool list
 * @param {boolean} props.loading - Loading state indicator
 * @returns {JSX.Element} Rendered history tool listing container
 */
const HistoryToolListingContainer = (props) => {
  const { data, loading, category } = props;

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
        {data.map((item, index) => {
          const {
            title,
            backgroundImgURL,
            logo,
            multipleChoiceList,
            flashCards,
          } = getToolCardData(item);

          return (
            <HistoryToolCard
              key={index}
              title={title}
              description={item.description}
              createdDate={item.createdDate}
              backgroundImgURL={backgroundImgURL}
              logo={logo}
              multipleChoiceList={multipleChoiceList}
              flashCards={flashCards}
            />
          );
        })}
      </Grid>
    </Grid>
  );

  const renderLoader = () => (
    <Grid {...styles.containerGridProps}>
      <Grid {...styles.innerListGridProps}>
        {DEFAULT_HISTORY?.map((tool) => (
          <HistoryToolCardSkeleton key={tool.id} />
        ))}
      </Grid>
    </Grid>
  );

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {loading ? renderLoader() : renderCards()}
    </Grid>
  );
};

export default HistoryToolListingContainer;

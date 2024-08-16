import { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import { ToolCardSkeleton } from '../ToolCard';
import ToolHistoryCard from '../ToolHistoryCard';

import ToolOutputHistoryDrawer from '../ToolOutputHistoryDrawer';

import styles from './styles';

const DEFAULT_HISTORY = new Array(4)
  .fill()
  .map((_, index) => ({ id: index + 1 }));

/**
 * Renders the ToolHistoryListingContainer component, which displays a list of tool cards or skeleton loaders based on loading state.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.data - The array of tool data to display.
 * @param {boolean} props.loading - The loading state indicating whether data is being fetched.
 * @param {string} props.category - The category name to display as the title.
 * @returns {JSX.Element} The rendered ToolHistoryListingContainer component.
 */
const ToolHistoryListingContainer = (props) => {
  const { data, loading, category } = props;

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  const handleOpenSidebar = (cardData) => {
    setSelectedCardData(cardData);
    toggleDrawer(true);
  };

  if (data?.length === 0) return null;

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
        {Array.isArray(data) &&
          data?.map((item) => (
            <ToolHistoryCard
              key={item.id}
              onOpen={handleOpenSidebar}
              data={item}
            />
          ))}
      </Grid>
    </Grid>
  );

  const renderLoader = () => (
    <Grid {...styles.containerGridProps}>
      <Grid {...styles.innerListGridProps}>
        {DEFAULT_HISTORY.map((tool) => (
          <ToolCardSkeleton key={tool.id} />
        ))}
      </Grid>
    </Grid>
  );

  return (
    <Grid {...styles.mainGridProps}>
      {category && renderTitle()}
      {loading ? renderLoader() : renderCards()}
      <ToolOutputHistoryDrawer
        isOpen={openDrawer}
        onClose={toggleDrawer}
        data={selectedCardData}
      />
    </Grid>
  );
};

export default ToolHistoryListingContainer;

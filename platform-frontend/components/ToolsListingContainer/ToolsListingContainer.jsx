import { Grid, Typography } from '@mui/material';

// import ToolCard from '../ToolCard';

import styles from './styles';

/**
 * Renders the Tools Listings component.
 *
 * @param {object} props - The props object containing data and the category.
 * @param {object} props.data - The data to be rendered.
 * @param {object} props.category - The category of the tools.
 * @return {JSX.Element} The rendered Tools Listings component.
 */
const ToolsListingContainer = (props) => {
  const { data, category } = props;

  const renderTitle = () => {
    return (
      <Grid {...styles.headerGridProps}>
        <Typography {...styles.categoryTitleProps}>{category}</Typography>
      </Grid>
    );
  };

  const renderCards = () => {
    return (
      <Grid {...styles.containerGridProps}>
        {data?.map((tool) => (
          // <RewardCard key={quest.id} image={quest.image} coins={quest.coins} />
          <Grid container item mobileSmall={3} key={tool?.id}>
            {tool?.name}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {renderCards()}
    </Grid>
  );
};

export default ToolsListingContainer;

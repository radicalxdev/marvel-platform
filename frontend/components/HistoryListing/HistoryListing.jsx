import { Grid } from '@mui/material';

import HistoryCard from '../HistoryCard';

/**
 * Component for rendering a listing of history cards in a grid layout.
 *
 * @param {Object} props - Object containing the following properties:
 *  @param {Array} props.data - Array of data objects for each history card
 *
 * @return {JSX.Element} Rendered history listing component
 */
const HistoryListing = (props) => {
  const { data } = props;

  return (
    <Grid container spacing={3}>
      {data.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <HistoryCard
            title={item.title}
            description={item.description}
            createdDate={item.createdDate}
            backgroundImgURL={item.backgroundImgURL}
            logo={item.logo}
            toolId={item.toolId}
            questions={item.questions}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HistoryListing;

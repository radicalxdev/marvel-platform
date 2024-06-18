import { Grid } from '@mui/material';

import HistoryCard from '../HistoryCard';

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
            category={item.category}
            questions={item.questions}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HistoryListing;

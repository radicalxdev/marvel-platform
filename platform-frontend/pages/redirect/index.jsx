import { CircularProgress, Grid } from '@mui/material';

import AuthLayout from '@/layouts/AuthLayout';

import sharedStyles from '@/styles/shared/sharedStyles';

const Redirect = () => {
  return (
    <Grid {...sharedStyles.secondaryLoaderGridProps}>
      <CircularProgress color="secondary" size={50} />
    </Grid>
  );
};

Redirect.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Redirect;

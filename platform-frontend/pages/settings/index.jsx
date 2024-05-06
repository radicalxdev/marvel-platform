import { Grid } from '@mui/material';

import Settings from '@/templates/Settings';
import MainAppLayout from '@/layouts/MainAppLayout';

import sharedStyles from '@/styles/shared/sharedStyles';

const SettingsPage = () => {
  return (
    <Grid {...sharedStyles.commonMainGridProps}>
      <Settings />
    </Grid>
  );
};

SettingsPage.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default SettingsPage;

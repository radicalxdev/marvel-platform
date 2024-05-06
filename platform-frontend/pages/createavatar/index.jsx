import { useState } from 'react';
import { CircularProgress, Grid } from '@mui/material';

import AuthLayout from '@/layouts/AuthLayout';
import CreateAvatar from '@/templates/CreateAvatar';

import createAvatarStyle from '@/styles/createAvatarStyle';

const AvatarCreatorPage = () => {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const renderLoader = () => {
    return (
      <Grid {...createAvatarStyle.loaderGridProps}>
        <CircularProgress color="secondary" size={50} />
      </Grid>
    );
  };

  if (isUploadingAvatar) return renderLoader();

  return <CreateAvatar setIsUploadingAvatar={setIsUploadingAvatar} />;
};

AvatarCreatorPage.getLayout = function getLayout(page) {
  return <AuthLayout isAuthScreen>{page}</AuthLayout>;
};

export default AvatarCreatorPage;

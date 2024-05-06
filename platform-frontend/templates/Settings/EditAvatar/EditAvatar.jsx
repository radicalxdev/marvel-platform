import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import Image from 'next/image';
import {
  Avatar,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { AvatarCreator } from '@readyplayerme/rpm-react-sdk';
import { auth, firestore } from '@/redux/store';

import { AuthContext } from '@/providers/GlobalProvider';

import BackDropModal from '@/components/BackDropModal';
import { setUserData } from '@/redux/slices/userSlice';

import { amplitudeTracker } from '@/utils/IntegrationUtils';
import {
  getRandomAvatarColour,
  getUserAvatarImage,
} from '@/utils/MiscellaneousUtils';
import updateUserProfile from '@/services/users/updateUserProfile';

import ALERT_COLORS from '@/constants/notification';
import PencilIcon from '@/assets/svg/Pencil.svg';

import styles from './styles';

const EditAvatar = () => {
  const {
    query: { updateAvatar },
  } = useRouter();
  const dispatch = useDispatch();

  const { data: userData } = useSelector((state) => state.user);

  const [openModal, setOpenModal] = useState(updateAvatar);
  const [uploadingAvatar, setIsUploadingAvatar] = useState(false);

  const { handleOpenSnackBar } = useContext(AuthContext);

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    const userQuery = query(
      collection(firestore, 'users'),
      where('id', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(userQuery, async (userDoc) => {
      dispatch(setUserData(userDoc.docs[0].data()));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleOnUserSet = async (avatarUrl) => {
    // Get the avatar ID from the exported url
    const avatarId = avatarUrl.split('/').pop().split('.').shift();

    try {
      setIsUploadingAvatar(true);
      await updateUserProfile({ avatarId });
      handleOpenSnackBar(ALERT_COLORS.SUCCESS, 'Successfully updated avatar');
      amplitudeTracker('Profile_Updated', {
        name: userData?.fullName,
        id: userData?.uid,
        emailUpdated: false,
        fieldUpdated: 'Avatar',
      });
    } catch (err) {
      handleOpenSnackBar(ALERT_COLORS.ERROR, err.message);
    } finally {
      setIsUploadingAvatar(false);
      toggleModal();
    }
  };

  const renderAvatar = () => {
    return (
      <Grid {...styles.avatarGridProps}>
        <Avatar {...styles.avatarProps(getRandomAvatarColour())}>
          <Image
            src={getUserAvatarImage(userData?.avatarId)}
            {...styles.avatarImageProps}
          />
        </Avatar>
        <IconButton onClick={toggleModal} {...styles.editButtonProps}>
          <PencilIcon />
        </IconButton>
      </Grid>
    );
  };

  const renderContent = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Grid item>
          <Typography {...styles.contentProps}>
            Help your teammates spot you faster in RadicalX. Need a change?
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderLoader = () => {
    return <CircularProgress color="secondary" size={50} />;
  };

  const renderStudio = () => {
    return (
      <AvatarCreator
        onAvatarExported={(url) => handleOnUserSet(url, true)}
        {...styles.creatorConfig}
      />
    );
  };

  const renderAvatarStudio = () => {
    return (
      <BackDropModal
        closeOnClick
        open={openModal}
        handleClose={toggleModal}
        level={1}
      >
        <Grid {...styles.studioGridProps}>
          {uploadingAvatar ? renderLoader() : renderStudio()}
        </Grid>
      </BackDropModal>
    );
  };

  return (
    <>
      {renderAvatar()}
      {renderContent()}
      {renderAvatarStudio()}
    </>
  );
};

export default EditAvatar;

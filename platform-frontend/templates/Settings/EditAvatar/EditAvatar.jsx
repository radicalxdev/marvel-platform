import { useContext, useEffect, useState } from 'react';

import {
  Avatar,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { AvatarCreator } from '@readyplayerme/rpm-react-sdk';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import BackDropModal from '@/components/BackDropModal';

import PencilIcon from '@/assets/svg/Pencil.svg';

import ALERT_COLORS from '@/constants/notification';

import styles from './styles';

import { AuthContext } from '@/providers/GlobalProvider';
import { setUserData } from '@/redux/slices/userSlice';
import { auth, firestore } from '@/redux/store';
import updateUserProfile from '@/services/users/updateUserProfile';
import { amplitudeTracker } from '@/utils/IntegrationUtils';
import {
  getRandomAvatarColour,
  getUserAvatarImage,
} from '@/utils/MiscellaneousUtils';

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

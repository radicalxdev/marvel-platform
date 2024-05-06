import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarCreator } from '@readyplayerme/rpm-react-sdk';
import { Grid, Typography, useTheme } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import { auth, firestore } from '@/redux/store';
import { setLoading } from '@/redux/slices/authSlice';
import fetchUserData from '@/redux/thunks/user';
import updateUserProfile from '@/services/users/updateUserProfile';

import { AuthContext } from '@/providers/GlobalProvider';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import PrimaryDialog from '@/components/PrimaryDialog';

import ROUTES from '@/constants/routes';
import ALERT_COLORS from '@/constants/notification';
import DEFAULT_AVATARS from '@/mock/defaultAvatars';

import styles from './styles';

/**
 * Create and render an avatar selection interface, allowing the user to choose an avatar from a set of default options or create their own avatar.
 * Handles the process of setting the chosen avatar for the user profile and updating the UI accordingly.
 *
 * @param {Object} props - The props object.
 *  @param {function} props.setIsUploadingAvatar - The function to set the state of the isUploadingAvatar prop.
 *
 * @return {React.JSXElement} The CreateAvatar component.
 */
const CreateAvatar = (props) => {
  const { setIsUploadingAvatar } = props;

  const router = useRouter();
  const dispatch = useDispatch();

  const theme = useTheme();

  const authUser = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const [openAvatarCreator, setOpenAvatarCreator] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const { handleOpenSnackBar } = useContext(AuthContext);

  const handleOnUserSet = async (avatarUrl, isQuickSelect) => {
    try {
      if (user?.data?.avatarId) return;

      setIsUploadingAvatar(true);
      // Get the avatar ID from the exported url
      const avatarId = isQuickSelect
        ? avatarUrl
        : avatarUrl.split('/').pop().split('.').shift();

      await updateUserProfile({ avatarId });
      handleOpenSnackBar(ALERT_COLORS.SUCCESS, 'Successfully created avatar');

      await auth?.currentUser?.getIdToken(true);
      await dispatch(fetchUserData({ firestore, id: authUser.data.uid }));

      dispatch(setLoading(true));
      router.push(ROUTES.HOME);
    } catch (err) {
      handleOpenSnackBar(ALERT_COLORS.ERROR, err.message);
      throw new Error(err);
    }
  };

  const onCarouselChange = (now) => setCurrentImage(now);
  const onConfirm = () => handleOnUserSet(DEFAULT_AVATARS[currentImage], true);
  const toggleOpen = () => setOpenAvatarCreator(!openAvatarCreator);

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>Select your avatar</Typography>
      </Grid>
    );
  };

  const renderCarousel = () => {
    return (
      <Grid {...styles.carouselGridProps}>
        <Carousel onChange={onCarouselChange} {...styles.carouselProps}>
          {DEFAULT_AVATARS.map((id) => (
            <Grid key={id} {...styles.avatarGridProps}>
              <Image
                src={`/images/defaultAvatars/${id}.png`}
                {...styles.avatarProps}
              />
            </Grid>
          ))}
        </Carousel>
      </Grid>
    );
  };

  const renderActionButtons = () => {
    return (
      <Grid {...styles.buttonsGridProps}>
        <GradientOutlinedButton
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          text="Create own Avatar"
          clickHandler={toggleOpen}
          {...styles.confirmButtonProps}
        />
        <GradientOutlinedButton
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          textColor={theme.palette.Dark_Colors.Dark[1]}
          text="Confirm"
          clickHandler={onConfirm}
          {...styles.createButtonProps}
        />
      </Grid>
    );
  };

  const renderQuickSelectAvatar = () => (
    <Grid {...styles.selectorGridProps}>
      <Grid {...styles.selectorInnerGridProps}>
        {renderTitle()}
        {renderCarousel()}
        {renderActionButtons()}
      </Grid>
    </Grid>
  );

  const renderCreateAvatarView = () => (
    <PrimaryDialog
      open={openAvatarCreator}
      extraMainGridProps={styles.extraMainGridProps}
      toggleOpen={toggleOpen}
      removeCloseIcon
      removeShadow
      title="Custom Avatars"
    >
      <Grid {...styles.avatarCreatorGridProps}>
        <AvatarCreator
          {...styles.studioProps}
          onAvatarExported={(url) => handleOnUserSet(url, false)}
        />
      </Grid>
    </PrimaryDialog>
  );

  return (
    <>
      {renderQuickSelectAvatar()}
      {renderCreateAvatarView()}
    </>
  );
};

export default CreateAvatar;

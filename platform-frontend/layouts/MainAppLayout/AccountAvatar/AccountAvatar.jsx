import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Avatar, Badge, Grid, IconButton, Skeleton } from '@mui/material';

import AccountDropDown from './AccountDropDown';

import AvatarPlaceholder from '@/assets/images/AvatarPlaceholder.png';
import {
  getRandomAvatarColour,
  getUserAvatarImage,
} from '@/utils/MiscellaneousUtils';
import { setIntercom } from '@/utils/IntegrationUtils';

import styles from './styles';

/**
 * Renders an account avatar with a pop-up menu for user actions.
 *
 * @return {JSX.Element} The account avatar component.
 */
const AccountAvatar = () => {
  const { data: user, loading } = useSelector((state) => state.user);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userLoading = loading && !user?.avatarId;

  const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const handleLoad = () => setIsLoading(false);

  useEffect(() => {
    setIntercom('open');
  }, []);

  const renderLoader = () => (
    <Skeleton variant="circular" {...styles.iconButtonProps} />
  );

  const renderAvatarImage = () => {
    if (isLoading) {
      <Image src={AvatarPlaceholder} {...styles.avatarConfig} />;
    }

    return (
      <Image
        src={getUserAvatarImage(user.avatarId)}
        {...styles.avatarConfig}
        onLoadingComplete={handleLoad}
      />
    );
  };

  const renderAvatar = () => (
    <IconButton {...styles.iconButtonProps} onClick={handleMenuOpen}>
      <Badge {...styles.badgeProps}>
        <Avatar {...styles.avatarContainerConfig(getRandomAvatarColour())}>
          {renderAvatarImage()}
        </Avatar>
      </Badge>
    </IconButton>
  );

  return (
    <Grid {...styles.mainGridProps}>
      {userLoading ? renderLoader() : renderAvatar()}
      <AccountDropDown anchor={menuAnchor} close={handleMenuClose} />
    </Grid>
  );
};

export default AccountAvatar;

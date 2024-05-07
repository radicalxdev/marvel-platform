import { Avatar, IconButton } from '@mui/material';
import Image from 'next/image';

import avatarPlaceholder from '@/assets/images/AvatarPlaceholder.png';

import styles from './styles';

import {
  getRandomAvatarColour,
  getUserAvatarImage,
} from '@/utils/MiscellaneousUtils';

const AvatarIcon = (props) => {
  const { avatarId } = props;
  return (
    <IconButton {...styles.iconButtonProps}>
      <Avatar {...styles.avatarProps(getRandomAvatarColour('random'))}>
        <Image
          src={avatarId ? getUserAvatarImage(avatarId) : avatarPlaceholder}
          layout="fill"
          objectFit="contain"
        />
      </Avatar>
    </IconButton>
  );
};

export default AvatarIcon;

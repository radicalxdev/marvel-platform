import { useState } from 'react';

import Image from 'next/image';

import AvatarFullBody from '@/assets/images/AvatarFullBody.png';
import AvatarPlaceholder from '@/assets/images/AvatarPlaceholder.png';

import styles from './styles';

const AvatarWithLoading = ({ avatarUrl, isFullBody = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const placholderImg = isFullBody ? AvatarFullBody : AvatarPlaceholder;

  const handleLoadError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  if (isLoading) <Image src={placholderImg} {...styles.avatarImageConfig} />;

  if (loadError)
    return <Image src={placholderImg} {...styles.avatarImageConfig} />;

  return (
    <Image
      src={avatarUrl || placholderImg}
      onLoadingComplete={() => setIsLoading(false)}
      onError={handleLoadError}
      {...styles.avatarImageConfig}
    />
  );
};

export default AvatarWithLoading;

import { useState } from 'react';
import { Grid, Skeleton } from '@mui/material';
import Image from 'next/image';

import styles from './styles';

/**
 * Renders a banner component with an image.
 *
 * @param {object} props - The props object containing the image component and other props.
 * @param {React.Component} props.image - The image component to be rendered.
 * @param {any} props.otherProps - Any other props that should be passed to the banner component.
 * @return {JSX.Element} The rendered banner component.
 */
const Banner = (props) => {
  const { image, alt, imageUrl, priority, height, ...otherProps } = props;

  const [loading, setLoading] = useState(true);

  return (
    <Grid {...styles.bannerGridConfig(height)} {...otherProps}>
      {loading && <Skeleton {...styles.imageSkeleton} />}
      <Image
        src={imageUrl}
        alt={alt}
        layout="fill"
        objectFit="cover"
        priority={priority}
        onLoadingComplete={() => setLoading(false)}
      />
    </Grid>
  );
};

export default Banner;

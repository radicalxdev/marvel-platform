import { Button, Grid } from '@mui/material';
import { useEffect, useRef } from 'react';

import AttachmentIcon from '@/assets/svg/attachment.svg';

import styles from './styles';

const SetupPanel = (props) => {
  const { index, value, details, slideDimensions, setSlideDimensions } = props;
  const panelRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const panelDimensions = panelRef.current?.getBoundingClientRect();
      setSlideDimensions({
        width: panelDimensions?.width,
        height: panelDimensions?.height,
      });
    };

    if (typeof window !== 'undefined') {
      if (
        panelRef.current &&
        (!slideDimensions?.width || !slideDimensions?.height)
      ) {
        const { width, height } = panelRef.current.getBoundingClientRect();
        setSlideDimensions({ width, height });
      }
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [panelRef.current]);

  if (value !== index) return null;

  const { slideUrl, links } = details;

  const renderPitchEmbed = () => {
    if (!slideDimensions) return null;
    const aspectRatio = 16 / 10;
    const containerHeight = slideDimensions.width / aspectRatio;
    return (
      <Grid {...styles.pitchEmbedGridProps(containerHeight)}>
        <iframe
          title="Pitch Embed"
          src={slideUrl}
          allow="fullscreen"
          allowFullScreen
          width="100%"
          height="100%"
          style={{ border: 'none', borderRadius: '10px' }}
        />
      </Grid>
    );
  };

  const renderLinks = () => {
    return (
      <Grid {...styles.linkGroupGridProps}>
        {links.map((link, i) => (
          <Grid key={`Setup resource link ${i}`} {...styles.linkGridProps}>
            <Button href={link.url} {...styles.linkProps}>
              <AttachmentIcon /> {link.title}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Grid ref={panelRef} {...styles.mainGridProps} id={`tabpanel-${index}`}>
      <Grid {...styles.innerGridProps}>
        {renderPitchEmbed()}
        {renderLinks()}
      </Grid>
    </Grid>
  );
};

export default SetupPanel;

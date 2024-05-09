import { useRef } from 'react';

import { Button, Grid } from '@mui/material';

import AttachmentIcon from '@/assets/svg/attachment.svg';

import styles from './styles';

const OverviewPanel = (props) => {
  const { index, value, details, isLesson, disableTabs } = props;

  const panelRef = useRef(null);
  const disabled = true;

  if (value !== index) return null;

  const { slideUrl, links } = details;

  const renderPitchEmbed = () => {
    return (
      <Grid {...styles.pitchEmbedGridProps()}>
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
          <Grid key={`Overview resource link ${i}`} {...styles.linkGridProps}>
            <Button href={link.url} {...styles.linkProps}>
              <AttachmentIcon /> {link.title}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Grid
      ref={panelRef}
      {...styles.mainGridProps(isLesson, disableTabs)}
      id={`tabpanel-${index}`}
    >
      <Grid {...styles.innerGridProps}>
        {renderPitchEmbed()}
        {!isLesson && !disabled && renderLinks()}
      </Grid>
    </Grid>
  );
};

export default OverviewPanel;

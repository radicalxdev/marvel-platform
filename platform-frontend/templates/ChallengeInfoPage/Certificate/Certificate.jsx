import { ArrowDownwardOutlined } from '@mui/icons-material';
import { Grid, useTheme } from '@mui/material';
import Image from 'next/image';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import PrimaryDialog from '@/components/PrimaryDialog';

import styles from './styles';

import { shimmerEffect, toBase64 } from '@/utils/MiscellaneousUtils';

const Certificate = (props) => {
  const { open, toggleOpen, enrolledChallenge } = props;

  const theme = useTheme();

  const { certificate } = enrolledChallenge;

  const handleDownload = () => {
    if (certificate?.pdfUrl) window.open(certificate?.pdfUrl, '_blank');
  };

  const renderCertificate = () => {
    return (
      <Grid {...styles.imageGridProps}>
        <Image
          src={certificate?.imageUrl}
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmerEffect('100%', '100%')
          )}`}
          {...styles.imageProps}
        />
      </Grid>
    );
  };

  const renderDownloadButton = () => {
    return (
      <Grid {...styles.downloadGridProps}>
        <GradientOutlinedButton
          icon={
            <ArrowDownwardOutlined
              sx={{ color: theme.palette.Dark_Colors.Dark[1] }}
            />
          }
          clickHandler={handleDownload}
          {...styles.downloadButtonProps}
        />
      </Grid>
    );
  };

  return (
    <PrimaryDialog
      title="Certificate"
      open={open}
      toggleOpen={toggleOpen}
      extraMainGridProps={styles.extraMainGridProps}
      extraContentGridProps={styles.extraContentGridProps}
    >
      {renderCertificate()}
      {renderDownloadButton()}
    </PrimaryDialog>
  );
};

export default Certificate;

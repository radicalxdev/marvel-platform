import { ContentCopy, FileDownload } from '@mui/icons-material';
import { Button, Drawer, Grid, Typography } from '@mui/material';
import moment from 'moment';

import { TOOLS_ID } from '@/constants/tools';

import styles from './styles';

import FlashCardsOutput from './toolRenderers/FlashCardsOutput';
import MultipleChoiceQuizOutput from './toolRenderers/MultipleChoiceQuizOutput';

import { convertToUnixTimestamp } from '@/utils/FirebaseUtils';
import { copyToClipboard, exportToCSV } from '@/utils/ToolHistoryUtils';

const DRAWER_RENDERERS = {
  [TOOLS_ID.GEMINI_QUIZIFY]: MultipleChoiceQuizOutput,
  [TOOLS_ID.GEMINI_DYNAMO]: FlashCardsOutput,
};

const DEFAULT_DATA = {
  title: 'Default Title',
  content: 'Default Content',
  creationDate: moment().toDate().toLocaleDateString(),
  questions: [
    {
      question: 'Default Question 1',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
    },
  ],
};

const ToolOutputHistoryDrawer = (props) => {
  const { isOpen, onClose, data } = props;

  if (!data) return null;

  const panelData = data?.response || DEFAULT_DATA.questions;
  const ToolHistoryOutput = DRAWER_RENDERERS[data.tool_id];

  const handleCopyToClipboard = () => {
    copyToClipboard(data, panelData);
  };

  const handleExportToCSV = () => {
    exportToCSV(data, panelData);
  };

  const renderHeader = () => (
    <Grid container direction="column" {...styles.headerGridProps}>
      <Grid item>
        <Typography {...styles.dateProps}>
          {moment(convertToUnixTimestamp(data?.createdAt))
            ?.toDate()
            ?.toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item>
        <Typography {...styles.categoryTitleProps}>
          {data?.title || 'Default Title'}
        </Typography>
      </Grid>
      <Grid item>
        <Typography {...styles.categoryContentProps}>
          {data?.description || 'Default Description'}
        </Typography>
      </Grid>
    </Grid>
  );

  const renderContent = () => {
    return (
      <Grid {...styles.containerGridProps}>
        <ToolHistoryOutput data={data} />
      </Grid>
    );
  };

  const renderFooterButtons = () => (
    <Grid container justifyContent="flex-start" sx={{ mt: 3, width: '100%' }}>
      <Button onClick={handleCopyToClipboard} {...styles.copyButton}>
        <ContentCopy {...styles.CopyIcon} />
        Copy
      </Button>
      <Button onClick={handleExportToCSV} {...styles.exportButton}>
        <FileDownload {...styles.downloadIcon} />
        Export
      </Button>
    </Grid>
  );

  return (
    <Drawer {...styles.drawerProps} open={isOpen} onClose={onClose}>
      <Grid {...styles.mainGridProps}>
        {renderHeader()}
        {renderContent()}
        {renderFooterButtons()}
      </Grid>
    </Drawer>
  );
};

export default ToolOutputHistoryDrawer;

import { ContentCopy, FileDownload } from '@mui/icons-material';
import {
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import moment from 'moment';

import styles from './styles';

import { copyToClipboard } from '@/services/history/copy';
import { exportToCSV } from '@/services/history/export';

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

  const panelData = data?.response || DEFAULT_DATA.questions;

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
          {data?.creationDate || moment().toDate().toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item>
        <Typography {...styles.categoryTitleProps}>
          {data?.title || 'Default Title'}
        </Typography>
      </Grid>
      <Grid item>
        <Typography {...styles.categoryContentProps}>
          {data?.content || 'Default Content'}
        </Typography>
      </Grid>
    </Grid>
  );

  const renderQuestions = () =>
    panelData.map((item, index) => (
      <Grid key={index} sx={{ marginBottom: '16px' }}>
        <Typography {...styles.questionProps}>
          {index + 1}. {item?.question}
        </Typography>
        <List>
          {item?.choices?.map((choice, choiceIndex) => (
            <ListItem key={choiceIndex} sx={{ py: 0 }}>
              <Typography {...styles.optionProps}>
                {choice.key}. {choice.value}
              </Typography>
            </ListItem>
          ))}
        </List>
        <Typography {...styles.answerProps} sx={{ marginTop: '8px' }}>
          <strong>Correct Answer:</strong> {item.answer}
        </Typography>
        {item.explanation && (
          <Typography {...styles.explanationProps} sx={{ marginTop: '4px' }}>
            <strong>Explanation:</strong> {item.explanation}
          </Typography>
        )}
      </Grid>
    )) || null;

  const renderFlashCards = () => (
    <Grid {...styles.flashCardsGridProps}>
      {panelData?.map((item, index) => (
        <Grid key={index} {...styles.flashCardGridProps}>
          <Typography {...styles.conceptTitleProps}>{item?.concept}</Typography>
          <Typography {...styles.definitionProps}>
            {item?.definition}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );

  const TOOL_COMPONENTS = {
    '1': renderFlashCards,
    '0': renderQuestions,
  };

  const renderContent = () => {
    const renderToolComponent =
      TOOL_COMPONENTS[data?.toolId] || renderQuestions;
    return <Grid {...styles.containerGridProps}>{renderToolComponent()}</Grid>;
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

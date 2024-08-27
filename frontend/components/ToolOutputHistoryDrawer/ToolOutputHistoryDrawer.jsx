import { ContentCopy } from '@mui/icons-material';
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

  /**
   * handler method that sets the next response that the user wants to view in
   * the drawer based on the version selected in the drop down menu.
   * @param {int} index - index of the next response that the user wants to view in the drawer
   */
  // const handleResponseMenuItemClick = async (index) => {
  //   setCurrentResponseNumber(index);
  //   responseMenu.handleMenuClose();
  //   const responseData = await toolSessionType.initializeResponseForSession(
  //     responses[index]
  //   );
  //   setRestructuredResponse(responseData);

  //   const versionName =
  //     index === 0 ? 'Latest Version' : `Version ${responses.length - index}`;
  //   setResponseSelectorVersionName(versionName);
  // };

  /**
   * Renders the drop down menu selector for the different responses within a particular tool session.
   */
  // const renderResponseSelectorMenu = () =>
  //   responses.length > 1 && (
  //     <Grid>
  //       <Button
  //         onClick={responseMenu.handleMenuOpen}
  //         {...styles.dropdownButtonProps}
  //       >
  //         {`(${responses.length}) Edits`}
  //         {responseMenu.isMenuOpen ? (
  //           <KeyboardArrowDown />
  //         ) : (
  //           <KeyboardArrowRight />
  //         )}
  //       </Button>
  //       <Menu
  //         anchorEl={responseMenu.anchorEl}
  //         open={responseMenu.isMenuOpen}
  //         onClose={responseMenu.handleMenuClose}
  //         {...styles.dropDownMenuProps}
  //       >
  //         {responses.map((response, index) => (
  //           <MenuItem
  //             key={index}
  //             onClick={() => handleResponseMenuItemClick(index)}
  //             selected={index === currentResponseNumber}
  //           >
  //             {index === 0
  //               ? 'Latest Version'
  //               : `Version ${responses.length - index}`}
  //           </MenuItem>
  //         ))}
  //       </Menu>
  //     </Grid>
  //   );

  /**
   * Renders the menu selector for the different export options that the user can the different responses over to.
   */
  // const renderExportSelectorMenu = () => (
  //   <Grid>
  //     <Button onClick={exportMenu.handleMenuOpen} {...styles.exportButton}>
  //       <FileDownload {...styles.downloadIcon} />
  //       Export
  //       {exportMenu.isMenuOpen ? <KeyboardArrowUp /> : <KeyboardArrowRight />}
  //     </Button>
  //     <Menu
  //       anchorEl={exportMenu.anchorEl}
  //       open={exportMenu.isMenuOpen}
  //       onClose={exportMenu.handleMenuClose}
  //       {...styles.dropUpMenuProps}
  //     >
  //       <MenuItem onClick={() => handleExport('PDF')}>PDF</MenuItem>
  //       <MenuItem onClick={() => handleExport('CSV')}>CSV</MenuItem>
  //     </Menu>
  //   </Grid>
  // );

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

  /**
   * Renders the footer buttons of the card drawer
   */
  const renderFooterButtons = () => (
    <Grid container {...styles.footerProps}>
      <Button onClick={handleCopyToClipboard} {...styles.copyButton}>
        <ContentCopy {...styles.CopyIcon} />
        Copy
      </Button>
      {/* {renderExportSelectorMenu()} */}
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

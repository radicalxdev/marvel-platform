import { useState } from 'react';

import {
  ContentCopy,
  FileDownload,
  KeyboardArrowDown,
  KeyboardArrowRight,
  KeyboardArrowUp,
} from '@mui/icons-material';

import {
  Button,
  Drawer,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import TOOL_RENDERS from '@/constants/toolRenders';

import SnackBar from '../SnackBar';

import styles from './styles';

import AlertStateUtils from '@/utils/AlertStateUtils';
import MenuSelectorUtils from '@/utils/MenuSelectorUtils';

/**
 * Component for rendering a preview of history details in a drawer.
 *
 * @param {Object} props - Object containing the following properties:
 *  @param {Class} props.toolSessionType - Type of the tool session that being rendered out to the user
 *  @param {boolean} props.open - Boolean indicating whether the preview drawer is open
 *  @param {Function} props.toggleDrawer - Function to toggle the preview drawer
 *  @param {string} props.createdAt - Creation date of the history card response
 *  @param {string} props.title - Title of the history card response
 *  @param {string} props.description - Description of the history card response
 *  @param {string} props.outputs - Outputs of the history card response
 *  @param {Array} props.responses - Array of a specific history card responses
 *  @param {Function} props.setRestructuredResponse - setter method for setting the current response of the history card
 *  @param {number} props.currentResponseNumber - current response index of the history card responses
 *  @param {Function} props.setCurrentResponseNumber - setter method for setting the current response index
 * @return {JSX.Element} Rendered history preview component
 */
const ToolOutputHistoryDrawer = (props) => {
  const {
    toolSessionType,
    open,
    toggleDrawer,
    toolId,
    title,
    description,
    outputs,
    createdAt,
    responses,
    setRestructuredResponse,
    currentResponseNumber,
    setCurrentResponseNumber,
  } = props;

  const { alertState, setAlertState, handleAlertClose } = AlertStateUtils();
  const [responseSelectorVersionName, setResponseSelectorVersionName] =
    useState('Latest Version');
  const responseMenu = MenuSelectorUtils();
  const exportMenu = MenuSelectorUtils();

  /**
   * Function to handle copying the card content
   */
  const handleCopy = () => {
    try {
      toolSessionType.copyContent(title, createdAt, description, outputs);
      setAlertState({
        open: true,
        message: 'Card copied successfully!',
        severity: 'success',
      });
    } catch (error) {
      setAlertState({
        open: true,
        message: `Error copying card: ${error}`,
        severity: 'error',
      });
    }
  };

  /**
   * Function to handle exporting the card content to PDF or CSV according to user input
   * @param {String} exportFormat - format type that the user wants to export
   */
  const handleExport = (exportFormat) => {
    try {
      if (exportFormat === 'PDF') {
        toolSessionType.exportContentAsPDF(
          title,
          createdAt,
          description,
          outputs
        );
      } else if (exportFormat === 'CSV') {
        toolSessionType.exportContentAsCSV(title, outputs);
      }
      setAlertState({
        open: true,
        message: 'Card Exported successfully!',
        severity: 'success',
      });
    } catch (error) {
      setAlertState({
        open: true,
        message: `Error exporting card: ${error}`,
        severity: 'error',
      });
    }
  };

  /**
   * handler method that sets the next response that the user wants to view in
   * the drawer based on the version selected in the drop down menu.
   * @param {int} index - index of the next response that the user wants to view in the drawer
   */
  const handleResponseMenuItemClick = async (index) => {
    setCurrentResponseNumber(index);
    responseMenu.handleMenuClose();
    const responseData = await toolSessionType.initializeResponseForSession(
      responses[index]
    );
    setRestructuredResponse(responseData);

    const versionName =
      index === 0 ? 'Latest Version' : `Version ${responses.length - index}`;
    setResponseSelectorVersionName(versionName);
  };

  /**
   * Renders the drop down menu selector for the different responses within a particular tool session.
   */
  const renderResponseSelectorMenu = () =>
    responses.length > 1 && (
      <Grid>
        <Button
          onClick={responseMenu.handleMenuOpen}
          {...styles.dropdownButtonProps}
        >
          {`(${responses.length}) Edits`}
          {responseMenu.isMenuOpen ? (
            <KeyboardArrowDown />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
        <Menu
          anchorEl={responseMenu.anchorEl}
          open={responseMenu.isMenuOpen}
          onClose={responseMenu.handleMenuClose}
          {...styles.dropDownMenuProps}
        >
          {responses.map((response, index) => (
            <MenuItem
              key={index}
              onClick={() => handleResponseMenuItemClick(index)}
              selected={index === currentResponseNumber}
            >
              {index === 0
                ? 'Latest Version'
                : `Version ${responses.length - index}`}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    );

  /**
   * Renders the menu selector for the different export options that the user can the different responses over to.
   */
  const renderExportSelectorMenu = () => (
    <Grid>
      <Button onClick={exportMenu.handleMenuOpen} {...styles.exportButton}>
        <FileDownload {...styles.downloadIcon} />
        Export
        {exportMenu.isMenuOpen ? <KeyboardArrowUp /> : <KeyboardArrowRight />}
      </Button>
      <Menu
        anchorEl={exportMenu.anchorEl}
        open={exportMenu.isMenuOpen}
        onClose={exportMenu.handleMenuClose}
        {...styles.dropUpMenuProps}
      >
        <MenuItem onClick={() => handleExport('PDF')}>PDF</MenuItem>
        <MenuItem onClick={() => handleExport('CSV')}>CSV</MenuItem>
      </Menu>
    </Grid>
  );

  /**
   * Renders the header section of the card drawer
   */
  const renderHeader = () => (
    <Grid container direction="column" {...styles.headerGridProps}>
      <Grid container item {...styles.dateAndVersionNameSectionProps}>
        <Grid item>
          <Typography {...styles.dateProps}>{createdAt}</Typography>
          <Typography {...styles.responseSelectorVersionNameProps}>
            {responseSelectorVersionName}
          </Typography>
        </Grid>
        <Grid item>{renderResponseSelectorMenu()}</Grid>
      </Grid>
      <Grid item>
        <Typography {...styles.categoryTitleProps}>{title}</Typography>
      </Grid>
      <Grid item>
        <Typography {...styles.categoryContentProps}>{description}</Typography>
      </Grid>
    </Grid>
  );

  /**
   * Renders the content of a particular response within the card drawer based on the toolId
   */
  const renderContent = () => {
    const ToolRenderComponent = TOOL_RENDERS[toolId];
    return ToolRenderComponent ? (
      <ToolRenderComponent outputs={outputs} />
    ) : null;
  };

  /**
   * Renders the footer buttons of the card drawer
   */
  const renderFooterButtons = () => (
    <Grid container {...styles.footerProps}>
      <Button onClick={handleCopy} {...styles.copyButton}>
        <ContentCopy {...styles.CopyIcon} />
        Copy
      </Button>
      {renderExportSelectorMenu()}
    </Grid>
  );

  return (
    <Grid>
      <Drawer {...styles.drawerProps} open={open} onClose={toggleDrawer}>
        <Grid {...styles.mainGridProps}>
          {renderHeader()}
          {renderContent()}
          {renderFooterButtons()}
        </Grid>
      </Drawer>
      <SnackBar
        open={alertState.open}
        handleClose={handleAlertClose}
        message={alertState.message}
        severity={alertState.severity}
      />
    </Grid>
  );
};

export default ToolOutputHistoryDrawer;

import { useEffect, useState } from 'react';

import { Edit } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fade,
  Grid,
  useTheme,
} from '@mui/material';

import GradientOutlinedButton from '../GradientOutlinedButton';

import styles from './styles';

/**
 * Creates an AccordionInputGroupItem wrapper component with a title, children, and additional accordion details props.
 *
 * @param {Object} props - An object containing the component's props.
 * @param {string} props.title - The title of the accordion.
 * @param {JSX.Elemmnt} props.children - The content rendered within the accordion.
 * @param {Object} props.extraAccordionDetailsProps - Additional props to be passed to the AccordionDetails component.
 * @param {Object} props.errors - An object containing the errors for the form.
 *
 * @return {JSX.Element} The AccordionInputGroupItem component.
 */
const AccordionInputGroupItem = (props) => {
  const { title, children, extraAccordionDetailsProps, hasError } = props;

  const theme = useTheme();

  const [open, setOpen] = useState(hasError ? !!hasError : true);

  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    if (hasError) setOpen(true);
  }, [hasError]);

  const renderEditButton = () => {
    return (
      <GradientOutlinedButton
        bgcolor={theme.palette.Common.White['100p']}
        icon={<Edit sx={{ color: theme.palette.primary.main }} />}
        textColor={theme.palette.Greyscale[500]}
        iconPlacement="left"
        onHoverTextColor={theme.palette.Common.White['100p']}
        clickHandler={toggleOpen}
        text="Edit Prompt"
        {...styles.outlinedButtonProps}
      />
    );
  };

  const renderSummary = () => {
    return (
      <AccordionSummary
        expandIcon={null}
        id={`${title}-id`}
        {...styles.accordionSummaryProps}
      >
        <Grid {...styles.titleGridProps}>
          {title}
          {renderEditButton()}
        </Grid>
      </AccordionSummary>
    );
  };

  return (
    <Accordion expanded={open} {...styles.accordianProps}>
      {renderSummary()}
      <Fade in>
        <AccordionDetails
          {...styles.accordionDetailsProps(extraAccordionDetailsProps)}
        >
          {children}
        </AccordionDetails>
      </Fade>
    </Accordion>
  );
};

export default AccordionInputGroupItem;

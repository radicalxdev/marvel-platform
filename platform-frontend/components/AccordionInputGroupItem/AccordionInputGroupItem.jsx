import { useEffect, useState } from 'react';

import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fade,
} from '@mui/material';

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

  const [open, setOpen] = useState(!!hasError);

  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    if (hasError) setOpen(true);
  }, [hasError]);

  const renderSummary = () => {
    return (
      <AccordionSummary
        expandIcon={<ExpandMore />}
        id={`${title}-id`}
        {...styles.accordionSummaryProps}
      >
        {title}
      </AccordionSummary>
    );
  };

  return (
    <Accordion expanded={open} onChange={toggleOpen} {...styles.accordianProps}>
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

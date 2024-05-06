import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  Fade,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

import styles from './styles';

/**
 * Renders an option item component.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.text - The text to display.
 * @param {number} props.index - The index of the option item.
 * @return {JSX.Element} The rendered option item component.
 */
const OptionItem = (props) => {
  const {
    text,
    index,
    correct,
    solution,
    explanationOpened,
    explanation,
    selected,
    setSelected,
    setSelectedValue,
    answerSubmited,
  } = props;

  const [mouseDown, setMouseDown] = useState(false);
  const theme = useTheme();

  const isSelected = selected === index + 1;
  const isSolution = solution === text;
  const IsCorrect = answerSubmited && isSelected && correct;
  const IsWrong = answerSubmited && isSelected && !correct;
  const rightAnswer = answerSubmited && isSolution && !correct;
  const disableHover = isSelected || rightAnswer || answerSubmited;

  const handleMouseDown = () => {
    if (answerSubmited) return;
    setMouseDown((prev) => !prev);
  };
  const handleLeave = () => setMouseDown(false);

  const handleClick = () => {
    if (answerSubmited) return;
    setSelectedValue(text);
    setSelected(index + 1);
  };

  const setBgColor = () => {
    if (IsCorrect || rightAnswer)
      return theme.palette.Background.gradient.success;
    if (IsWrong) return theme.palette.Background.gradient.red;
    if (isSelected || mouseDown)
      return theme.palette.Background.gradient.purple2;
    return theme.palette.Dark_Colors.Dark[1];
  };

  const setBorderColor = () => {
    if (IsCorrect || rightAnswer)
      return theme.palette.Background.gradient.success;
    if (IsWrong) return theme.palette.Background.gradient.red;
    if (isSelected || mouseDown)
      return theme.palette.Background.gradient.purple2;
    return theme.palette.Greyscale[498];
  };

  const renderContent = () => {
    return (
      <Grid id="content" {...styles.contentGridProps}>
        <Grid id="number" {...styles.numberGridProps(setBorderColor())}>
          <Button>
            <span>{index + 1}</span>
          </Button>
        </Grid>
        <Grid {...styles.textGridProps}>
          <Typography {...styles.textProps}>{text}</Typography>
        </Grid>
      </Grid>
    );
  };

  const renderOption = () => {
    return (
      <Grid
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleLeave}
        {...styles.mainGridProps(mouseDown, disableHover, setBgColor())}
      >
        <Box id="outerBorder" {...styles.outerBorderProps} />
        {renderContent()}
      </Grid>
    );
  };

  const renderAccordion = () => {
    return (
      <Fade in>
        <Accordion expanded {...styles.accordianProps}>
          <AccordionDetails {...styles.accordianDetailsProps}>
            {renderOption()}
            <Typography {...styles.explanationProps}>{explanation}</Typography>
          </AccordionDetails>
        </Accordion>
      </Fade>
    );
  };

  if (explanationOpened && !isSolution) return null;

  if (explanationOpened && isSolution) return renderAccordion();

  return renderOption();
};

export default OptionItem;

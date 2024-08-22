import { useContext } from 'react';

import { Help } from '@mui/icons-material';
import { Grid, Tooltip, Typography, useTheme } from '@mui/material';
import { FormContainer } from 'react-hook-form-mui';
import { useDispatch, useSelector } from 'react-redux';

import useWatchFields from '@/hooks/useWatchFields';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import PrimaryFileUpload from '@/components/PrimaryFileUpload';
import PrimarySelectorInput from '@/components/PrimarySelectorInput';
import PrimaryTextFieldInput from '@/components/PrimaryTextFieldInput';

import { INPUT_TYPES } from '@/constants/inputs';
import ALERT_COLORS from '@/constants/notification';

import styles from './styles';

import { AuthContext } from '@/providers/GlobalProvider';
import {
  setCommunicatorLoading,
  setFormOpen,
  setPrompt,
  setResponse,
} from '@/redux/slices/toolsSlice';
import submitPrompt from '@/services/tools/submitPrompt';

const ToolForm = (props) => {
  const { id, inputs } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const { handleOpenSnackBar } = useContext(AuthContext);

  const { communicatorLoading } = useSelector((state) => state.tools);
  const { data: userData } = useSelector((state) => state.user);

  const { register, control, handleSubmit, getValues, setValue, errors } =
    useWatchFields([]);

  // Helper function to extract the YouTube video ID from the URL
  const extractVideoId = (url) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
  };

  // Helper function to parse ISO 8601 duration to seconds
  const parseDuration = (isoDuration) => {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1], 10) || 0;
    const minutes = parseInt(match[2], 10) || 0;
    const seconds = parseInt(match[3], 10) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleSubmitForm = async (values) => {
    if ('youtube_url' in values) {
      try {
        const { files, ...toolData } = values;
        // Extract the video ID from the YouTube URL
        const videoId = extractVideoId(values.youtube_url);

        const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY;
        // Fetch the video details using YouTube Data API
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${API_KEY}`
        );
        const data = await response.json();
        const { duration } = data.items[0].contentDetails;
        // Convert the duration to seconds and check if the video is longer than 10 minutes
        const tenMinutesInSeconds = 10 * 60;
        const videoDurationInSeconds = parseDuration(duration);
        if (videoDurationInSeconds > tenMinutesInSeconds) {
          handleOpenSnackBar(
            'error',
            '<strong>Video Too Long!</strong><br>Make sure you provide a video that is less than <strong>600 seconds</strong> long',
            true // Indicate that this is an HTML message
          );
          return;
        }
        dispatch(setResponse(null));
        const updateData = Object.entries(toolData).map(([name, value]) => ({
          name,
          value,
        }));
        dispatch(
          setPrompt({
            tool_data: { tool_id: id, inputs: updateData },
            type: 'tool',
          })
        );
        dispatch(setCommunicatorLoading(true));
        const submitResponse = await submitPrompt(
          {
            tool_data: { tool_id: id, inputs: updateData },
            type: 'tool',
            user: {
              id: userData?.id,
              fullName: userData?.fullName,
              email: userData?.email,
            },
          },
          values.youtube_url // Pass the valid video URL here
        );
        dispatch(setResponse(submitResponse?.data));
        dispatch(setFormOpen(false));
        dispatch(setCommunicatorLoading(false));
      } catch (error) {
        dispatch(setCommunicatorLoading(false));
        handleOpenSnackBar(
          ALERT_COLORS.ERROR,
          error?.message || 'Couldn\u0027t send prompt'
        );
      }
    } else {
      try {
        const { files, ...toolData } = values;
        // Ensure all files are PDFs
        const pdfFiles = files?.filter(
          (file) => file.type === 'application/pdf'
        );
        if (!pdfFiles.length || pdfFiles.length !== files.length) {
          handleOpenSnackBar(
            'error',
            '<strong>Unable to load files</strong><br>Make sure you select <strong>PDF Files</strong> to continue making the quiz.',
            true // Indicate that this is an HTML message
          );
          return;
        }
        dispatch(setResponse(null));
        const updateData = Object.entries(toolData).map(([name, value]) => ({
          name,
          value,
        }));
        dispatch(
          setPrompt({
            tool_data: { tool_id: id, inputs: updateData },
            type: 'tool',
          })
        );
        dispatch(setCommunicatorLoading(true));
        const response = await submitPrompt(
          {
            tool_data: { tool_id: id, inputs: updateData },
            type: 'tool',
            user: {
              id: userData?.id,
              fullName: userData?.fullName,
              email: userData?.email,
            },
          },
          pdfFiles // Ensure only PDFs are passed here
        );
        dispatch(setResponse(response?.data));
        dispatch(setFormOpen(false));
        dispatch(setCommunicatorLoading(false));
      } catch (error) {
        dispatch(setCommunicatorLoading(false));
        handleOpenSnackBar(
          ALERT_COLORS.ERROR,
          error?.message || 'Couldn\u0027t send prompt'
        );
      }
    }
  };

  const renderTextInput = (inputProps) => {
    const { name: inputName, placeholder, tooltip, label } = inputProps;
    const renderLabel = () => {
      return (
        <Grid {...styles.textFieldLabelGridProps}>
          <Typography {...styles.labelProps(errors?.[inputName])}>
            {label}
          </Typography>
          {tooltip && (
            <Tooltip placement="top" title={tooltip} sx={{ ml: 1 }}>
              <Help />
            </Tooltip>
          )}
        </Grid>
      );
    };

    return (
      <Grid key={inputName} {...styles.inputGridProps}>
        <PrimaryTextFieldInput
          id={inputName}
          name={inputName}
          title={renderLabel()}
          error={errors?.[inputName]}
          control={control}
          placeholder={placeholder}
          helperText={errors?.[inputName]?.message}
          validation={{
            required: 'Field is required',
          }}
          ref={register}
        />
      </Grid>
    );
  };

  const renderSelectorInput = (inputProps) => {
    const { name: inputName, label, placeholder, max = 10 } = inputProps;

    const renderLabel = () => {
      return (
        <Grid {...styles.labelGridProps}>
          <Typography {...styles.labelProps(errors?.[inputName])}>
            {label}
          </Typography>
        </Grid>
      );
    };

    return (
      <Grid key={inputName} {...styles.inputGridProps}>
        <PrimarySelectorInput
          id={inputName}
          name={inputName}
          label={renderLabel()}
          displayEmpty
          color="purple"
          bgColor="#ffffff"
          placeholder={placeholder}
          error={errors?.[inputName]}
          menuList={new Array(max)
            .fill()
            ?.map((item, index) => ({ id: index + 1, label: index + 1 }))}
          helperText={errors?.[inputName]?.message}
          control={control}
          ref={register}
          extraInputProps={{
            color: 'black',
          }}
          validation={{
            required: 'Please select an option.',
          }}
        />
      </Grid>
    );
  };

  const renderFileUpload = (inputProps) => {
    const { name: inputName, label } = inputProps;

    return (
      <Grid key={inputName} {...styles.inputGridProps}>
        <PrimaryFileUpload
          id={inputName}
          name={inputName}
          multiple
          placeholder="Choose Files to Upload"
          label={label}
          error={errors?.[inputName]}
          helperText={errors?.[inputName]?.message}
          color="purple"
          bgColor="#ffffff"
          control={control}
          getValues={getValues}
          ref={register}
          showChips
          showCheckbox
          displayEmpty
          setValue={setValue}
          validation={{
            required: 'Please upload a file.',
            validate: {
              lessThanThree: (v) =>
                parseInt(v?.length, 10) < 10 || 'Should be less than 3 files',
            },
          }}
        />
      </Grid>
    );
  };

  const renderActionButtons = () => {
    return (
      <Grid mt={4} {...styles.actionButtonGridProps}>
        <GradientOutlinedButton
          id="submitButton"
          bgcolor={theme.palette.Common.White['100p']}
          text="Generate"
          textColor={theme.palette.Common.White['100p']}
          loading={communicatorLoading}
          onHoverTextColor={theme.palette.Background.purple}
          type="submit"
          inverted
          {...styles.submitButtonProps}
        />
      </Grid>
    );
  };

  const renderInput = (inputProps) => {
    switch (inputProps?.type) {
      case INPUT_TYPES.TEXT:
        return renderTextInput(inputProps);
      case INPUT_TYPES.NUMBER:
        return renderSelectorInput(inputProps);
      case INPUT_TYPES.FILE:
        return renderFileUpload(inputProps);
      default:
        return null;
    }
  };

  return (
    <FormContainer
      FormProps={{
        id: 'tool-form',
      }}
      onSuccess={handleSubmit(handleSubmitForm)}
    >
      <Grid {...styles.formProps}>
        <Grid {...styles.mainContentGridProps}>
          {inputs?.map((input) => renderInput(input))}
        </Grid>
        {renderActionButtons()}
      </Grid>
    </FormContainer>
  );
};
export default ToolForm;

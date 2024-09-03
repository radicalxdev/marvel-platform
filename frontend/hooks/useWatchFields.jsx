import { useForm } from 'react-hook-form';

import { VALIDATION_STATES } from '@/constants/auth';

const { SUCCESS, ERROR, DEFAULT } = VALIDATION_STATES;

const useWatchFields = (fieldConfigs) => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    control,
    reset,
  } = useForm();

  const newFieldStates = {};

  fieldConfigs.forEach(({ fieldName, regexPattern }) => {
    const fieldValue = watch(fieldName, '');

    const isValidField = regexPattern.test(fieldValue);

    // Additional checks for `fullName`
    const isNotOnlyWhitespace =
      fieldName === 'fullName' ? fieldValue.trim() !== '' : true; // checks if fullName is not empty or contains only white spaces
    const isLengthValid =
      fieldName === 'fullName' ? fieldValue.length <= 100 : true; // checks if fullName doesn't have more than 100 characters

    const setFieldStatus = () => {
      if (fieldValue === '') return DEFAULT;
      if (isValidField && isNotOnlyWhitespace && isLengthValid) return SUCCESS;
      return ERROR;
    };

    newFieldStates[fieldName] = {
      status: setFieldStatus(),
      value: fieldValue,
      valid: isValidField && isNotOnlyWhitespace && isLengthValid,
    };
  });

  return {
    register,
    watch,
    control,
    errors,
    getValues,
    setValue,
    handleSubmit,
    fieldStates: newFieldStates,
    reset,
  };
};

export default useWatchFields;

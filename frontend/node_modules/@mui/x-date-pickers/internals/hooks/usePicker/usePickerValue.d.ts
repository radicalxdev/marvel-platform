import { InferError } from '../useValidation';
import { FieldSection } from '../../../models';
import { UsePickerValueProps, UsePickerValueParams, UsePickerValueResponse } from './usePickerValue.types';
/**
 * Manage the value lifecycle of all the pickers.
 */
export declare const usePickerValue: <TValue, TDate, TSection extends FieldSection, TExternalProps extends UsePickerValueProps<TValue, TSection, any>>({ props, valueManager, valueType, wrapperVariant, validator, }: UsePickerValueParams<TValue, TDate, TSection, TExternalProps>) => UsePickerValueResponse<TValue, TSection, InferError<TExternalProps>>;

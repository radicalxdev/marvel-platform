import { Validator } from '../../hooks/useValidation';
import { DateComponentValidationProps } from './validateDate';
import { TimeComponentValidationProps } from './validateTime';
import { DateTimeValidationError } from '../../../models';
export interface DateTimeComponentValidationProps<TDate> extends DateComponentValidationProps<TDate>, TimeComponentValidationProps<TDate> {
}
export declare const validateDateTime: Validator<any | null, any, DateTimeValidationError, DateTimeComponentValidationProps<any>>;

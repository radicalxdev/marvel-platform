import { PickersLayoutProps, SubComponents } from './PickersLayout.types';
import { DateOrTimeViewWithMeridiem } from '../internals/models';
interface UsePickerLayoutResponse extends SubComponents {
}
declare const usePickerLayout: <TValue, TDate, TView extends DateOrTimeViewWithMeridiem>(props: PickersLayoutProps<TValue, TDate, TView>) => UsePickerLayoutResponse;
export default usePickerLayout;

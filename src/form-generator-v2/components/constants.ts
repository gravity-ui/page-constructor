import OneTypeGroup from './OneTypeGroup/OneTypeGroup';
import Section from './Section/Section';
import SegmentedRadioGroup from './SegmentedRadioGroup/SegmentedRadioGroup';
import Select from './Select/Select';
import Text from './Text/Text';
import TextArea from './TextArea/TextArea';
import TextInput from './TextInput/TextInput';

export const componentMap = {
    section: Section,
    select: Select,
    oneTypeGroup: OneTypeGroup,
    textInput: TextInput,
    segmentedRadioGroup: SegmentedRadioGroup,
    // colorInput: ColorInput,
    text: Text,
    textArea: TextArea,
};

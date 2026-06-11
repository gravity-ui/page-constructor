import ColorInput from './ColorInput/ColorInput';
import Divider from './Divider/Divider';
import Section from './Section/Section';
import SegmentedRadioGroup from './SegmentedRadioGroup/SegmentedRadioGroup';
import Select from './Select/Select';
import Switch from './Switch/Switch';
import Text from './Text/Text';
import TextArea from './TextArea/TextArea';
import TextInput from './TextInput/TextInput';

export const componentMap = {
    section: Section,
    select: Select,
    textInput: TextInput,
    segmentedRadioGroup: SegmentedRadioGroup,
    colorInput: ColorInput,
    text: Text,
    divider: Divider,
    textArea: TextArea,
    switch: Switch,
};

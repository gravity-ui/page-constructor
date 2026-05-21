import {IconProps} from '@gravity-ui/uikit';

export type Content = Record<string, unknown>;

export type When = {
    field?: string;
    operator: '===' | '!==' | '||' | '&&';
    value?: string | boolean;
}[];

export type Option = {
    content?: string;
    value: string;
};

export type SectionField = {
    type: 'section';
    title: string;
    fields: Fields;
    when?: When;
    // Static section props
    opened?: boolean;
    // Repeating group props — presence of `index` activates array mode
    index?: string;
    withAddButton?: boolean;
    itemTitle?: string; // header text on each repeated item card
    itemView?: 'card' | 'clear'; // card = Card with borders/padding; clear = flat div
};

export type SelectField = {
    type: 'select';
    name: string;
    title: string;
    options: Option[];
    defaultValue?: string;
    when?: When;
    hasClear?: boolean;
};

export type TextField = {
    type: 'textInput' | 'textArea';
    name: string;
    title: string;
    defaultValue?: string;
    when?: When;
    placeholder?: string;
};

export type SegmentedRadioGroupField = {
    type: 'segmentedRadioGroup';
    name: string;
    title: string;
    options: Option[];
    defaultValue?: string;
    when?: When;
};

export type TextColor =
    | 'primary'
    | 'secondary'
    | 'hint'
    | 'info'
    | 'positive'
    | 'warning'
    | 'danger'
    | 'utility'
    | 'misc';

export type Text = {
    type: 'text';
    text: string;
    level?: 'danger' | 'info';
    color?: TextColor;
    when?: When;
};

export type SwitchField = {
    type: 'switch';
    name: string;
    title: string;
    defaultValue?: boolean;
    when?: When;
};

export type ColorField = {
    type: 'colorInput';
    name: string;
    title: string;
    defaultValue?: string;
    when?: When;
};

export type Fields = (
    | SectionField
    | SelectField
    | TextField
    | SegmentedRadioGroupField
    | Text
    | SwitchField
    | ColorField
)[];

export type OnUpdate = (
    name: string,
    value: unknown,
    options?: {unset?: boolean; removeArrayItemAt?: number},
) => void;

export type CommonProps = {
    content: Content;
    onUpdate: OnUpdate;
};

export interface BlockConfig {
    name: string;
    inputs: Fields;
    group?: string;
    hidden?: boolean;
    default?: object;
    previewImg?: string;
    previewIcon?: IconProps;
}

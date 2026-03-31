import {IconProps} from '@gravity-ui/uikit';

export type Content = Record<any, any>;

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
    opened?: boolean;
    fields: Fields;
    when?: When;
    note?: {
        text: string;
        level: 'danger' | 'info';
    };
};

export type SelectField = {
    type: 'select';
    name: string;
    title: string;
    options: Option[];
    when?: When;
    hasClear?: boolean;
};

export type OneTypeGroupField = {
    type: 'oneTypeGroup';
    index: string;
    withAddButton?: boolean;
    title: string;
    fields: Fields;
    when?: When;
};

export type TextField = {
    type: 'textInput' | 'textArea';
    name: string;
    title: string;
    when?: When;
};

export type SegmentedRadioGroupField = {
    type: 'segmentedRadioGroup';
    name: string;
    title: string;
    options: Option[];
    defaultValue?: string;
    when?: When;
};

export type Text = {
    type: 'text';
    text: string;
    when?: When;
};

export type SwitchField = {
    type: 'switch';
    name: string;
    title: string;
    when?: When;
};

export type ColorField = {
    type: 'colorInput';
    name: string;
    title: string;
    when?: When;
};

export type Fields = (
    | SectionField
    | SelectField
    | OneTypeGroupField
    | TextField
    | SegmentedRadioGroupField
    | Text
    | SwitchField
    | ColorField
)[];

export type OnUpdate = (
    name: string,
    value: any,
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

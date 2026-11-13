import {
    ChevronsExpandVertical,
    CircleInfo,
    Code,
    Cubes3,
    Droplet,
    FontCursor,
    ListCheck,
    Minus,
    TextAlignLeft,
    ToggleOn,
} from '@gravity-ui/icons';
import type {IconData} from '@gravity-ui/uikit';

import type {BuilderFieldType} from '../types';

export const TYPE_LABELS: Record<BuilderFieldType, string> = {
    textInput: 'Text input',
    textArea: 'Text area',
    select: 'Select',
    segmentedRadioGroup: 'Segmented radio',
    switch: 'Switch',
    colorInput: 'Color input',
    text: 'Static text',
    divider: 'Divider',
    section: 'Section',
    codeInput: 'Code editor',
};

export const PALETTE_LABELS: Record<BuilderFieldType, string> = {
    textInput: 'Text',
    textArea: 'Text area',
    select: 'Select',
    segmentedRadioGroup: 'Radio',
    switch: 'Switch',
    colorInput: 'Color',
    text: 'Hint',
    divider: 'Divider',
    section: 'Section',
    codeInput: 'Code',
};

export const TYPE_ICONS: Record<BuilderFieldType, IconData> = {
    textInput: FontCursor,
    textArea: TextAlignLeft,
    select: ChevronsExpandVertical,
    segmentedRadioGroup: ListCheck,
    switch: ToggleOn,
    colorInput: Droplet,
    text: CircleInfo,
    divider: Minus,
    section: Cubes3,
    codeInput: Code,
};

export const FIELD_TYPES: BuilderFieldType[] = [
    'textInput',
    'textArea',
    'codeInput',
    'select',
    'segmentedRadioGroup',
    'switch',
    'colorInput',
    'text',
    'divider',
    'section',
];

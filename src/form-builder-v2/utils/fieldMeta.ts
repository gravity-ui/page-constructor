import {
    ChevronsExpandVertical,
    CircleInfo,
    Cubes3,
    Droplet,
    FontCursor,
    ListCheck,
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
    section: 'Section',
};

export const PALETTE_LABELS: Record<BuilderFieldType, string> = {
    textInput: 'Text',
    textArea: 'Text area',
    select: 'Select',
    segmentedRadioGroup: 'Radio',
    switch: 'Switch',
    colorInput: 'Color',
    text: 'Hint',
    section: 'Section',
};

export const TYPE_ICONS: Record<BuilderFieldType, IconData> = {
    textInput: FontCursor,
    textArea: TextAlignLeft,
    select: ChevronsExpandVertical,
    segmentedRadioGroup: ListCheck,
    switch: ToggleOn,
    colorInput: Droplet,
    text: CircleInfo,
    section: Cubes3,
};

export const FIELD_TYPES: BuilderFieldType[] = [
    'textInput',
    'textArea',
    'select',
    'segmentedRadioGroup',
    'switch',
    'colorInput',
    'text',
    'section',
];

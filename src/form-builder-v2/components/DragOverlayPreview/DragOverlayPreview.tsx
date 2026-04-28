import * as React from 'react';

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
import {Card, Icon, Label, Text} from '@gravity-ui/uikit';
import type {IconData} from '@gravity-ui/uikit';

import type {BuilderFieldType, FormField} from '../../types';
import {formBuilderV2Cn} from '../../utils/cn';

import './DragOverlayPreview.scss';

const b = formBuilderV2Cn('drag-overlay');

const TYPE_LABELS: Record<BuilderFieldType, string> = {
    textInput: 'Text input',
    textArea: 'Text area',
    select: 'Select',
    segmentedRadioGroup: 'Segmented radio',
    switch: 'Switch',
    colorInput: 'Color input',
    text: 'Static text',
    section: 'Section',
};

const TYPE_ICONS: Record<BuilderFieldType, IconData> = {
    textInput: FontCursor,
    textArea: TextAlignLeft,
    select: ChevronsExpandVertical,
    segmentedRadioGroup: ListCheck,
    switch: ToggleOn,
    colorInput: Droplet,
    text: CircleInfo,
    section: Cubes3,
};

interface DragOverlayPreviewProps {
    type: BuilderFieldType;
    field?: FormField;
}

export const DragOverlayPreview: React.FC<DragOverlayPreviewProps> = ({type, field}) => {
    const name = field && 'name' in field ? field.name : '';
    const title =
        field && 'title' in field ? field.title : field && 'text' in field ? field.text : '';

    return (
        <Card className={b()} view="raised">
            <Icon data={TYPE_ICONS[type]} size={14} />
            <div className={b('text')}>
                <Text variant="body-2">{TYPE_LABELS[type]}</Text>
                {(name || title) && (
                    <Label theme="unknown" size="s">
                        {name || title}
                    </Label>
                )}
            </div>
        </Card>
    );
};

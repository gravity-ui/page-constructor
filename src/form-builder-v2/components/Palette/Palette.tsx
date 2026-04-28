import * as React from 'react';

import {useDraggable} from '@dnd-kit/react';
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
import {Card, Icon, Text} from '@gravity-ui/uikit';
import type {IconData} from '@gravity-ui/uikit';

import {useFormContext} from '../../hooks/FormContext';
import {BuilderFieldType, FormField} from '../../types';
import {formBuilderV2Cn} from '../../utils/cn';

import './Palette.scss';

const b = formBuilderV2Cn('palette');

const ITEMS: {type: BuilderFieldType; label: string; icon: IconData}[] = [
    {type: 'textInput', label: 'Text', icon: FontCursor},
    {type: 'textArea', label: 'Text area', icon: TextAlignLeft},
    {type: 'select', label: 'Select', icon: ChevronsExpandVertical},
    {type: 'segmentedRadioGroup', label: 'Radio', icon: ListCheck},
    {type: 'switch', label: 'Switch', icon: ToggleOn},
    {type: 'colorInput', label: 'Color', icon: Droplet},
    {type: 'text', label: 'Hint', icon: CircleInfo},
    {type: 'section', label: 'Section', icon: Cubes3},
];

export const PALETTE_DRAGGABLE_PREFIX = 'palette:';

export interface PaletteDragData {
    kind: 'palette';
    type: BuilderFieldType;
}

const findContainerId = (fields: FormField[], selectedId: string | null): string | null => {
    if (!selectedId) return null;
    for (const field of fields) {
        if (field.id === selectedId && field.type === 'section') {
            return field.id;
        }
        if (field.type === 'section') {
            const nested = findContainerId(field.fields, selectedId);
            if (nested) return nested;
        }
    }
    return null;
};

interface PaletteTileProps {
    type: BuilderFieldType;
    label: string;
    icon: IconData;
    onClick: () => void;
}

const PaletteTile: React.FC<PaletteTileProps> = ({type, label, icon, onClick}) => {
    const {ref, handleRef, isDragging} = useDraggable({
        id: `${PALETTE_DRAGGABLE_PREFIX}${type}`,
        data: {kind: 'palette', type} as PaletteDragData,
    });

    const setRefs = React.useCallback(
        (element: HTMLButtonElement | null) => {
            (ref as (el: Element | null) => void)(element);
            (handleRef as (el: Element | null) => void)(element);
        },
        [ref, handleRef],
    );

    return (
        <button
            ref={setRefs}
            type="button"
            className={b('tile', {dragging: isDragging})}
            onClick={onClick}
            title={label}
        >
            <Icon data={icon} size={18} />
            <span className={b('tile-label')}>{label}</span>
        </button>
    );
};

export const Palette: React.FC = () => {
    const {addField, addFieldToSection, formFields, selectedFieldId} = useFormContext();

    const containerId = React.useMemo(
        () => findContainerId(formFields, selectedFieldId),
        [formFields, selectedFieldId],
    );

    const handleAdd = (type: BuilderFieldType) => {
        if (containerId) {
            addFieldToSection(containerId, type);
        } else {
            addField(type);
        }
    };

    return (
        <Card className={b()} view="outlined">
            <div className={b('header')}>
                <Text variant="subheader-2">Add field</Text>
                <Text variant="caption-1" color="hint">
                    Click to add, or drag onto the canvas to drop at a specific position.
                </Text>
            </div>
            <div className={b('items')}>
                {ITEMS.map((item) => (
                    <PaletteTile
                        key={item.type}
                        type={item.type}
                        label={item.label}
                        icon={item.icon}
                        onClick={() => handleAdd(item.type)}
                    />
                ))}
            </div>
        </Card>
    );
};

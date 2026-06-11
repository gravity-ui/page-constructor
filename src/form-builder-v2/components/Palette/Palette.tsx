import * as React from 'react';

import {PointerActivationConstraints, PointerSensor} from '@dnd-kit/dom';
import {useDraggable} from '@dnd-kit/react';
import {Button, Card, Icon, Text, Tooltip} from '@gravity-ui/uikit';
import type {IconData} from '@gravity-ui/uikit';

import {useFormContext} from '../../hooks/FormContext';
import {BuilderFieldType, FormField} from '../../types';
import {formBuilderV2Cn} from '../../utils/cn';
import type {PaletteDragData} from '../../utils/dragData';
import {FIELD_TYPES, PALETTE_LABELS, TYPE_ICONS} from '../../utils/fieldMeta';

import './Palette.scss';

export type {PaletteDragData};

const b = formBuilderV2Cn('palette');

export const PALETTE_DRAGGABLE_PREFIX = 'palette:';

const findContainerId = (
    fields: FormField[],
    selectedId: string | null,
    parentSectionId: string | null = null,
): string | null | undefined => {
    if (!selectedId) return null;
    for (const field of fields) {
        if (field.id === selectedId) {
            return field.type === 'section' ? field.id : parentSectionId;
        }
        if (field.type === 'section') {
            const nested = findContainerId(field.fields, selectedId, field.id);
            if (nested !== undefined) return nested;
        }
    }
    return undefined;
};

interface PaletteTileProps {
    type: BuilderFieldType;
    label: string;
    icon: IconData;
    onClick: () => void;
}

const DRAG_DISTANCE = 4;

const paletteSensors = [
    PointerSensor.configure({
        activationConstraints: [new PointerActivationConstraints.Distance({value: DRAG_DISTANCE})],
    }),
];

const PaletteTile = ({type, label, icon, onClick}: PaletteTileProps) => {
    const {ref, handleRef, isDragging} = useDraggable({
        id: `${PALETTE_DRAGGABLE_PREFIX}${type}`,
        data: {kind: 'palette', type},
        sensors: paletteSensors,
    });

    const setRefs = React.useCallback(
        (element: HTMLButtonElement | null) => {
            ref(element);
            handleRef(element);
        },
        [ref, handleRef],
    );

    return (
        <Tooltip content={label} placement="right" openDelay={500}>
            <Button
                ref={setRefs}
                view="flat"
                size="m"
                className={b('tile', {dragging: isDragging})}
                onClick={onClick}
            >
                <Icon data={icon} size={18} />
                <span className={b('tile-label')}>{label}</span>
            </Button>
        </Tooltip>
    );
};

export const Palette = () => {
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
                {FIELD_TYPES.map((type) => (
                    <PaletteTile
                        key={type}
                        type={type}
                        label={PALETTE_LABELS[type]}
                        icon={TYPE_ICONS[type]}
                        onClick={() => handleAdd(type)}
                    />
                ))}
            </div>
        </Card>
    );
};

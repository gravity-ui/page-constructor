import * as React from 'react';

import {CollisionPriority} from '@dnd-kit/abstract';
import {SortableKeyboardPlugin, isSortable} from '@dnd-kit/dom/sortable';
import {useSortable} from '@dnd-kit/react/sortable';
import {Copy, Grip, TrashBin} from '@gravity-ui/icons';
import {Button, Icon, Label} from '@gravity-ui/uikit';

import {useFormContext} from '../../hooks/FormContext';
import {FormField} from '../../types';
import {formBuilderV2Cn} from '../../utils/cn';
import type {CardDragData} from '../../utils/dragData';
import {isDropAfter, isPaletteData} from '../../utils/dragData';

import {FieldPreview} from './components/FieldPreview';
import {SectionChildrenDropZone, SectionDropData} from './components/SectionChildrenDropZone';

import './CanvasCard.scss';

export type {SectionDropData};

const b = formBuilderV2Cn('canvas-card');

interface CanvasCardProps {
    field: FormField;
    index: number;
    group: string;
}

export const CanvasCard = ({field, index, group}: CanvasCardProps) => {
    const {selectedFieldId, selectField, removeField, duplicateField} = useFormContext();

    const isSelected = selectedFieldId === field.id;
    const hasWhen = 'when' in field && Array.isArray(field.when) && field.when.length > 0;

    const cardData: CardDragData = React.useMemo(() => ({kind: 'card', group}), [group]);

    const {ref, handleRef, isDragSource, isDropTarget, sortable} = useSortable({
        id: field.id,
        index,
        group,
        data: cardData,
        transition: null,
        plugins: [SortableKeyboardPlugin],
        collisionPriority: field.type === 'section' ? CollisionPriority.Low : undefined,
        alignment: {
            x: 'start',
            y: 'center',
        },
    });

    const dragOp = sortable.manager?.dragOperation;
    const source = dragOp?.source;
    const isPaletteSource = isPaletteData(source?.data);
    const sourceIndex = source && isSortable(source) ? source.index : undefined;
    const pointerY = dragOp?.position?.current?.y;
    const targetCenterY = sortable.droppable?.shape?.center?.y;

    const dropAfter =
        isDropTarget &&
        !isDragSource &&
        (isPaletteSource
            ? isDropAfter(pointerY, targetCenterY)
            : sourceIndex !== undefined && sourceIndex < index);

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        selectField(field.id);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
            selectField(field.id);
        }
    };

    return (
        <div
            ref={ref}
            className={b({
                selected: isSelected,
                dragging: isDragSource,
                'drop-target': isDropTarget && !isDragSource && !dropAfter,
                'drop-target-after': dropAfter,
            })}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
        >
            {hasWhen && (
                <div className={b('visibility-badge')}>
                    <Label theme="info" size="s">
                        Visibility by condition
                    </Label>
                </div>
            )}
            <FieldPreview field={field} />

            <div className={b('controls')}>
                <Button
                    ref={handleRef}
                    view="flat"
                    size="xs"
                    className={b('control')}
                    aria-label="Drag to reorder"
                    title="Drag to reorder"
                    onClick={(event) => event.stopPropagation()}
                >
                    <Icon data={Grip} size={12} />
                </Button>
                <Button
                    view="flat"
                    size="xs"
                    onClick={(event) => {
                        event.stopPropagation();
                        duplicateField(field.id);
                    }}
                    title="Duplicate"
                >
                    <Icon data={Copy} size={12} />
                </Button>
                <Button
                    view="flat-danger"
                    size="xs"
                    onClick={(event) => {
                        event.stopPropagation();
                        removeField(field.id);
                    }}
                    title="Remove"
                >
                    <Icon data={TrashBin} size={12} />
                </Button>
            </div>

            {field.type === 'section' && (
                <SectionChildrenDropZone sectionId={field.id} fields={field.fields} />
            )}
        </div>
    );
};

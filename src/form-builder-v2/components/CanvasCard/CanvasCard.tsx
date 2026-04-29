import * as React from 'react';

import {SortableKeyboardPlugin} from '@dnd-kit/dom/sortable';
import {useSortable} from '@dnd-kit/react/sortable';
import {Copy, Grip, TrashBin} from '@gravity-ui/icons';
import {Button, Icon, Label} from '@gravity-ui/uikit';

import {useFormContext} from '../../hooks/FormContext';
import {FormField} from '../../types';
import {formBuilderV2Cn} from '../../utils/cn';
import {asReactRef} from '../../utils/dndRef';

import {FieldPreview} from './components/FieldPreview';
import {
    SECTION_DROP_PREFIX,
    SectionChildrenDropZone,
    SectionDropData,
} from './components/SectionChildrenDropZone';

import './CanvasCard.scss';

export {SECTION_DROP_PREFIX};
export type {SectionDropData};

const b = formBuilderV2Cn('canvas-card');

interface CanvasCardProps {
    field: FormField;
    index: number;
    group: string;
}

export const CanvasCard: React.FC<CanvasCardProps> = ({field, index, group}) => {
    const {selectedFieldId, selectField, removeField, duplicateField} = useFormContext();

    const isSelected = selectedFieldId === field.id;
    const hasWhen = 'when' in field && Array.isArray(field.when) && field.when.length > 0;

    const {ref, handleRef, isDragSource, isDropTarget} = useSortable({
        id: field.id,
        index,
        group,
        data: {group},
        transition: null,
        plugins: [SortableKeyboardPlugin],
    });

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
            ref={asReactRef<HTMLDivElement>(ref)}
            className={b({
                selected: isSelected,
                dragging: isDragSource,
                'drop-target': isDropTarget && !isDragSource,
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
                    ref={asReactRef<HTMLButtonElement>(handleRef)}
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

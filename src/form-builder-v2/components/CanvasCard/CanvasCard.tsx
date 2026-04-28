import * as React from 'react';

import {SortableKeyboardPlugin} from '@dnd-kit/dom/sortable';
import {useDroppable} from '@dnd-kit/react';
import {useSortable} from '@dnd-kit/react/sortable';
import {Copy, Grip, TrashBin} from '@gravity-ui/icons';
import {Button, Icon, Label, Text} from '@gravity-ui/uikit';
import {cloneDeep, set, unset} from 'lodash';

import {componentMap} from '../../../form-generator-v2/components/constants';
import type {Content, OnUpdate} from '../../../form-generator-v2/types';
import {useCanvasContent} from '../../CanvasContentContext';
import {useFormContext} from '../../hooks/FormContext';
import {FormField} from '../../types';
import {formBuilderV2Cn} from '../../utils/cn';
import {asReactRef} from '../../utils/dndRef';
import {evaluateWhen} from '../../utils/evaluateWhen';
import {CanvasList} from '../Canvas/Canvas';

import './CanvasCard.scss';

const b = formBuilderV2Cn('canvas-card');

interface CanvasCardProps {
    field: FormField;
    index: number;
    group: string;
}

export const SECTION_DROP_PREFIX = 'section-drop:';

export interface SectionDropData {
    kind: 'section-drop';
    sectionId: string;
}

interface SectionChildrenDropZoneProps {
    sectionId: string;
    children: React.ReactNode;
    className: string;
}

const SectionChildrenDropZone: React.FC<SectionChildrenDropZoneProps> = ({
    sectionId,
    children,
    className,
}) => {
    const {ref, isDropTarget} = useDroppable({
        id: `${SECTION_DROP_PREFIX}${sectionId}`,
        data: {kind: 'section-drop', sectionId} as SectionDropData,
    });
    return (
        <div
            ref={asReactRef<HTMLDivElement>(ref)}
            className={`${className}${isDropTarget ? ` ${className}_drop-target` : ''}`}
        >
            {children}
        </div>
    );
};

const isTemplateField = (field: FormField): boolean =>
    'name' in field && typeof field.name === 'string' && field.name.includes('{{index}}');

const makeOnUpdate =
    (setContent: React.Dispatch<React.SetStateAction<Content>>): OnUpdate =>
    (key, value, options) => {
        setContent((prev) => {
            const next = cloneDeep(prev);
            if (options?.unset) {
                unset(next, key);
            } else {
                set(next, key, value);
            }
            return next;
        });
    };

export const CanvasCard: React.FC<CanvasCardProps> = ({field, index, group}) => {
    const {selectedFieldId, selectField, removeField, duplicateField} = useFormContext();
    const {content} = useCanvasContent();

    const isSelected = selectedFieldId === field.id;
    const isVisibleByWhen = 'when' in field ? evaluateWhen(field.when, content) : true;

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
                hidden: !isVisibleByWhen,
                'drop-target': isDropTarget && !isDragSource,
            })}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
        >
            {!isVisibleByWhen && (
                <div className={b('hidden-badge')}>
                    <Label theme="warning" size="s">
                        Hidden by condition
                    </Label>
                </div>
            )}
            <FieldPreview field={field} />

            <div className={b('controls')}>
                <button
                    ref={asReactRef<HTMLButtonElement>(handleRef)}
                    className={b('control')}
                    type="button"
                    aria-label="Drag to reorder"
                    title="Drag to reorder"
                    onClick={(event) => event.stopPropagation()}
                >
                    <Icon data={Grip} size={12} />
                </button>
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
                <SectionChildrenDropZone sectionId={field.id} className={b('children')}>
                    <CanvasList fields={field.fields} parentGroup={`section:${field.id}`} />
                    {field.fields.length === 0 && (
                        <Text variant="body-2" color="hint">
                            Empty section. Drag a tile from the palette into this box, or select the
                            section first and click a tile to add it inside.
                        </Text>
                    )}
                </SectionChildrenDropZone>
            )}
        </div>
    );
};

const FieldPreview: React.FC<{field: FormField}> = ({field}) => {
    const {content, setContent, templateContent, setTemplateContent} = useCanvasContent();

    const onUpdateForContent = React.useMemo<OnUpdate>(
        () => makeOnUpdate(setContent),
        [setContent],
    );
    const onUpdateForTemplate = React.useMemo<OnUpdate>(
        () => makeOnUpdate(setTemplateContent),
        [setTemplateContent],
    );

    if (field.type === 'section') {
        return (
            <div className={b('section-header')}>
                <Text variant="subheader-2">{field.title || 'Section'}</Text>
                {field.index ? (
                    <Label theme="info" size="s">
                        Array · {field.itemTitle ?? 'Item {{index}}'}
                    </Label>
                ) : (
                    <Label theme="unknown" size="s">
                        Group
                    </Label>
                )}
            </div>
        );
    }

    const Component = componentMap[field.type] as
        | React.ComponentType<Record<string, unknown>>
        | undefined;
    if (!Component) {
        return null;
    }

    const {
        when: _when,
        id: _id,
        ...fieldProps
    } = field as FormField & {
        when?: unknown;
    };

    const useTemplate = isTemplateField(field);
    const widgetContent = useTemplate ? templateContent : content;
    const onUpdate = useTemplate ? onUpdateForTemplate : onUpdateForContent;

    return (
        <Component
            {...(fieldProps as Record<string, unknown>)}
            content={widgetContent}
            onUpdate={onUpdate}
        />
    );
};

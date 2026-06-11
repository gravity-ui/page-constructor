'use client';

import * as React from 'react';

import type {DragDropEvents} from '@dnd-kit/abstract';
import type {DragDropManager, Draggable, Droppable} from '@dnd-kit/dom';
import {move} from '@dnd-kit/helpers';
import {DragDropProvider, DragOverlay} from '@dnd-kit/react';
import {Code, Eye, Pencil} from '@gravity-ui/icons';
import {Button, Icon, SegmentedRadioGroup} from '@gravity-ui/uikit';

import type {Content} from '../form-generator-v2/types';

import {CanvasContentProvider} from './CanvasContentContext';
import {Canvas} from './components/Canvas/Canvas';
import {ContentTab} from './components/ContentTab/ContentTab';
import {DragOverlayPreview} from './components/DragOverlayPreview/DragOverlayPreview';
import {Inspector} from './components/Inspector/Inspector';
import {PALETTE_DRAGGABLE_PREFIX, Palette} from './components/Palette/Palette';
import {ResizeHandle} from './components/ResizeHandle/ResizeHandle';
import {SchemaPopup} from './components/SchemaPopup/SchemaPopup';
import {FormProvider, useFormContext} from './hooks/FormContext';
import {FormField} from './types';
import {formBuilderV2Cn} from './utils/cn';
import {isDropAfter, isPaletteData, isSectionDropData} from './utils/dragData';
import {applyGroupsMap, buildGroupsMap} from './utils/fieldGroups';
import {findFieldById} from './utils/fieldTree';
import {stripIds} from './utils/stripIds';

import './FormBuilderV2.scss';

const b = formBuilderV2Cn('main');

type DndEvents = DragDropEvents<Draggable, Droppable, DragDropManager>;
type DragEndEvent = Parameters<DndEvents['dragend']>[0];

type Mode = 'edit' | 'preview';

export type FormBuilderDensity = 'full' | 'compact';

const PALETTE_MIN = 160;
const PALETTE_MAX = 400;
const PALETTE_DEFAULT = 220;
const INSPECTOR_MIN = 270;
const INSPECTOR_MAX = 560;
const INSPECTOR_DEFAULT = 320;

interface FormBuilderV2Props {
    className?: string;
    formFields: FormField[];
    onChange?: (fields: FormField[]) => void;

    density?: FormBuilderDensity;
}

interface FormBuilderShellProps {
    className?: string;
    density: FormBuilderDensity;
}

const FormBuilderShell = ({className, density}: FormBuilderShellProps) => {
    const [mode, setMode] = React.useState<Mode>('edit');
    const [canvasContent, setCanvasContent] = React.useState<Content>({});
    const [templateContent, setTemplateContent] = React.useState<Content>({});
    const [paletteWidth, setPaletteWidth] = React.useState(PALETTE_DEFAULT);
    const [inspectorWidth, setInspectorWidth] = React.useState(INSPECTOR_DEFAULT);
    const [schemaPopupOpen, setSchemaPopupOpen] = React.useState(false);
    const schemaButtonRef = React.useRef<HTMLButtonElement | null>(null);

    const isCompact = density === 'compact';

    const {
        formFields,
        setAllFields,
        addField,
        addFieldToSection,
        insertFieldBefore,
        insertFieldAfter,
        moveFieldToSection,
    } = useFormContext();

    const schema = React.useMemo(() => stripIds(formFields), [formFields]);

    const handleDragEnd = React.useCallback(
        (event: DragEndEvent) => {
            if (event.canceled) return;
            const {source, target} = event.operation;
            if (!source) return;

            const paletteData = isPaletteData(source.data) ? source.data : null;
            const isPaletteDrag =
                paletteData !== null || String(source.id).startsWith(PALETTE_DRAGGABLE_PREFIX);

            if (isPaletteDrag) {
                const type = paletteData?.type;
                if (!type) return;
                if (!target) {
                    addField(type);
                    return;
                }

                if (isSectionDropData(target.data)) {
                    addFieldToSection(target.data.sectionId, type);
                    return;
                }

                if (String(target.id) === String(source.id)) {
                    addField(type);
                    return;
                }

                const dropAfter = isDropAfter(
                    event.operation.position?.current?.y,
                    target.shape?.center?.y,
                );
                if (dropAfter) {
                    insertFieldAfter(String(target.id), type);
                } else {
                    insertFieldBefore(String(target.id), type);
                }
                return;
            }

            if (target && isSectionDropData(target.data)) {
                moveFieldToSection(String(source.id), target.data.sectionId);
                return;
            }

            const groups = buildGroupsMap(formFields);
            const nextGroups = move(groups, event);
            const nextFields = applyGroupsMap(nextGroups);
            setAllFields(nextFields);
        },
        [
            addField,
            addFieldToSection,
            formFields,
            insertFieldBefore,
            insertFieldAfter,
            moveFieldToSection,
            setAllFields,
        ],
    );

    const gridStyle = {
        '--fb2-palette-w': `${paletteWidth}px`,
        '--fb2-inspector-w': `${inspectorWidth}px`,
    } as React.CSSProperties;

    return (
        <div className={b({compact: density === 'compact'}, className)}>
            <CanvasContentProvider
                content={canvasContent}
                setContent={setCanvasContent}
                templateContent={templateContent}
                setTemplateContent={setTemplateContent}
            >
                <div className={b('toolbar')}>
                    <SegmentedRadioGroup<Mode>
                        size="m"
                        value={mode}
                        onUpdate={setMode}
                        options={[
                            {
                                value: 'edit',
                                content: (
                                    <span className={b('toolbar-option')}>
                                        <Icon data={Pencil} size={14} />
                                        Edit
                                    </span>
                                ),
                            },
                            {
                                value: 'preview',
                                content: (
                                    <span className={b('toolbar-option')}>
                                        <Icon data={Eye} size={14} />
                                        Preview
                                    </span>
                                ),
                            },
                        ]}
                    />
                    <Button
                        ref={schemaButtonRef}
                        view="outlined"
                        size="m"
                        onClick={() => setSchemaPopupOpen((prev) => !prev)}
                    >
                        <Icon data={Code} size={14} />
                        Schema
                    </Button>
                    <SchemaPopup
                        schema={schema}
                        onApply={setAllFields}
                        open={schemaPopupOpen}
                        onOpenChange={setSchemaPopupOpen}
                        anchorElement={schemaButtonRef.current}
                    />
                </div>

                {mode === 'edit' ? (
                    <DragDropProvider onDragEnd={handleDragEnd}>
                        <div className={b('visual')} style={gridStyle}>
                            <aside className={b('palette')}>
                                <Palette />
                            </aside>
                            {!isCompact && (
                                <ResizeHandle
                                    value={paletteWidth}
                                    min={PALETTE_MIN}
                                    max={PALETTE_MAX}
                                    direction="left"
                                    onChange={setPaletteWidth}
                                />
                            )}
                            <main className={b('canvas')}>
                                <Canvas />
                            </main>
                            <ResizeHandle
                                value={inspectorWidth}
                                min={INSPECTOR_MIN}
                                max={INSPECTOR_MAX}
                                direction="right"
                                onChange={setInspectorWidth}
                            />
                            <aside className={b('inspector')}>
                                <Inspector />
                            </aside>
                        </div>
                        <DragOverlay dropAnimation={null}>
                            {(source) => {
                                if (!source) return null;
                                if (isPaletteData(source.data)) {
                                    return <DragOverlayPreview type={source.data.type} />;
                                }
                                const field = findFieldById(formFields, String(source.id));
                                if (!field) return null;
                                return <DragOverlayPreview type={field.type} field={field} />;
                            }}
                        </DragOverlay>
                    </DragDropProvider>
                ) : (
                    <ContentTab />
                )}
            </CanvasContentProvider>
        </div>
    );
};

export const FormBuilderV2 = ({
    className,
    formFields,
    onChange,
    density = 'full',
}: FormBuilderV2Props) => {
    return (
        <FormProvider formFields={formFields} onChange={onChange}>
            <FormBuilderShell className={className} density={density} />
        </FormProvider>
    );
};

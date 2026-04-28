'use client';

import * as React from 'react';

import type {DragDropEvents} from '@dnd-kit/abstract';
import type {DragDropManager, Draggable, Droppable} from '@dnd-kit/dom';
import {move} from '@dnd-kit/helpers';
import {DragDropProvider, DragOverlay} from '@dnd-kit/react';
import {Copy, Eye, Pencil} from '@gravity-ui/icons';
import {Button, Card, Icon, Popup, SegmentedRadioGroup, Text} from '@gravity-ui/uikit';

import type {Content} from '../form-generator-v2/types';

import {CanvasContentProvider} from './CanvasContentContext';
import {Canvas} from './components/Canvas/Canvas';
import type {SectionDropData} from './components/CanvasCard/CanvasCard';
import {ContentTab} from './components/ContentTab/ContentTab';
import {DragOverlayPreview} from './components/DragOverlayPreview/DragOverlayPreview';
import {Inspector} from './components/Inspector/Inspector';
import {PALETTE_DRAGGABLE_PREFIX, Palette} from './components/Palette/Palette';
import type {PaletteDragData} from './components/Palette/Palette';
import {ResizeHandle} from './components/ResizeHandle/ResizeHandle';
import {FormProvider, useFormContext} from './hooks/FormContext';
import {applyGroupsMap, buildGroupsMap} from './hooks/useFormFields';
import {FormField} from './types';
import {formBuilderV2Cn} from './utils/cn';
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
const INSPECTOR_MIN = 240;
const INSPECTOR_MAX = 560;
const INSPECTOR_DEFAULT = 320;

interface FormBuilderV2Props {
    className?: string;
    formFields: FormField[];
    onChange?: (fields: FormField[]) => void;

    density?: FormBuilderDensity;
}

export const FormBuilderV2: React.FC<FormBuilderV2Props> = ({
    className,
    formFields,
    onChange,
    density = 'full',
}) => {
    return (
        <FormProvider formFields={formFields} onChange={onChange}>
            <FormBuilderShell className={className} density={density} />
        </FormProvider>
    );
};

interface FormBuilderShellProps {
    className?: string;
    density: FormBuilderDensity;
}

const FormBuilderShell: React.FC<FormBuilderShellProps> = ({className, density}) => {
    const [mode, setMode] = React.useState<Mode>('edit');
    const [canvasContent, setCanvasContent] = React.useState<Content>({});
    const [templateContent, setTemplateContent] = React.useState<Content>({});
    const [paletteWidth, setPaletteWidth] = React.useState(PALETTE_DEFAULT);
    const [inspectorWidth, setInspectorWidth] = React.useState(INSPECTOR_DEFAULT);
    const [schemaPopupOpen, setSchemaPopupOpen] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const copyButtonRef = React.useRef<HTMLButtonElement | null>(null);

    const isCompact = density === 'compact';

    const {
        formFields,
        setAllFields,
        addField,
        addFieldToSection,
        insertFieldBefore,
        moveFieldToSection,
    } = useFormContext();

    const schema = React.useMemo(() => stripIds(formFields), [formFields]);
    const schemaJson = React.useMemo(() => JSON.stringify(schema, null, 2), [schema]);

    const handleCopy = React.useCallback(async () => {
        try {
            await navigator.clipboard.writeText(schemaJson);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setSchemaPopupOpen(false);
            }, 900);
        } catch {}
    }, [schemaJson]);

    const handleDragEnd = React.useCallback(
        (event: DragEndEvent) => {
            if (event.canceled) return;
            const {source, target} = event.operation;
            if (!source) return;

            const paletteData = source.data as PaletteDragData | undefined;
            const isPaletteDrag =
                paletteData?.kind === 'palette' ||
                String(source.id).startsWith(PALETTE_DRAGGABLE_PREFIX);

            if (isPaletteDrag) {
                const type = paletteData?.type;
                if (!type) return;
                if (!target) {
                    addField(type);
                    return;
                }

                const sectionDropData = target.data as SectionDropData | undefined;
                if (sectionDropData?.kind === 'section-drop') {
                    addFieldToSection(sectionDropData.sectionId, type);
                    return;
                }

                if (String(target.id) === String(source.id)) {
                    addField(type);
                    return;
                }

                insertFieldBefore(String(target.id), type);
                return;
            }

            const sectionDropTarget = target?.data as SectionDropData | undefined;
            if (sectionDropTarget?.kind === 'section-drop') {
                moveFieldToSection(String(source.id), sectionDropTarget.sectionId);
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
                    <SegmentedRadioGroup
                        size="m"
                        value={mode}
                        onUpdate={(next) => setMode(next as Mode)}
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
                        ref={copyButtonRef}
                        view="outlined"
                        size="m"
                        onClick={() => setSchemaPopupOpen((prev) => !prev)}
                    >
                        <Icon data={Copy} size={14} />
                        Copy schema
                    </Button>
                    <Popup
                        anchorElement={copyButtonRef.current}
                        open={schemaPopupOpen}
                        onOpenChange={(open) => setSchemaPopupOpen(open)}
                        placement="bottom-end"
                    >
                        <Card className={b('schema-popup')} view="outlined">
                            <div className={b('schema-popup-header')}>
                                <Text variant="subheader-2">Form schema</Text>
                                <Text variant="caption-1" color="hint">
                                    Paste this into your block&rsquo;s <code>inputs</code> property.
                                </Text>
                            </div>
                            <pre className={b('schema-popup-json')}>{schemaJson}</pre>
                            <div className={b('schema-popup-actions')}>
                                <Button view="action" size="m" onClick={handleCopy}>
                                    {copied ? '✓ Copied' : 'Copy to clipboard'}
                                </Button>
                                <Button
                                    view="flat"
                                    size="m"
                                    onClick={() => setSchemaPopupOpen(false)}
                                >
                                    Close
                                </Button>
                            </div>
                        </Card>
                    </Popup>
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
                                const data = source.data as
                                    | PaletteDragData
                                    | {group?: string}
                                    | undefined;

                                if (data && (data as PaletteDragData).kind === 'palette') {
                                    return (
                                        <DragOverlayPreview type={(data as PaletteDragData).type} />
                                    );
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

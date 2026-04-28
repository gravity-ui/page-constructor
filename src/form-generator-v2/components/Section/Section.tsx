import * as React from 'react';

import {EllipsisVertical, Plus, TrashBin} from '@gravity-ui/icons';
import {ArrowToggle, Button, Card, Dialog, DropdownMenu, Icon, Text} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../../models/common';
import {CommonProps, SectionField} from '../../types';
import {formGeneratorCn} from '../../utils/cn';
import {
    clearSectionFormContent,
    findAllNames,
    findNameWithIndexName,
    getArrayPathForNameWithIndexName,
    getSpliceTarget,
    getValueByPath,
    sectionHasContentData,
} from '../../utils/fields';
import Base from '../Base/Base';
import Fields from '../Fields/Fields';

import {SectionOpenContext} from './SectionOpenContext';

import './Section.scss';

const b = formGeneratorCn('section');

const makeRowKey = (): string =>
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `row-${Math.random().toString(36).slice(2, 11)}`;

type SectionProp = ClassNameProps & CommonProps & SectionField;

const Section = ({
    title,
    opened,
    fields,
    when,
    content,
    onUpdate,
    className,
    index,
    withAddButton,
    itemTitle,
    itemView,
}: SectionProp) => {
    const isGroupMode = index !== undefined;

    const parentContext = React.useContext(SectionOpenContext);
    const nestingLevel = parentContext?.nestingLevel ?? 0;

    // --- Static section state ---
    const [isOpened, setOpened] = React.useState(opened);
    const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
    const hasData = sectionHasContentData(fields, content);
    const showArrowTogler = hasData || isOpened;
    const prevHasDataRef = React.useRef<boolean | null>(null);

    React.useEffect(() => {
        if (isGroupMode) return;
        const hadData = prevHasDataRef.current;
        if (hadData === true && !hasData) {
            setOpened(false);
        }
        prevHasDataRef.current = hasData;
    }, [hasData, isGroupMode]);

    const handleConfirmClear = () => {
        if (onUpdate) {
            clearSectionFormContent(fields, onUpdate);
        }
        setConfirmDialogOpen(false);
        setOpened(false);
    };

    // --- Group mode state ---
    const [rowKeys, setRowKeys] = React.useState<string[]>([]);

    const nameWithIndexName = React.useMemo(
        () => (isGroupMode && index ? findNameWithIndexName(fields, index) : undefined),
        [fields, index, isGroupMode],
    );

    const arrayPath = React.useMemo(
        () =>
            nameWithIndexName && index
                ? getArrayPathForNameWithIndexName(nameWithIndexName, index)
                : undefined,
        [nameWithIndexName, index],
    );

    const valuesInside = React.useMemo(
        () => (arrayPath ? getValueByPath(content, arrayPath) : undefined),
        [arrayPath, content],
    );
    const valuesInsideLength = Array.isArray(valuesInside) ? valuesInside.length : 0;

    React.useEffect(() => {
        if (!isGroupMode) return;
        if (!nameWithIndexName || !arrayPath) {
            setRowKeys((prev) => (prev.length === 0 ? [makeRowKey()] : prev));
            return;
        }
        if (!content) {
            return;
        }

        setRowKeys((prev) => {
            if (prev.length === valuesInsideLength) {
                return prev;
            }
            if (valuesInsideLength > prev.length) {
                return [
                    ...prev,
                    ...Array.from({length: valuesInsideLength - prev.length}, makeRowKey),
                ];
            }
            return prev.slice(0, valuesInsideLength);
        });
    }, [content, arrayPath, nameWithIndexName, valuesInside, valuesInsideLength, isGroupMode]);

    const replaceIndex = (i: number) =>
        fields ? JSON.parse(JSON.stringify(fields).replaceAll(`{{${index}}}`, String(i))) : fields;

    const handleAdd = () => {
        if (arrayPath && onUpdate) {
            const next = Array.isArray(valuesInside) ? [...valuesInside, {}] : [{}];
            onUpdate(arrayPath, next);
            return;
        }
        setRowKeys((prev) => [...prev, makeRowKey()]);
    };

    const deleteItem = (itemIndex: number) => () => {
        if (!nameWithIndexName || !onUpdate || !index) {
            return;
        }

        const names = findAllNames(replaceIndex(itemIndex));
        const resolvedName =
            names.find((name) => {
                const splice = getSpliceTarget(nameWithIndexName, name, index);
                return splice !== undefined && splice.itemIndex === itemIndex;
            }) ?? names[0];

        if (!resolvedName) {
            return;
        }

        const spliceTarget = getSpliceTarget(nameWithIndexName, resolvedName, index);
        if (!spliceTarget) {
            return;
        }

        onUpdate(spliceTarget.arrayPath, undefined, {removeArrayItemAt: spliceTarget.itemIndex});
        setRowKeys((prev) => prev.filter((_key, keyIndex) => keyIndex !== itemIndex));
    };

    // --- Group mode render ---
    if (isGroupMode) {
        const hasGroupLabel = Boolean(title);
        const isEmpty = rowKeys.length === 0;
        const isGroupOpen = isOpened ?? true;
        const resolvedItemTitle = (i: number) => {
            const src = itemTitle || title;
            return src ? src.replaceAll(`{{${index}}}`, String(i)) : undefined;
        };
        const labelTemplate = itemTitle || title;
        const addButtonLabel = labelTemplate
            ? labelTemplate.replaceAll(`{{${index}}}`, String(rowKeys.length))
            : 'Add';

        const renderItem = (rowKey: string, rowIndex: number) => {
            const cardTitle = resolvedItemTitle(rowIndex);
            const header = (
                <div className={b('card-header')}>
                    {cardTitle && (
                        <Text variant="subheader-2" className={b('card-title')}>
                            {cardTitle}
                        </Text>
                    )}
                    <Button view="flat" onClick={deleteItem(rowIndex)}>
                        <Icon width={16} height={16} data={TrashBin} />
                    </Button>
                </div>
            );
            const inner = (
                <SectionOpenContext.Provider value={{isOpen: true, nestingLevel: nestingLevel + 1}}>
                    <Fields fields={replaceIndex(rowIndex)} content={content} onUpdate={onUpdate} />
                </SectionOpenContext.Provider>
            );

            if (itemView === 'clear') {
                return (
                    <div key={rowKey} className={b('item-clear')}>
                        {header}
                        {inner}
                    </div>
                );
            }
            return (
                <Card key={rowKey} className={b('card')}>
                    {header}
                    {inner}
                </Card>
            );
        };

        return (
            <Base when={when} content={content}>
                <div className={b({nested: nestingLevel > 0}, className)}>
                    {hasGroupLabel && (
                        <div className={b('header')}>
                            <button
                                type="button"
                                className={b('header-button', {'with-hover': isEmpty})}
                                onClick={isEmpty ? handleAdd : () => setOpened((prev) => !prev)}
                            >
                                {!isEmpty && (
                                    <ArrowToggle
                                        direction={isGroupOpen ? 'top' : 'bottom'}
                                        className={b('arrow')}
                                    />
                                )}
                                <Text variant="subheader-1" color="hint" className={b('title')}>
                                    {title}
                                </Text>
                                {isEmpty && <Plus width={16} height={16} className={b('plus')} />}
                            </button>
                        </div>
                    )}
                    <div
                        className={b('children', {
                            opened: !isEmpty && (!hasGroupLabel || isGroupOpen),
                        })}
                    >
                        <div className={b('children-inner')}>
                            {rowKeys.map((rowKey, rowIndex) => renderItem(rowKey, rowIndex))}
                            {withAddButton && !isEmpty && (
                                <Button onClick={handleAdd}>
                                    <Icon data={Plus} width={16} height={16} />
                                    {addButtonLabel}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </Base>
        );
    }

    // --- Static section render ---
    return (
        <Base when={when} content={content}>
            <React.Fragment>
                <div className={b({opened: isOpened, nested: nestingLevel > 0}, className)}>
                    <div className={b('header')}>
                        <button
                            type="button"
                            className={b('header-button', {
                                'with-hover': !showArrowTogler,
                            })}
                            onClick={() => setOpened((prev) => !prev)}
                        >
                            {showArrowTogler && (
                                <ArrowToggle
                                    direction={isOpened ? 'top' : 'bottom'}
                                    className={b('arrow')}
                                />
                            )}
                            <Text variant="subheader-1" color="hint" className={b('title')}>
                                {title}
                            </Text>
                        </button>
                        <div className={b('dropdown', {opened: isOpened})}>
                            <DropdownMenu
                                icon={<Icon data={EllipsisVertical} width={16} height={16} />}
                                items={[
                                    {
                                        text: 'Clear all fields',
                                        action: () => setConfirmDialogOpen(true),
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div className={b('children', {opened: isOpened})}>
                        <div className={b('children-inner')}>
                            <SectionOpenContext.Provider
                                value={{isOpen: isOpened ?? false, nestingLevel: nestingLevel + 1}}
                            >
                                <Fields
                                    className={b('fields')}
                                    fields={fields}
                                    content={content}
                                    onUpdate={onUpdate}
                                />
                            </SectionOpenContext.Provider>
                        </div>
                    </div>
                </div>
                <Dialog
                    open={confirmDialogOpen}
                    onClose={() => setConfirmDialogOpen(false)}
                    size="s"
                >
                    <Dialog.Header caption="Clear all fields in this block?" />
                    <Dialog.Body>
                        <Text variant="body-1">
                            All field values will be deleted, and the block settings will be reset
                            to their default state.
                        </Text>
                    </Dialog.Body>
                    <Dialog.Footer
                        textButtonApply="Approve"
                        textButtonCancel="Cancel"
                        onClickButtonApply={handleConfirmClear}
                        onClickButtonCancel={() => setConfirmDialogOpen(false)}
                    />
                </Dialog>
            </React.Fragment>
        </Base>
    );
};

export default Section;

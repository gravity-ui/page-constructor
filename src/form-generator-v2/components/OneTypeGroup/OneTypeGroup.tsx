import * as React from 'react';
import Base from '../Base/Base';
import {Button, Card, Icon, Text} from '@gravity-ui/uikit';
import './OneTypeGroup.scss';
import Fields from '../Fields/Fields';
import {SectionOpenContext} from '../Section/SectionOpenContext';
import {formGeneratorCn} from '../../utils/cn';
import {TrashBin} from '@gravity-ui/icons';
import {
    findAllNames,
    findNameWithIndexName,
    getArrayPathForNameWithIndexName,
    getSpliceTarget,
    getValueByPath,
} from '../../utils/fields';
import {CommonProps, OneTypeGroupField} from '../../types';

const b = formGeneratorCn('one-type-group');

const makeRowKey = (): string =>
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `row-${Math.random().toString(36).slice(2, 11)}`;

type OneTypeGroupProps = CommonProps & OneTypeGroupField;

const OneTypeGroup = ({
    title,
    index,
    withAddButton,
    fields,
    when,
    content,
    onUpdate,
}: OneTypeGroupProps) => {
    const [rowKeys, setRowKeys] = React.useState<string[]>([]);
    const sectionIsOpen = React.useContext(SectionOpenContext);
    const prevSectionOpenRef = React.useRef(false);

    const nameWithIndexName = React.useMemo(
        () => findNameWithIndexName(fields, index),
        [fields, index],
    );

    const arrayPath = React.useMemo(
        () =>
            nameWithIndexName
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
        const justOpened = Boolean(sectionIsOpen) && !prevSectionOpenRef.current;
        prevSectionOpenRef.current = Boolean(sectionIsOpen);

        if (!justOpened || !arrayPath || !onUpdate) {
            return;
        }

        if (valuesInsideLength > 0) {
            return;
        }

        onUpdate(arrayPath, [{}]);
    }, [sectionIsOpen, arrayPath, content, onUpdate, valuesInside]);

    React.useEffect(() => {
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
    }, [content, arrayPath, nameWithIndexName, valuesInside, valuesInsideLength]);

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
        if (!nameWithIndexName || !onUpdate) {
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

    return (
        <Base when={when} content={content}>
            {rowKeys.map((rowKey, rowIndex) => (
                <Card key={rowKey} className={b()}>
                    <div className={b('card-header')}>
                        <Text variant="subheader-2" className={b('title')}>
                            {title.replaceAll(`{{${index}}}`, String(rowIndex))}
                        </Text>
                        <Button view="flat" onClick={deleteItem(rowIndex)}>
                            <Icon width={16} height={16} data={TrashBin} />
                        </Button>
                    </div>
                    <Fields fields={replaceIndex(rowIndex)} content={content} onUpdate={onUpdate} />
                </Card>
            ))}
            {withAddButton && <Button onClick={handleAdd}>Add</Button>}
        </Base>
    );
};

export default OneTypeGroup;

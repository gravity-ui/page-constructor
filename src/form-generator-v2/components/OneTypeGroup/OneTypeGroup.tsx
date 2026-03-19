import * as React from 'react';
import _ from 'lodash';
import Base from '../Base/Base';
import {Button, Card, Icon, Text} from '@gravity-ui/uikit';
import './OneTypeGroup.scss';
import Fields from '../Fields/Fields';
import {SectionOpenContext} from '../Section/SectionOpenContext';
import {formGeneratorCn} from '../../utils/cn';
import {TrashBin} from '@gravity-ui/icons';
import {
    findAllNames,
    findNameWithPlaceholder,
    getArrayPathForPlaceholder,
    getSpliceTarget,
} from '../../utils/fields';

const b = formGeneratorCn('one-type-group');

const makeRowKey = (): string =>
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `row-${Math.random().toString(36).slice(2, 11)}`;

const OneTypeGroup = ({title, index, withAddButton, fields, when, content, onUpdate}) => {
    const [rowKeys, setRowKeys] = React.useState<string[]>([]);
    const sectionIsOpen = React.useContext(SectionOpenContext);
    const prevSectionOpenRef = React.useRef(false);

    const templateName = React.useMemo(
        () => findNameWithPlaceholder(fields, index),
        [fields, index],
    );

    const arrayPath = React.useMemo(
        () => (templateName ? getArrayPathForPlaceholder(templateName, index) : undefined),
        [templateName, index],
    );

    /** При первом открытии родительской Section — один элемент в пустом массиве (кнопка Add не считается). */
    React.useEffect(() => {
        const open = sectionIsOpen === true;
        const justOpened = open && !prevSectionOpenRef.current;
        prevSectionOpenRef.current = open;

        if (!justOpened || !arrayPath || !onUpdate) {
            return;
        }

        const raw = _.get(content, arrayPath);
        const len = Array.isArray(raw) ? raw.length : 0;
        if (len > 0) {
            return;
        }

        onUpdate(arrayPath, [{}]);
    }, [sectionIsOpen, arrayPath, content, onUpdate]);

    React.useEffect(() => {
        if (!templateName || !arrayPath) {
            setRowKeys((prev) => (prev.length === 0 ? [makeRowKey()] : prev));
            return;
        }
        if (content === undefined || content === null) {
            return;
        }

        const raw = _.get(content, arrayPath);
        const len = Array.isArray(raw) ? raw.length : 0;

        setRowKeys((prev) => {
            if (prev.length === len) {
                return prev;
            }
            if (len > prev.length) {
                return [...prev, ...Array.from({length: len - prev.length}, makeRowKey)];
            }
            return prev.slice(0, len);
        });
    }, [content, arrayPath, templateName]);

    const replaceIndex = (i: number) =>
        fields ? JSON.parse(JSON.stringify(fields).replaceAll(`{{${index}}}`, String(i))) : fields;

    const handleAdd = () => {
        if (arrayPath && onUpdate) {
            const arr = _.get(content, arrayPath);
            const next = Array.isArray(arr) ? [...arr, {}] : [{}];
            onUpdate(arrayPath, next);
            return;
        }
        setRowKeys((prev) => [...prev, makeRowKey()]);
    };

    const deleteItem = (i: number) => () => {
        const templateName = findNameWithPlaceholder(fields, index);
        if (!templateName || !onUpdate) {
            return;
        }

        const names = findAllNames(replaceIndex(i));
        const resolvedName =
            names.find((n) => {
                const splice = getSpliceTarget(templateName, n, index);
                return splice !== undefined && splice.itemIndex === i;
            }) ?? names[0];

        if (!resolvedName) {
            return;
        }

        const spliceTarget = getSpliceTarget(templateName, resolvedName, index);
        if (!spliceTarget) {
            return;
        }

        onUpdate(spliceTarget.arrayPath, undefined, {removeArrayItemAt: spliceTarget.itemIndex});
        setRowKeys((prev) => prev.filter((_, ind) => ind !== i));
    };

    return (
        <Base when={when} content={content}>
            {rowKeys.map((rowKey, i) => (
                <Card key={rowKey} className={b()}>
                    <div className={b('card-header')}>
                        <Text variant="subheader-2" className={b('title')}>
                            {title.replaceAll(`{{${index}}}`, String(i))}
                        </Text>
                        <Button view="flat" onClick={deleteItem(i)}>
                            <Icon width={16} height={16} data={TrashBin} />
                        </Button>
                    </div>
                    <Fields fields={replaceIndex(i)} content={content} onUpdate={onUpdate} />
                </Card>
            ))}
            {withAddButton && <Button onClick={handleAdd}>Add</Button>}
        </Base>
    );
};

export default OneTypeGroup;

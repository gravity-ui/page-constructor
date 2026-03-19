import * as React from 'react';
import Base from '../Base/Base';
import {Button, Card, Icon, Text} from '@gravity-ui/uikit';
import './OneTypeGroup.scss';
import Fields from '../Fields/Fields';
import {formGeneratorCn} from '../../utils/cn';
import {TrashBin} from '@gravity-ui/icons';
import {findAllNames, findNameWithPlaceholder, getSpliceTarget} from '../../utils/fields';

const b = formGeneratorCn('one-type-group');

const makeRowKey = (): string =>
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `row-${Math.random().toString(36).slice(2, 11)}`;

const OneTypeGroup = ({title, index, withAddButton, fields, when, content, onUpdate}) => {
    const [rowKeys, setRowKeys] = React.useState(() => [makeRowKey()]);

    const replaceIndex = (i: number) =>
        fields ? JSON.parse(JSON.stringify(fields).replaceAll(`{{${index}}}`, String(i))) : fields;

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
            {withAddButton && (
                <Button onClick={() => setRowKeys((prev) => [...prev, makeRowKey()])}>Add</Button>
            )}
        </Base>
    );
};

export default OneTypeGroup;

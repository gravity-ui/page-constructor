import {Plus} from '@gravity-ui/icons';
import {Button, Card, Icon} from '@gravity-ui/uikit';
import * as React from 'react';

import {ArrayObjectInput, ArrayTextInput, DynamicFormValue} from '../../../../../../common/types';
import {removeFromArray, swapArrayItems} from '../../../../utils';
import {editorCn} from '../../../../utils/cn';
import DynamicForm from '../../DynamicForm';
import FieldBase from '../../FieldBase/FieldBase';
import Text from '../Text/Text';

import './Array.scss';
import ItemButton from './ItemButton/ItemButton';

const b = editorCn('array-dynamic-field');

type ArrayInput = ArrayTextInput | ArrayObjectInput;

interface ArrayFieldProps {
    title: string;
    values: Array<DynamicFormValue>;
    onUpdate: (key: string, value: DynamicFormValue) => void;
    blockConfig: ArrayInput;
    className?: string;
}

const ArrayDynamicField = ({title, values, onUpdate, className, blockConfig}: ArrayFieldProps) => {
    const haveItems = values && Array.isArray(values) && values.length;

    const onAddItem = React.useCallback(() => {
        if (blockConfig.arrayType === 'text') {
            onUpdate('', haveItems ? [...values, ''] : ['']);
        } else if (blockConfig.arrayType === 'object') {
            onUpdate('', haveItems ? [...values, {}] : [{}]);
        }
    }, [blockConfig.arrayType, haveItems, onUpdate, values]);

    const onDeleteItem = React.useCallback(
        (index: number) => {
            if (Array.isArray(values)) {
                const newArray = removeFromArray(values, index);
                onUpdate('', newArray);
            }
        },
        [onUpdate, values],
    );

    const onReorderItem = React.useCallback(
        (index: number, placement: 'up' | 'down') => {
            if (Array.isArray(values)) {
                const newArray = swapArrayItems(
                    values,
                    index,
                    placement === 'up' ? index - 1 : index + 1,
                );
                onUpdate('', newArray);
            }
        },
        [onUpdate, values],
    );

    const renderInput = React.useCallback(
        (value: DynamicFormValue, index: number) => {
            const arrayItemButton = (
                <ItemButton
                    onRemove={() => onDeleteItem(index)}
                    onReorderUp={() => onReorderItem(index, 'up')}
                    onReorderDown={() => onReorderItem(index, 'down')}
                    disableReorderUp={index === 0}
                    disableReorderDown={Boolean(haveItems) && values.length === index + 1}
                />
            );

            switch (blockConfig.arrayType) {
                case 'text': {
                    return (
                        <div className={b('row')}>
                            <Text
                                className={b('row-field')}
                                value={String(value)}
                                onUpdate={(updateValue) => onUpdate(`[${index}]`, updateValue)}
                                onRefresh={(updatedValue) => onUpdate('', updatedValue)}
                            />
                            {arrayItemButton}
                        </div>
                    );
                }
                case 'object': {
                    if (!blockConfig.properties) {
                        return null;
                    }
                    return (
                        <Card key={index} className={b('card')}>
                            <div className={`${b('row')} ${b('card-head')}`}>
                                <div className={b('row-title')}>#{index}</div>
                                {arrayItemButton}
                            </div>
                            <DynamicForm
                                contentConfig={value}
                                blockConfig={blockConfig.properties}
                                onUpdate={(key, updateValue) =>
                                    onUpdate(`[${index}].${key}`, updateValue)
                                }
                            />
                        </Card>
                    );
                }
                default: {
                    return null;
                }
            }
        },
        [blockConfig, haveItems, onDeleteItem, onReorderItem, onUpdate, values],
    );

    const renderInputs = React.useCallback(() => {
        if (haveItems) {
            const renderItems = values
                .map(renderInput)
                .filter(Boolean) as unknown as React.ReactNode[];
            return (
                <React.Fragment>
                    {renderItems}
                    <Button className={b('add-button')} onClick={onAddItem}>
                        <Icon data={Plus} />
                        {blockConfig.buttonText}
                    </Button>
                </React.Fragment>
            );
        } else {
            return (
                <div className={b('empty')}>
                    <Button className={b('add-button')} onClick={onAddItem}>
                        <Icon data={Plus} />
                        Please, add new item
                    </Button>
                </div>
            );
        }
    }, [blockConfig.buttonText, haveItems, onAddItem, renderInput, values]);

    return (
        <FieldBase
            title={title}
            className={b(null, className)}
            onRefresh={(value) => onUpdate('', value)}
            expandable
        >
            <Card className={b('card')}>{renderInputs()}</Card>
        </FieldBase>
    );
};

export default ArrayDynamicField;

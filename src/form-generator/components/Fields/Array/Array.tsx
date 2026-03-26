import {Plus} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import * as React from 'react';

import {ArrayObjectInput, ArrayTextInput, DynamicFormValue} from '../../../types';
import {removeFromArray, swapArrayItems} from '../../../../editor-v2/utils';
import {formGeneratorCn} from '../../../utils/cn';
import DynamicForm from '../../../FormGenerator';
import FieldBase from '../../FieldBase/FieldBase';
import Text from '../Text/Text';
import ItemButton from './ItemButton/ItemButton';

import './Array.scss';

const b = formGeneratorCn('array-dynamic-field');

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
                        <div key={index} className={b('card')}>
                            <div className={`${b('row')} ${b('card-head')}`}>
                                <div className={b('row-title')}>Item {index + 1}</div>
                                {arrayItemButton}
                            </div>
                            <DynamicForm
                                contentConfig={value as object}
                                blockConfig={blockConfig.properties}
                                onUpdateByKey={(key, updateValue) =>
                                    onUpdate(`[${index}].${key}`, updateValue)
                                }
                            />
                        </div>
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
            {renderInputs()}
        </FieldBase>
    );
};

export default ArrayDynamicField;

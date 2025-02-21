import React from 'react';

import {Card} from '@gravity-ui/uikit';

import {ConfigInput, DynamicFormValue} from '../../../../../common/types';
import {ClassNameProps, PageContent} from '../../../../../models';
import {block} from '../../../../../utils';
import DynamicForm from '../../DynamicForm';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

import './Object.scss';

const b = block('object-dynamic-field');

interface ObjectDynamicFieldProps extends ClassNameProps, FieldBaseParams {
    value: PageContent;
    onUpdate: (key: string, value: DynamicFormValue) => void;
    blockConfig: Array<ConfigInput>;
}

const ObjectDynamicField: React.FC<ObjectDynamicFieldProps> = (props) => {
    const {title, value, onUpdate, className, blockConfig} = props;

    return (
        <FieldBase
            title={title}
            className={b(null, className)}
            onRefresh={(updatedValue) => onUpdate('', updatedValue)}
            expandable
        >
            <Card className={b('card')}>
                <DynamicForm contentConfig={value} blockConfig={blockConfig} onUpdate={onUpdate} />
            </Card>
        </FieldBase>
    );
};

export default ObjectDynamicField;

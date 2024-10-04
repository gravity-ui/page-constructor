import React from 'react';

import {Switch} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../../../../models';
import {block} from '../../../../../utils';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

const b = block('boolean-dynamic-field');

interface BooleanProps extends ClassNameProps, FieldBaseParams {
    value: string;
    onUpdate: (value: boolean | undefined) => void;
}

const BooleanDynamicField: React.FC<BooleanProps> = (props) => {
    const {title, value, onUpdate, className} = props;

    return (
        <FieldBase title={title} className={b(null, className)} onRefresh={onUpdate}>
            <Switch checked={Boolean(value)} onUpdate={onUpdate} />
        </FieldBase>
    );
};

export default BooleanDynamicField;

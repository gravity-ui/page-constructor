import React from 'react';

import {TextInput} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../../../../models';
import {block} from '../../../../../utils';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

const b = block('text-dynamic-field');

interface TextDynamicFieldProps extends ClassNameProps, FieldBaseParams {
    value: string;
    onUpdate: (value: string | undefined) => void;
}

const TextDynamicField: React.FC<TextDynamicFieldProps> = (props) => {
    const {title, value, onUpdate, className} = props;

    return (
        <FieldBase title={title} className={b(null, className)} onRefresh={onUpdate}>
            <TextInput value={value || ''} onUpdate={onUpdate} />
        </FieldBase>
    );
};

export default TextDynamicField;

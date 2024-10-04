import React from 'react';

import {TextArea} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../../../../models';
import {block} from '../../../../../utils';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

const b = block('textarea-dynamic-field');

interface TextAreaDynamicFieldProps extends ClassNameProps, FieldBaseParams {
    value: string;
    onUpdate: (value: string | undefined) => void;
}

const TextAreaDynamicField: React.FC<TextAreaDynamicFieldProps> = (props) => {
    const {title, value, onUpdate, className} = props;

    return (
        <FieldBase title={title} className={b(null, className)} onRefresh={onUpdate}>
            <TextArea minRows={5} maxRows={20} value={value || ''} onUpdate={onUpdate} />
        </FieldBase>
    );
};

export default TextAreaDynamicField;

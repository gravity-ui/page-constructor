import {TextInput} from '@gravity-ui/uikit';
import React from 'react';

import {editorCn} from '../../../../utils/cn';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

const b = editorCn('text-dynamic-field');

interface TextDynamicFieldProps extends FieldBaseParams {
    value: string;
    onUpdate: (value: string | undefined) => void;
    className?: string;
}

const TextDynamicField = ({title, value, onUpdate, className}: TextDynamicFieldProps) => {
    return (
        <FieldBase title={title} className={b(null, className)} onRefresh={onUpdate}>
            <TextInput value={value || ''} onUpdate={onUpdate} />
        </FieldBase>
    );
};

export default TextDynamicField;

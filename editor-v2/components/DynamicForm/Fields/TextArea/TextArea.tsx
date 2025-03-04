import {TextArea} from '@gravity-ui/uikit';
import React from 'react';

import {editorCn} from '../../../../utils/cn';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

const b = editorCn('textarea-dynamic-field');

interface TextAreaDynamicFieldProps extends FieldBaseParams {
    value: string;
    onUpdate: (value: string | undefined) => void;
    className?: string;
}

const TextAreaDynamicField = ({title, value, onUpdate, className}: TextAreaDynamicFieldProps) => {
    return (
        <FieldBase title={title} className={b(null, className)} onRefresh={onUpdate}>
            <TextArea minRows={5} maxRows={20} value={value || ''} onUpdate={onUpdate} />
        </FieldBase>
    );
};

export default TextAreaDynamicField;

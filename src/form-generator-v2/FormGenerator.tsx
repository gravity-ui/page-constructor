import * as React from 'react';

import {cloneDeep, set, unset} from 'lodash';

import {DynamicFormValue} from '../form-generator/types';

import Fields from './components/Fields/Fields';
import {Content, Fields as FieldsType} from './types';
import {getValueByPath} from './utils/fields';

type FormGeneratorProps = {
    blockConfig: FieldsType;
    contentConfig: Content;
    onUpdate: (content: Content) => void;
};

const FormGenerator = ({blockConfig, contentConfig, onUpdate}: FormGeneratorProps) => {
    const contentRef = React.useRef(contentConfig);

    React.useEffect(() => {
        contentRef.current = contentConfig;
    }, [contentConfig]);

    const onDataUpdate = React.useCallback(
        (
            key: string,
            value: DynamicFormValue,
            options?: {removeArrayItemAt?: number; unset?: boolean},
        ) => {
            if (!onUpdate) {
                return;
            }

            const newContentConfig = cloneDeep(contentRef.current ?? {});

            const removeAt = options?.removeArrayItemAt;
            if (typeof removeAt === 'number') {
                const arr = getValueByPath(newContentConfig, key);
                if (Array.isArray(arr) && removeAt >= 0 && removeAt < arr.length) {
                    arr.splice(removeAt, 1);
                }
            } else if (options?.unset) {
                unset(newContentConfig, key);
            } else {
                set(newContentConfig, key, value);
            }

            contentRef.current = newContentConfig;
            onUpdate(newContentConfig);
        },
        [onUpdate],
    );

    return <Fields fields={blockConfig} content={contentConfig} onUpdate={onDataUpdate} />;
};

export default FormGenerator;

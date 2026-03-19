import * as React from 'react';
import {DynamicFormValue} from '../form-generator/types';
import _ from 'lodash';
import Fields from './components/Fields/Fields';

const FormGenerator = ({blockConfig, contentConfig, onUpdate}) => {
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

            const newContentConfig = _.cloneDeep(contentRef.current ?? {});

            const removeAt = options?.removeArrayItemAt;
            if (typeof removeAt === 'number') {
                const arr = _.get(newContentConfig, key);
                if (Array.isArray(arr) && removeAt >= 0 && removeAt < arr.length) {
                    arr.splice(removeAt, 1);
                }
            } else if (options?.unset) {
                _.unset(newContentConfig, key);
            } else {
                _.set(newContentConfig, key, value);
            }

            contentRef.current = newContentConfig;
            onUpdate(newContentConfig);
        },
        [onUpdate],
    );

    return <Fields fields={blockConfig} content={contentConfig} onUpdate={onDataUpdate} />;
};

export default FormGenerator;

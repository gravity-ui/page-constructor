import * as React from 'react';
import {DynamicFormValue} from '../form-generator/types';
import _ from 'lodash';
import Fields from './components/Fields/Fields';

const FormGenerator = ({blockConfig, contentConfig, onUpdate}) => {
    const onDataUpdate = React.useCallback(
        (key: string, value: DynamicFormValue, options?: {removeArrayItemAt?: number}) => {
            if (onUpdate && contentConfig) {
                const newContentConfig = _.cloneDeep(contentConfig);

                const removeAt = options?.removeArrayItemAt;
                if (typeof removeAt === 'number') {
                    const arr = _.get(newContentConfig, key);
                    if (Array.isArray(arr) && removeAt >= 0 && removeAt < arr.length) {
                        arr.splice(removeAt, 1);
                    }
                    onUpdate(newContentConfig);
                    return;
                }

                _.set(newContentConfig, key, value);
                onUpdate(newContentConfig);
            }
        },
        [onUpdate, contentConfig],
    );

    return <Fields fields={blockConfig} content={contentConfig} onUpdate={onDataUpdate} />;
};

export default FormGenerator;

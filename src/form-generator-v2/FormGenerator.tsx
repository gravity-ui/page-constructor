import * as React from 'react';

import {cloneDeep, set, unset} from 'lodash';

import {DynamicFormValue} from '../form-generator/types';

import Fields from './components/Fields/Fields';
import {Content, Fields as FieldsType, OnUpdate} from './types';
import {getValueByPath} from './utils/fields';
import {formGeneratorCn} from './utils/cn';
import {ClassNameProps} from '../models/common';

import './FormGenerator.scss';

const b = formGeneratorCn('generator');

type FormGeneratorProps = ClassNameProps & {
    blockConfig: FieldsType;
    contentConfig: Content;
    onUpdate?: (content: Content) => void;
    onUpdateByKey?: (key: string, value: unknown) => void;
};

const FormGenerator = ({
    blockConfig,
    contentConfig,
    onUpdate,
    onUpdateByKey,
    className,
}: FormGeneratorProps) => {
    const contentRef = React.useRef(contentConfig);
    // Sync during render (not in useEffect) so that onDataUpdate calls within the same
    // effects batch all build on top of each other. If we synced in useEffect, it would
    // run *after* child effects, resetting any accumulated changes made by onDataUpdate.
    contentRef.current = contentConfig;

    const onDataUpdate = React.useCallback(
        (
            key: string,
            value: DynamicFormValue,
            options?: {removeArrayItemAt?: number; unset?: boolean},
        ) => {
            if (!onUpdate && !onUpdateByKey) {
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

            if (onUpdateByKey) {
                onUpdateByKey(key, value);
            }

            if (onUpdate) {
                onUpdate(newContentConfig);
            }
        },
        [onUpdate, onUpdateByKey],
    );

    return (
        <div className={b(null, className)}>
            <Fields
                fields={blockConfig}
                content={contentConfig}
                onUpdate={onDataUpdate as OnUpdate}
            />
        </div>
    );
};

export default FormGenerator;

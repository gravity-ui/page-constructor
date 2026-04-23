import * as React from 'react';

import {ClassNameProps} from '../../../models/common';
import {Content, Fields as FieldsType, OnUpdate} from '../../types';
import {formGeneratorCn} from '../../utils/cn';
import {componentMap} from '../constants';

import './Fields.scss';

const b = formGeneratorCn('fields');

type FieldsProps = ClassNameProps & {
    fields: FieldsType;
    content: Content;
    onUpdate: OnUpdate;
};
const Fields = ({fields, content, onUpdate, className}: FieldsProps) => (
    <div className={b(null, className)}>
        {fields.map((field, index) => {
            const Component = componentMap[field.type] as React.ComponentType<
                Record<string, unknown>
            >;

            if (!Component) {
                // eslint-disable-next-line
                console.warn(`NOT FOUND COMPONENT FOR TYPE ${field.type}`);
                return null;
            }

            return (
                <Component
                    {...field}
                    className={b('field')}
                    key={index}
                    content={content}
                    onUpdate={onUpdate}
                />
            );
        })}
    </div>
);

export default Fields;

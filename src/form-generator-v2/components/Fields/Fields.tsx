import {componentMap} from '../constants';
import {Content, Fields as FieldsType, OnUpdate} from '../../types';
import * as React from 'react';

type FieldsProps = {
    fields: FieldsType;
    content: Content;
    onUpdate: OnUpdate;
};
const Fields = ({fields, content, onUpdate}: FieldsProps) => (
    <div>
        {fields.map((field, index) => {
            const Component = componentMap[field.type] as React.ComponentType<any>;

            if (!Component) {
                // eslint-disable-next-line
                console.log(`NOT FOUND COMPONENT FOR TYPE ${field.type}`);
                return null;
            }

            return <Component key={index} {...field} content={content} onUpdate={onUpdate} />;
        })}
    </div>
);

export default Fields;

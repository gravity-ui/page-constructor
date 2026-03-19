import {componentMap} from '../constants';

const Fields = ({fields, content, onUpdate}) => (
    <div>
        {fields.map((field, index) => {
            const Component = componentMap[field.type];

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

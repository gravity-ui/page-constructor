import {Card, Text} from '@gravity-ui/uikit';

import {useFormContext} from '../../hooks/FormContext';
import {FormField} from '../../types';
import {formBuilderV2Cn} from '../../utils/cn';
import {CanvasCard} from '../CanvasCard/CanvasCard';

import './Canvas.scss';

const b = formBuilderV2Cn('canvas');

interface CanvasListProps {
    fields: FormField[];
    parentGroup: string;
}

const CanvasList = ({fields, parentGroup}: CanvasListProps) => (
    <div className={b('list')}>
        {fields.map((field, index) => (
            <CanvasCard key={field.id} field={field} index={index} group={parentGroup} />
        ))}
    </div>
);

export const Canvas = () => {
    const {formFields, selectField} = useFormContext();

    return (
        <Card className={b()} view="outlined" onClick={() => selectField(null)}>
            {formFields.length === 0 ? (
                <div className={b('empty')}>
                    <Text variant="body-2" color="hint">
                        Canvas is empty. Click a field type on the left to add it.
                    </Text>
                </div>
            ) : (
                <CanvasList fields={formFields} parentGroup="root" />
            )}
        </Card>
    );
};

export {CanvasList};

import {Card} from '@gravity-ui/uikit';

import {ConfigInput, DynamicFormValue} from '../../../../../common/types';
import DynamicForm from '../../DynamicForm';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

interface ObjectDynamicFieldProps extends FieldBaseParams {
    value: DynamicFormValue;
    onUpdate: (key: string, value: DynamicFormValue) => void;
    blockConfig: Array<ConfigInput>;
    className?: string;
}

const ObjectDynamicField = ({
    title,
    value,
    onUpdate,
    className,
    blockConfig,
}: ObjectDynamicFieldProps) => {
    return (
        <FieldBase
            title={title}
            className={className}
            onRefresh={(updatedValue) => onUpdate('', updatedValue)}
            expandable
        >
            <Card>
                <DynamicForm contentConfig={value} blockConfig={blockConfig} onUpdate={onUpdate} />
            </Card>
        </FieldBase>
    );
};

export default ObjectDynamicField;

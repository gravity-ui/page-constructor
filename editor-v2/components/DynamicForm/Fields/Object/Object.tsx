import {Card} from '@gravity-ui/uikit';

import {ConfigInput, DynamicFormValue} from '../../../../../common/types';
import {editorCn} from '../../../../utils/cn';
import DynamicForm from '../../DynamicForm';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

import './Object.scss';

const b = editorCn('object-dynamic-field');

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
            className={b(null, className)}
            onRefresh={(updatedValue) => onUpdate('', updatedValue)}
            expandable
        >
            <Card className={b('card')}>
                <DynamicForm contentConfig={value} blockConfig={blockConfig} onUpdate={onUpdate} />
            </Card>
        </FieldBase>
    );
};

export default ObjectDynamicField;

import {Switch} from '@gravity-ui/uikit';

import {editorCn} from '../../../../utils/cn';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

const b = editorCn('boolean-dynamic-field');

interface BooleanProps extends FieldBaseParams {
    value: string;
    onUpdate: (value: boolean | undefined) => void;
    className?: string;
}

const BooleanDynamicField = ({title, value, onUpdate, className}: BooleanProps) => {
    return (
        <FieldBase title={title} className={b(null, className)} onRefresh={onUpdate}>
            <Switch checked={Boolean(value)} onUpdate={onUpdate} />
        </FieldBase>
    );
};

export default BooleanDynamicField;

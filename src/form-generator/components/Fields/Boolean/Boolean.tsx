import {Switch} from '@gravity-ui/uikit';

import {formGeneratorCn} from '../../../utils/cn';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

import './Boolean.scss';

const b = formGeneratorCn('boolean-dynamic-field');

interface BooleanProps extends FieldBaseParams {
    value: string;
    onUpdate: (value: boolean | undefined) => void;
    className?: string;
}

const BooleanDynamicField = ({title, value, onUpdate, className}: BooleanProps) => {
    return (
        <FieldBase title={title} className={b(null, className)} onRefresh={onUpdate}>
            <Switch className={b('switch')} checked={Boolean(value)} onUpdate={onUpdate} />
        </FieldBase>
    );
};

export default BooleanDynamicField;

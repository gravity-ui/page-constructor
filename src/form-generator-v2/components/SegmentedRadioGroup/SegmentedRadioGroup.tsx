import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {SegmentedRadioGroup as SegmentedRadioGroupUIKIT} from '@gravity-ui/uikit';
import {getValueByPath} from '../../utils/fields';

const SegmentedRadioGroup = ({title, name, options, when, content, onUpdate}) => (
    <Base when={when} content={content}>
        <BaseInput title={title}>
            <SegmentedRadioGroupUIKIT
                name={name}
                options={options}
                onUpdate={(value) => onUpdate(name, value)}
                value={getValueByPath(content, name)}
            />
        </BaseInput>
    </Base>
);

export default SegmentedRadioGroup;

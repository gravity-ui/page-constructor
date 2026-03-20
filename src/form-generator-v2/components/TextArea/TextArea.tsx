import {TextArea as TextAreaUIKIT} from '@gravity-ui/uikit';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {getValueByPath} from '../../utils/fields';

const TextArea = ({when, title, content, name}) => {
    const value = getValueByPath(content, name);

    return (
        <Base when={when} content={content}>
            <BaseInput title={title}>
                <TextAreaUIKIT value={value} name={name} />
            </BaseInput>
        </Base>
    );
};

export default TextArea;

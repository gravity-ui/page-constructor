import Base from '../Base/Base';
import {Text as TextUIKIT} from '@gravity-ui/uikit';
import './Text.scss';
import {formGeneratorCn} from '../../utils/cn';

const b = formGeneratorCn('text');

const Text = ({text, when, content}) => (
    <Base when={when} content={content}>
        <TextUIKIT className={b()} variant="subheader-1">
            {text}
        </TextUIKIT>
    </Base>
);

export default Text;

import Base from '../Base/Base';
import {Text as TextUIKIT} from '@gravity-ui/uikit';
import './Text.scss';
import {formGeneratorCn} from '../../utils/cn';
import {Content, When} from '../../types';

const b = formGeneratorCn('text');

type TextProps = {
    text: string;
    when?: When;
    content: Content;
};

const Text = ({text, when, content}: TextProps) => (
    <Base when={when} content={content}>
        <TextUIKIT className={b()} variant="subheader-1">
            {text}
        </TextUIKIT>
    </Base>
);

export default Text;

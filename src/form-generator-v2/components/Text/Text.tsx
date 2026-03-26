import {Text as TextUIKIT} from '@gravity-ui/uikit';

import {Content, When} from '../../types';
import {formGeneratorCn} from '../../utils/cn';
import Base from '../Base/Base';

import './Text.scss';

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

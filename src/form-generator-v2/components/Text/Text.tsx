import {CircleInfoFill, TriangleExclamationFill} from '@gravity-ui/icons';
import {Icon, Text as TextUIKIT} from '@gravity-ui/uikit';

import {Content, Text as TextField, When} from '../../types';
import {formGeneratorCn} from '../../utils/cn';
import Base from '../Base/Base';
import {ClassNameProps} from '../../../models/common';

import './Text.scss';

const b = formGeneratorCn('text');

const LEVEL_ICON = {
    info: CircleInfoFill,
    danger: TriangleExclamationFill,
};

type TextProps = ClassNameProps & {
    text: string;
    level?: TextField['level'];
    color?: TextField['color'];
    when?: When;
    content: Content;
};

const Text = ({text, level, color, when, content, className}: TextProps) => (
    <Base when={when} content={content}>
        {level ? (
            <div className={b(null, className)}>
                <div className={b('note', null, className)}>
                    <Icon className={b('note-icon')} data={LEVEL_ICON[level]} color={level} />
                    <TextUIKIT variant="body-1">{text}</TextUIKIT>
                </div>
            </div>
        ) : (
            <TextUIKIT className={b(null, className)} variant="subheader-1" color={color}>
                {text}
            </TextUIKIT>
        )}
    </Base>
);

export default Text;

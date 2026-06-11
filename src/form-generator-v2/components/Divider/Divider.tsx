import {Divider as DividerUIKit} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../../models/common';
import {Content, When} from '../../types';
import {formGeneratorCn} from '../../utils/cn';
import Base from '../Base/Base';

import './Divider.scss';

const b = formGeneratorCn('divider');

type DividerProps = ClassNameProps & {
    when?: When;
    content: Content;
};

const Divider = ({when, content, className}: DividerProps) => (
    <Base when={when} content={content}>
        <DividerUIKit className={b(null, className)} />
    </Base>
);

export default Divider;

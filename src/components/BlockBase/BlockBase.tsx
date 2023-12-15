import React, {PropsWithChildren} from 'react';

import {Col} from '../../grid';
import {BlockBaseProps, ClassNameProps, QAProps} from '../../models';
import {block} from '../../utils';
import Anchor from '../Anchor/Anchor';

import './BlockBase.scss';

const b = block('block-base');

export type BlockBaseFullProps = BlockBaseProps & ClassNameProps & PropsWithChildren & QAProps;

const BlockBase = (props: BlockBaseFullProps) => {
    const {anchor, indent, visible, children, className, resetPaddings, qa} = props;

    const {top, bottom} =
        indent || (resetPaddings ? {top: '0', bottom: '0'} : {top: 'l', bottom: 'l'});

    return (
        <Col
            className={b(
                {['reset-paddings']: resetPaddings, indentTop: top, indentBottom: bottom},
                className,
            )}
            visible={visible}
            reset={true}
            qa={qa}
        >
            {anchor && <Anchor id={anchor.url} className={b('anchor')} />}
            {children}
        </Col>
    );
};

export default BlockBase;

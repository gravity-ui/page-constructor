import React from 'react';

import {Col} from '../../grid';
import {BlockBaseProps, ClassNameProps, WithChildren} from '../../models';
import {block} from '../../utils';
import Anchor from '../Anchor/Anchor';

import './BlockBase.scss';

const b = block('block-base');

const BlockBase = (props: WithChildren<BlockBaseProps & ClassNameProps>) => {
    const {anchor, visible, children, className, resetPaddings, qa} = props;

    return (
        <Col
            className={b({['reset-paddings']: resetPaddings}, className)}
            visible={visible}
            reset={true}
            dataQa={qa}
        >
            {anchor && <Anchor id={anchor.url} className={b('anchor')} />}
            {children}
        </Col>
    );
};

export default BlockBase;

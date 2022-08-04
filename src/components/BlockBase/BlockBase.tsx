import React from 'react';

import {block} from '../../utils';
import {BlockBaseProps, ClassNameProps} from '../../models';
import Anchor from '../Anchor/Anchor';
import {Col} from '../../grid';

import './BlockBase.scss';

const b = block('block-base');

const BlockBase: React.FC<BlockBaseProps & ClassNameProps> = (props) => {
    const {anchor, visible, children, className, resetPaddings} = props;

    return (
        <Col
            className={b({['reset-paddings']: resetPaddings}, className)}
            visible={visible}
            reset={true}
        >
            {anchor && <Anchor id={anchor.url} className={b('anchor')} />}
            {children}
        </Col>
    );
};

export default BlockBase;

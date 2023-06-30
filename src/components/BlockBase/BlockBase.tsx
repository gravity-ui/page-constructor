import React, {PropsWithChildren} from 'react';

import {Col} from '../../grid';
import {BlockBaseProps, ClassNameProps} from '../../models';
import {block} from '../../utils';
import Anchor from '../Anchor/Anchor';

import './BlockBase.scss';

const b = block('block-base');

export type BlockBaseFullProps = BlockBaseProps & ClassNameProps & PropsWithChildren;

const BlockBase = (props: BlockBaseFullProps) => {
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

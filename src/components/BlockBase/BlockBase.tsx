import React, {PropsWithChildren} from 'react';

import {BlockDecoration} from '../../customization/BlockDecoration';
import {Col} from '../../grid';
import {BlockBaseProps, BlockDecorationProps, ClassNameProps} from '../../models';
import {block} from '../../utils';
import Anchor from '../Anchor/Anchor';

import './BlockBase.scss';

const b = block('block-base');

export type BlockBaseFullProps = BlockBaseProps &
    BlockDecorationProps &
    ClassNameProps &
    PropsWithChildren;

const BlockBase = (props: BlockBaseFullProps) => {
    const {anchor, visible, children, className, resetPaddings, qa, type, index} = props;

    return (
        <Col
            className={b({['reset-paddings']: resetPaddings}, className)}
            visible={visible}
            reset={true}
            dataQa={qa}
        >
            <BlockDecoration type={type} index={index}>
                {anchor && <Anchor id={anchor.url} className={b('anchor')} />}
                {children}
            </BlockDecoration>
        </Col>
    );
};

export default BlockBase;

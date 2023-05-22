import React, {PropsWithChildren} from 'react';

import EditBlockControl from '../../editor/Components/EditBlockControl/EditBlockControl';
import {Col} from '../../grid';
import {BlockBaseProps, ClassNameProps} from '../../models';
import {block} from '../../utils';
import Anchor from '../Anchor/Anchor';

import './BlockBase.scss';

const b = block('block-base');

const BlockBase = (props: PropsWithChildren<BlockBaseProps & ClassNameProps>) => {
    const {anchor, visible, children, className, resetPaddings, qa} = props;

    return (
        <Col
            className={b({['reset-paddings']: resetPaddings}, className)}
            visible={visible}
            reset={true}
            dataQa={qa}
        >
            <EditBlockControl>
                {anchor && <Anchor id={anchor.url} className={b('anchor')} />}
                {children}
            </EditBlockControl>
        </Col>
    );
};

export default BlockBase;

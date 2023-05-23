import React, {PropsWithChildren} from 'react';

import {EditControlsInjector} from '../../editor/Components/EditControlsInjector/EditControlsInjector';
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
            <EditControlsInjector>
                {anchor && <Anchor id={anchor.url} className={b('anchor')} />}
                {children}
            </EditControlsInjector>
        </Col>
    );
};

export default BlockBase;

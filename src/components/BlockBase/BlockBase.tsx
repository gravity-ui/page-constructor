import React from 'react';
import block from 'bem-cn-lite';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {BlockBaseProps} from '../../models';
import Anchor from '../Anchor/Anchor';
import {Col} from '../../grid';

import './BlockBase.scss';

const b = block('block-base');

const BlockBase: React.FC<BlockBaseProps & ClassNameProps> = (props) => {
    const {anchor, visible, children, className, resetPaddings} = props;

    return (
        <Col className={b({['reset-paddings']: resetPaddings}, className)} visible={visible}>
            {anchor && <Anchor id={anchor.url} className={b('anchor')} />}
            {children}
        </Col>
    );
};

export default BlockBase;

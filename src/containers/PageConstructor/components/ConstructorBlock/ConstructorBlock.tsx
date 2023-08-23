import React, {useMemo} from 'react';

import _ from 'lodash';

import BlockBase from '../../../../components/BlockBase/BlockBase';
import {BlockDecoration} from '../../../../customization/BlockDecoration';
import {
    BlockDecorationProps,
    ConstructorBlock as ConstructorBlockType,
    WithChildren,
} from '../../../../models';
import {block} from '../../../../utils';

import './ConstructorBlock.scss';

interface ConstructorBlockProps extends Pick<BlockDecorationProps, 'index'> {
    data: ConstructorBlockType;
}

const b = block('constructor-block');

export const ConstructorBlock: React.FC<WithChildren<ConstructorBlockProps>> = ({
    index = 0,
    data,
    children,
}) => {
    const {type, indentTop, indentBottom} = data;
    const blockBaseProps = useMemo(
        () => _.pick(data, ['anchor', 'visible', 'resetPaddings']),
        [data],
    );

    return (
        <BlockDecoration type={type} index={index} {...blockBaseProps}>
            <BlockBase className={b({type, indentTop, indentBottom})} {...blockBaseProps}>
                {children}
            </BlockBase>
        </BlockDecoration>
    );
};

import React, {useMemo} from 'react';

import _ from 'lodash';

import BlockBase from '../../../../components/BlockBase/BlockBase';
import {BlockDecoration} from '../../../../customization/BlockDecoration';
import {Block, BlockDecorationProps, WithChildren} from '../../../../models';
import {block} from '../../../../utils';

interface ConstructorBlockProps extends Pick<BlockDecorationProps, 'index'> {
    data: Block;
}

const b = block('constructor-block');

export const ConstructorBlock: React.FC<WithChildren<ConstructorBlockProps>> = ({
    index = 0,
    data,
    children,
}) => {
    const {type} = data;
    const blockBaseProps = useMemo(
        () => _.pick(data, ['anchor', 'visible', 'resetPaddings']),
        [data],
    );

    return (
        <BlockDecoration type={type} index={index} {...blockBaseProps}>
            <BlockBase className={b({type})} {...blockBaseProps}>
                {children}
            </BlockBase>
        </BlockDecoration>
    );
};

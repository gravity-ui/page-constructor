import * as React from 'react';

import pick from 'lodash/pick';

import BlockBase from '../../../../components/BlockBase/BlockBase';
import {BlockDecoration} from '../../../../customization/BlockDecoration';
import {BlockDecorationProps, ConstructorBlock as ConstructorBlockType} from '../../../../models';
import {block} from '../../../../utils';

import './ConstructorBlock.scss';

interface ConstructorBlockProps extends Pick<BlockDecorationProps, 'index'> {
    data: ConstructorBlockType;
}

const b = block('constructor-block');

export const ConstructorBlock = ({
    index = 0,
    data,
    children,
}: React.PropsWithChildren<ConstructorBlockProps>) => {
    const {type} = data;
    const blockBaseProps = React.useMemo(
        () => pick(data, ['anchor', 'visible', 'resetPaddings', 'indent']),
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

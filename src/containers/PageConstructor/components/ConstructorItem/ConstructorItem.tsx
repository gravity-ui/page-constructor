import React, {useContext} from 'react';

import {InnerContext} from '../../../../context/innerContext';
import BlockBaseEdit from '../../../../editor/Components/BlockBaseEdit/BlockBaseEdit';
import {BlockType, ConstructorItem as ConstructorItemType, WithChildren} from '../../../../models';

export interface ConstructorItemProps {
    data: ConstructorItemType;
    blockKey: string;
}

export const ConstructorItem = ({data, children}: WithChildren<ConstructorItemProps>) => {
    const {itemMap} = useContext(InnerContext);
    const {type, ...rest} = data;

    const Component = itemMap[type] as React.ComponentType<
        React.ComponentProps<typeof itemMap[typeof type]>
    >;

    return <Component {...rest}>{children}</Component>;
};

export const ConstructorHeader = ({
    data,
    blockKey,
}: Pick<ConstructorItemProps, 'data' | 'blockKey'>) => (
    <BlockBaseEdit id={BlockType.HeaderBlock}>
        <ConstructorItem data={data} key={data.type} blockKey={blockKey} />
    </BlockBaseEdit>
);

import * as React from 'react';

import {BlockIdContext} from '../../../../context/blockIdContext';
import {InnerContext} from '../../../../context/innerContext';
import {BlockDecoration} from '../../../../customization/BlockDecoration';
import {BlockType, ConstructorBlock} from '../../../../models';

export interface ConstructorItemProps {
    data: ConstructorBlock;
    blockKey: number;
}

export const ConstructorItem = ({
    data,
    blockKey,
    children,
}: React.PropsWithChildren<ConstructorItemProps>) => {
    const {blocks} = React.useContext(InnerContext);
    const parentId = React.useContext(BlockIdContext);
    const {type, ...rest} = data;

    const blockData = blocks.find(({type: blockType}) => blockType === type);

    if (!blockData) {
        return null;
    }

    const Component = blockData.component as React.ComponentType<
        React.ComponentProps<(typeof blockData)['component']>
    >;

    return (
        <BlockIdContext.Provider value={[...parentId, blockKey]} key={blockKey}>
            <Component {...rest}>{children}</Component>
        </BlockIdContext.Provider>
    );
};

export const ConstructorHeader = ({
    data,
    blockKey,
}: Pick<ConstructorItemProps, 'data' | 'blockKey'>) => (
    <BlockDecoration type={data.type as BlockType}>
        <ConstructorItem data={data} key={data.type} blockKey={blockKey} />
    </BlockDecoration>
);

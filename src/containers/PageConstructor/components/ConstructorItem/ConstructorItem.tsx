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
    const {itemMap} = React.useContext(InnerContext);
    const {type, ...rest} = data;

    const Component = itemMap[type] as React.ComponentType<
        React.ComponentProps<(typeof itemMap)[typeof type]>
    >;

    return (
        <BlockIdContext.Provider value={blockKey} key={blockKey}>
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

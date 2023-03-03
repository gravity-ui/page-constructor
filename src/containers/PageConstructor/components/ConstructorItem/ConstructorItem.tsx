import React, {useContext} from 'react';
import {ConstructorItem as ConstructorItemType, WithChildren} from '../../../../models';
import {InnerContext} from '../../../../context/innerContext';
import {BlockIdContext} from '../../../../context/blockIdContext';

export interface ConstructorItemProps {
    data: ConstructorItemType;
    blockKey?: string;
}

export const ConstructorItem = ({
    data,
    blockKey = '',
    children,
}: WithChildren<ConstructorItemProps>) => {
    const {itemMap} = useContext(InnerContext);
    const {type, ...rest} = data;

    const Component = itemMap[type] as React.ComponentType<
        React.ComponentProps<typeof itemMap[typeof type]>
    >;

    return (
        <BlockIdContext.Provider value={blockKey}>
            <Component {...rest}>{children}</Component>
        </BlockIdContext.Provider>
    );
};

export const ConstructorHeader = ({
    data,
    blockKey = '',
}: Pick<ConstructorItemProps, 'data' | 'blockKey'>) => (
    <ConstructorItem data={data} key={data.type} blockKey={blockKey} />
);

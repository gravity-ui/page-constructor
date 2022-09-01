import React, {useContext} from 'react';
import {ConstructorItem as ConstructorItemType} from '../../../../models';
import {InnerContext} from '../../../../context/innerContext';

export interface ConstructorItemProps {
    data: ConstructorItemType;
}

export const ConstructorItem: React.FC<ConstructorItemProps> = ({data, children}) => {
    const {itemMap} = useContext(InnerContext);
    const {type, ...rest} = data;

    const Component = itemMap[type] as React.ComponentType<
        React.ComponentProps<typeof itemMap[typeof type]>
    >;

    return <Component {...rest}>{children}</Component>;
};

export const ConstructorHeader: React.FC<Pick<ConstructorItemProps, 'data'>> = ({data}) => (
    <ConstructorItem data={data} key={data.type} />
);

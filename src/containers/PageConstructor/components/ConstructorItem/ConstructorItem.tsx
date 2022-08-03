import React, {useContext} from 'react';
import {ConstructorItem as ConstructorItemType} from '../../../../models';
import {InnerContext} from '../../../../context/innerContext';

export interface ConstructorItemProps {
    data: ConstructorItemType;
    key: string;
}

export const ConstructorItem: React.FC<ConstructorItemProps> = ({data, key, children}) => {
    const {itemMap} = useContext(InnerContext);
    const {type, ...rest} = data;

    const Component = itemMap[type] as React.ComponentType<
        React.ComponentProps<typeof itemMap[typeof type]>
    >;

    return (
        <Component key={key} {...rest}>
            {children}
        </Component>
    );
};

export const ConstructorHeader: React.FC<Pick<ConstructorItemProps, 'data'>> = ({data}) => (
    <ConstructorItem data={data} key={data.type} />
);

import React, {useContext} from 'react';

import {BlockIdContext} from '../../../../context/blockIdContext';
import {InnerContext} from '../../../../context/innerContext';
import {LoadableConfigItem} from '../../../../models';
import Loadable, {LoadableComponentsProps} from '../../../Loadable/Loadable';

interface ConstructorLoadableProps
    extends Omit<LoadableComponentsProps, 'Component' | 'ChildComponent' | 'fetch'> {
    config: LoadableConfigItem;
}

export const ConstructorLoadable = (props: ConstructorLoadableProps) => {
    const {itemMap} = useContext(InnerContext);
    const {block, blockKey, config, serviceId, params} = props;
    const {type} = block;
    const {fetch, component: ChildComponent} = config;
    const Component = itemMap[type] as React.Component<
        React.ComponentProps<typeof itemMap[typeof type]>
    >;

    return (
        <BlockIdContext.Provider value={Number(blockKey)} key={blockKey}>
            <Loadable
                key={blockKey}
                block={block}
                blockKey={blockKey}
                Component={Component}
                ChildComponent={ChildComponent}
                fetch={fetch}
                serviceId={serviceId}
                params={params}
            />
        </BlockIdContext.Provider>
    );
};

import * as React from 'react';

import {BlockIdContext} from '../../../../context/blockIdContext';
import {InnerContext} from '../../../../context/innerContext';
import {LoadableConfigItem} from '../../../../models';
import Loadable, {LoadableComponentsProps} from '../../../Loadable/Loadable';

interface ConstructorLoadableProps
    extends Omit<LoadableComponentsProps, 'Component' | 'ChildComponent' | 'fetch'> {
    config: LoadableConfigItem;
}

export const ConstructorLoadable = (props: ConstructorLoadableProps) => {
    const {itemMap} = React.useContext(InnerContext);
    const {block, blockKey, config, serviceId, params} = props;
    const {type} = block;
    const {fetch, component: ChildComponent} = config;
    const Component = itemMap[type] as React.Component<
        React.ComponentProps<(typeof itemMap)[typeof type]>
    >;
    const parentId = React.useContext(BlockIdContext);

    return (
        <BlockIdContext.Provider value={[...parentId, Number(blockKey)]} key={blockKey}>
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

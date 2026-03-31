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
    const {blocks} = React.useContext(InnerContext);
    const {block, blockKey, config, serviceId, params} = props;
    const {type} = block;
    const {fetch, component: ChildComponent} = config;

    const parentId = React.useContext(BlockIdContext);

    const blockData = blocks.find(({type: blockType}) => blockType === type);

    if (!blockData) {
        return null;
    }

    const Component = blockData.component as React.ComponentType<
        React.ComponentProps<typeof blockData.component>
    >;

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

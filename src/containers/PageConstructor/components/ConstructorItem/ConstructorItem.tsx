import * as React from 'react';

import {BlockIdContext} from '../../../../context/blockIdContext';
import {InnerContext} from '../../../../context/innerContext';
import {usePCEditorBlockRegister} from '../../../../hooks/usePCEditorBlockRegister';
import {ConstructorBlock} from '../../../../models';

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

    const path = React.useMemo(() => [...parentId, blockKey], [parentId, blockKey]);
    const blockRef = usePCEditorBlockRegister(path);

    const blockData = blocks.find(({type: blockType}) => blockType === type);

    if (!blockData) {
        return null;
    }

    const Component = blockData.component as React.ComponentType<
        React.ComponentProps<(typeof blockData)['component']>
    >;

    return (
        <BlockIdContext.Provider value={path} key={blockKey}>
            <div ref={blockRef}>
                <Component {...rest}>{children}</Component>
            </div>
        </BlockIdContext.Provider>
    );
};

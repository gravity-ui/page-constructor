import * as React from 'react';

import _ from 'lodash';

import {BlockIdContext} from '../../../context/blockIdContext';
import {generateChildrenPathFromArray} from '../../../editor-v2';
import {usePCEditorBlockRegister} from '../../../hooks/usePCEditorBlockRegister';
import {usePCEditorStore} from '../../../hooks/usePCEditorStore';
import {block} from '../../../utils';

import './ChildrensWrap.scss';

const b = block('childrens-wrap');

export interface ChildrensWrapProps extends React.PropsWithChildren {}

const ChildrensWrap = ({children}: ChildrensWrapProps) => {
    const {manipulateOverlayMode, content} = usePCEditorStore();

    const parentBlockId = React.useContext(BlockIdContext);

    const newBlockIndex = React.useMemo(() => {
        const contentConfig = _.get(content.blocks, generateChildrenPathFromArray(parentBlockId));
        return contentConfig?.children?.length ?? 0;
    }, [content.blocks, parentBlockId]);

    const path = React.useMemo(
        () => [...parentBlockId, newBlockIndex],
        [parentBlockId, newBlockIndex],
    );

    const blockRef = usePCEditorBlockRegister(path, true);

    if (manipulateOverlayMode === 'insert' && newBlockIndex === 0) {
        return <div ref={blockRef} className={b({'drop-zone': true})}></div>;
    }

    if (manipulateOverlayMode === 'insert') {
        return (
            <div ref={blockRef} className={b()}>
                {children}
            </div>
        );
    }

    return children;
};

export default ChildrensWrap;

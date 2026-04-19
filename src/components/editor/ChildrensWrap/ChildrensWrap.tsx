import * as React from 'react';
import _ from 'lodash';

import {usePCEditorStore} from '../../../hooks/usePCEditorStore';
import usePCEditorBlockMouseEvents from '../../../hooks/usePCEditorBlockMouseEvents';
import {block} from '../../../utils';

import './ChildrensWrap.scss';
import {BlockIdContext} from '../../../context/blockIdContext';
import {generateChildrenPathFromArray} from '../../../editor-v2';

const b = block('childrens-wrap');

export interface ChildrensWrapProps extends React.PropsWithChildren {}

const ChildrensWrap = ({children}: ChildrensWrapProps) => {
    const {manipulateOverlayMode, content} = usePCEditorStore();
    const [element, setElement] = React.useState<HTMLElement | undefined>();
    const blockRef = React.useCallback((node: HTMLElement | null) => {
        if (node !== null) {
            setElement(node);
        }
    }, []);

    const parentBlockId = React.useContext(BlockIdContext);

    const newBlockIndex = React.useMemo(() => {
        const contentConfig = _.get(content.blocks, generateChildrenPathFromArray(parentBlockId));
        return contentConfig?.children?.length ? contentConfig.children.length - 1 : -1;
    }, [content.blocks]);

    const adminBlockMouseEvents = usePCEditorBlockMouseEvents(
        [...parentBlockId, newBlockIndex],
        element,
        true,
    );

    if (manipulateOverlayMode === 'insert' && newBlockIndex === -1) {
        return (
            <div ref={blockRef} className={b({'drop-zone': true})} {...adminBlockMouseEvents}>
                DROP HERE
            </div>
        );
    }

    if (manipulateOverlayMode === 'insert') {
        return (
            <div ref={blockRef} className={b()} {...adminBlockMouseEvents}>
                {children}
            </div>
        );
    }

    return children;
};

export default ChildrensWrap;

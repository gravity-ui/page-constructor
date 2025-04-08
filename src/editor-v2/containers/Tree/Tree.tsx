import * as React from 'react';

import {editorCn} from '../../utils/cn';
import {DragContextProvider} from './DragContext';
import {TreeContent, TreeItem} from './TreeContent';

import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {Button, Icon} from '@gravity-ui/uikit';
import {TrashBin} from '@gravity-ui/icons';
import {generateChildrenPathFromArray, getItemTitle} from '../../utils';

import './Tree.scss';

const b = editorCn('tree');

const generateTree = (items: TreeItem[]): TreeItem[] => {
    return items.map((item) => {
        let children;

        if ('children' in item && item.children?.length) {
            children = generateTree(item.children);
        }

        return {
            type: item.type,
            children,
            treeTitle: getItemTitle(item),
        };
    });
};

// Main Tree component with context provider
const Tree = () => {
    const {
        content,
        resetBlocks,
        selectedBlock,
        duplicateBlock,
        deleteBlock,
        setSelectedBlock,
        reorderBlock,
    } = useMainEditorStore();

    const selectedBlockPath = React.useMemo(() => {
        return generateChildrenPathFromArray(selectedBlock || []);
    }, [selectedBlock]);

    return (
        <DragContextProvider>
            <div className={b()}>
                <div className={b('head')}>
                    <Button view="outlined-danger" onClick={() => resetBlocks()}>
                        <Icon data={TrashBin} />
                        Clear all
                    </Button>
                </div>
                <TreeContent
                    reorderBlock={reorderBlock}
                    onCopy={duplicateBlock}
                    onDelete={deleteBlock}
                    onSelect={setSelectedBlock}
                    blockTree={generateTree(content.blocks)}
                    selectedBlockPath={selectedBlockPath}
                />
            </div>
        </DragContextProvider>
    );
};

export default Tree;

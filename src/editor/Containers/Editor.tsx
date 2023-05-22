import React from 'react';

import {PageConstructor} from '../../../src/containers/PageConstructor';
import {Block, CustomConfig, PageData} from '../../../src/models';
import AddBlockControl from '../Components/AddBlockControl/AddBlockControl';
import {EditorBlockId, useEditorState} from '../store';

export interface EditorProps {
    data: PageData;
    custom?: CustomConfig;
    onChange?: (data: PageData) => void;
}

export type EditorActionHandler = (index: EditorBlockId) => void;

export interface ConstructorEditorProps {
    activeBlockId: EditorBlockId;
    orderedBlocksCount: number;
    onSelect: (index: EditorBlockId) => void;
    onDelete: (index: EditorBlockId) => void;
    onCopy: (index: number) => void;
    onAdd: (data: Block) => void;
    onOrderChange: (index: number, newIndex: number) => void;
}

const Editor = ({data: initialData, custom}: EditorProps) => {
    const {data, editor} = useEditorState(initialData, custom);

    return (
        <div>
            <PageConstructor editor={editor} {...data} />
            <AddBlockControl onAdd={editor.onAdd} />
        </div>
    );
};

export default Editor;

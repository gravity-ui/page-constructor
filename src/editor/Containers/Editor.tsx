import React from 'react';

import {PageConstructor} from '../../../src/containers/PageConstructor';
import {useEditor} from '../../../src/hooks/useEditor';
import {PageData} from '../../../src/models';

export interface EditorProps {
    data: PageData;
    onSave?: (data: PageData) => void;
}

export interface ConstructorEditorProps {
    activeBlockId: number;
    onSelect: (index: number) => void;
    onDelete: (index: number) => void;
    onOrderChange: (index: number, newIndex: number) => void;
}

const Editor = ({data: initialData}: EditorProps) => {
    const {data, editor} = useEditor(initialData);

    return <PageConstructor editor={editor} {...data} />;
};

export default Editor;

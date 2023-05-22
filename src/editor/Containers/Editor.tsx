import React from 'react';

import {PageConstructor} from '../../containers/PageConstructor';
import AddBlock from '../Components/AddBlock/AddBlock';
import {useEditorState} from '../store';
import {EditorIncomingProps} from '../types';

export const Editor = ({data: initialData, custom}: EditorIncomingProps) => {
    const {data, editor} = useEditorState(initialData, custom);

    return (
        <div>
            <PageConstructor editor={editor} {...data} />
            <AddBlock onAdd={editor.onAdd} />
        </div>
    );
};

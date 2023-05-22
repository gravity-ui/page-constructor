import React from 'react';

import {PageConstructor} from '../../containers/PageConstructor';
import AddBlockControl from '../Components/AddBlockControl/AddBlockControl';
import {useEditorState} from '../store';
import {EditorIncomingProps} from '../types';

export const Editor = ({data: initialData, custom}: EditorIncomingProps) => {
    const {data, editor} = useEditorState(initialData, custom);

    return (
        <div>
            <PageConstructor editor={editor} {...data} />
            <AddBlockControl onAdd={editor.onAdd} />
        </div>
    );
};

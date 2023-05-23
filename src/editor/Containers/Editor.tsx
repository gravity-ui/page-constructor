import React, {useMemo} from 'react';

import {PageConstructor} from '../../containers/PageConstructor';
import AddBlock from '../Components/AddBlock/AddBlock';
import {EditorContext} from '../context';
import {useEditorState} from '../store';
import {EditorProps} from '../types';

export const Editor = ({data: initialData, custom}: EditorProps) => {
    const {data, onAdd, renderControls} = useEditorState(initialData, custom);
    const context = useMemo(() => ({renderControls}), [renderControls]);

    return (
        <EditorContext.Provider value={context}>
            <div>
                <PageConstructor {...data} />
                <AddBlock onAdd={onAdd} />
            </div>
        </EditorContext.Provider>
    );
};

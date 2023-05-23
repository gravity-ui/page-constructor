import React, {useMemo} from 'react';

import {PageConstructor} from '../../containers/PageConstructor';
import AddBlock from '../Components/AddBlock/AddBlock';
import EditBlock from '../Components/EditBlock/EditBlock';
import {EditorContext} from '../context';
import {useEditorState} from '../store';
import {EditBlockConstructorProps, EditorProps} from '../types';

export const Editor = ({data: initialData, custom}: EditorProps) => {
    const {data, onAdd, editControlsProps} = useEditorState(initialData, custom);
    const context = useMemo(
        () => ({
            renderEditControls: (props: EditBlockConstructorProps) => (
                <EditBlock {...props} {...editControlsProps} />
            ),
        }),
        [editControlsProps],
    );

    return (
        <EditorContext.Provider value={context}>
            <div>
                <PageConstructor {...data} />
                <AddBlock onAdd={onAdd} />
            </div>
        </EditorContext.Provider>
    );
};

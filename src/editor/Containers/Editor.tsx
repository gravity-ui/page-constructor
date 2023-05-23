import React, {useMemo} from 'react';

import {PageConstructor} from '../../containers/PageConstructor';
import {BlockDecorationProps} from '../../extensions/BlockDecoration';
import AddBlock from '../Components/AddBlock/AddBlock';
import EditBlock from '../Components/EditBlock/EditBlock';
import {useEditorState} from '../store';
import {EditorProps} from '../types';

export const Editor = ({data: initialData, custom}: EditorProps) => {
    const {data, onAdd, editControlsProps} = useEditorState(initialData, custom);
    const extensions = useMemo(
        () => ({
            blockDecorators: [
                (props: BlockDecorationProps) => <EditBlock {...props} {...editControlsProps} />,
            ],
        }),
        [editControlsProps],
    );

    return (
        <div>
            <PageConstructor {...data} extensions={extensions} />
            <AddBlock onAdd={onAdd} />
        </div>
    );
};

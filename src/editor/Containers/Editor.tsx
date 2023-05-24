import React, {useMemo} from 'react';

import {BlockDecorationProps} from '../../extensions/BlockDecoration';
import AddBlock from '../Components/AddBlock/AddBlock';
import EditBlock from '../Components/EditBlock/EditBlock';
import {useEditorState} from '../store';
import {EditorProps} from '../types';

export const Editor = ({children, ...rest}: EditorProps) => {
    const {content, onAdd, editControlsProps} = useEditorState(rest);
    const constructorProps = useMemo(
        () => ({
            content,
            extensions: {
                blockDecorators: [
                    (props: BlockDecorationProps) => (
                        <EditBlock {...props} {...editControlsProps} />
                    ),
                ],
            },
        }),
        [editControlsProps, content],
    );

    return (
        <div>
            {children(constructorProps)}
            <AddBlock onAdd={onAdd} />
        </div>
    );
};

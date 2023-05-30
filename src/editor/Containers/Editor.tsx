import React, {useMemo} from 'react';

import {BlockDecoratorProps} from '../../models';
import AddBlock from '../Components/AddBlock/AddBlock';
import EditBlock from '../Components/EditBlock/EditBlock';
import {useEditorState} from '../store';
import {EditorProps} from '../types';
import {addCustomDecorator} from '../utils';

export const Editor = ({children, ...rest}: EditorProps) => {
    const {content, onAdd, editControlsProps} = useEditorState(rest);
    const constructorProps = useMemo(() => {
        const editControlsDecorator = (props: BlockDecoratorProps) => (
            <EditBlock {...props} {...editControlsProps} />
        );

        return {
            content,
            custom: addCustomDecorator(editControlsDecorator, rest.custom),
        };
    }, [editControlsProps, content, rest.custom]);

    return (
        <div>
            {children(constructorProps)}
            <AddBlock onAdd={onAdd} />
        </div>
    );
};

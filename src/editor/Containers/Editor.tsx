import React, {useMemo} from 'react';

import {BlockDecoratorProps} from '../../models';
import AddBlock from '../Components/AddBlock/AddBlock';
import EditBlock from '../Components/EditBlock/EditBlock';
import {useEditorState} from '../store';
import {EditorProps} from '../types';
import {addCustomDecorator} from '../utils';

import {Form} from './Form';

export const Editor = ({children, ...rest}: EditorProps) => {
    const {content, onContentUpdate, onAdd, injectEditBlockProps} = useEditorState(rest);
    const constructorProps = useMemo(() => {
        const editControlsDecorator = (props: BlockDecoratorProps) => (
            <EditBlock {...injectEditBlockProps(props)} />
        );

        return {
            content,
            custom: addCustomDecorator(editControlsDecorator, rest.custom),
        };
    }, [injectEditBlockProps, content, rest.custom]);

    return (
        <div style={{display: 'flex'}}>
            <Form content={content} onChange={onContentUpdate} />
            <div>
                {children(constructorProps)}
                <AddBlock onAdd={onAdd} />
            </div>
        </div>
    );
};

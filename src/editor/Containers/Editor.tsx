import React, {useMemo} from 'react';

import {PageContent, BlockDecoratorProps} from '../../models';
import AddBlock from '../Components/AddBlock/AddBlock';
import EditBlock from '../Components/EditBlock/EditBlock';
import {useEditorState} from '../store';
import {EditorProps} from '../types';
import {addCustomDecorator} from '../utils';

import {Form} from './Form';

export const Editor = ({children, ...rest}: EditorProps) => {
    const {content, onContentUpdate, onAdd, editControlsProps} = useEditorState(rest);
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
            <div style={{display: 'flex'}}>
                <Form
                    content={content}
                    onChange={(formValue: PageContent) => onContentUpdate(formValue)}
                />
                <div>
                    {children(constructorProps)}
                    <AddBlock onAdd={onAdd} />
                </div>
            </div>
        </div>
    );
};

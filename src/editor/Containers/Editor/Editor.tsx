import React, {useMemo} from 'react';

import {BlockDecoratorProps} from '../../../models';
import {block} from '../../../utils';
import AddBlock from '../../Components/AddBlock/AddBlock';
import EditBlock from '../../Components/EditBlock/EditBlock';
import {useEditorState} from '../../store';
import {EditorProps} from '../../types';
import {addCustomDecorator} from '../../utils';
import {Form} from '../Form/Form';

import './Editor.scss';

const b = block('editor');

export const Editor = ({children, ...rest}: EditorProps) => {
    const {content, activeBlockIndex, onContentUpdate, onAdd, onSelect, injectEditBlockProps} =
        useEditorState(rest);
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
        <div className={b()}>
            <div className={b('form')}>
                <Form
                    content={content}
                    onChange={onContentUpdate}
                    activeBlockIndex={activeBlockIndex}
                    onSelect={onSelect}
                />
            </div>
            <div className={b('preview')}>
                {children(constructorProps)}
                <AddBlock onAdd={onAdd} className={b('add-button')} />
            </div>
        </div>
    );
};

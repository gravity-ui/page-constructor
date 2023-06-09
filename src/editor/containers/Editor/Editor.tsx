import React, {useEffect, useMemo} from 'react';

import {BlockDecorationProps} from '../../../models';
import {block} from '../../../utils';
import AddBlock from '../../components/AddBlock/AddBlock';
import EditBlock from '../../components/EditBlock/EditBlock';
import {ErrorBoundary} from '../../components/ErrorBoundary/ErrorBoundary';
import useFormSpec from '../../hooks/useFormSpec';
import {useEditorState} from '../../store';
import {EditorProps} from '../../types';
import {addCustomDecorator, getBlockId} from '../../utils';
import {Form} from '../Form/Form';

import './Editor.scss';

const b = block('editor');

export const Editor = ({children, customSchema, onChange, ...rest}: EditorProps) => {
    const {
        content,
        activeBlockIndex,
        errorBoundaryState,
        onContentUpdate,
        onAdd,
        onSelect,
        injectEditBlockProps,
    } = useEditorState(rest);
    const constructorProps = useMemo(
        () => ({
            content,
            custom: addCustomDecorator(
                [
                    (props: BlockDecorationProps) => <EditBlock {...injectEditBlockProps(props)} />,
                    // need errorBoundaryState flag to reset error on content update
                    (props: BlockDecorationProps) => (
                        <ErrorBoundary
                            {...props}
                            key={`${getBlockId(props)}-${errorBoundaryState}`}
                        />
                    ),
                ],
                rest.custom,
            ),
        }),
        [injectEditBlockProps, content, errorBoundaryState, rest.custom],
    );
    const formSpecs = useFormSpec(customSchema);

    useEffect(() => {
        onChange?.(content);
    }, [content, onChange]);

    return (
        <div className={b()}>
            <div className={b('form')}>
                <Form
                    content={content}
                    onChange={onContentUpdate}
                    activeBlockIndex={activeBlockIndex}
                    onSelect={onSelect}
                    spec={formSpecs}
                />
            </div>
            <div className={b('preview')}>
                <ErrorBoundary key={errorBoundaryState}>{children(constructorProps)}</ErrorBoundary>
                <AddBlock onAdd={onAdd} className={b('add-button')} />
            </div>
        </div>
    );
};

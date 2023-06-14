import React, {useEffect, useMemo} from 'react';

import {BlockDecorationProps} from '../../../models';
import {block} from '../../../utils';
import AddBlock from '../../components/AddBlock/AddBlock';
import EditBlock from '../../components/EditBlock/EditBlock';
import {ErrorBoundary} from '../../components/ErrorBoundary/ErrorBoundary';
import Layout from '../../components/Layout/Layout';
import useFormSpec from '../../hooks/useFormSpec';
import {useEditorState} from '../../store';
import {EditorProps, ViewModeItem} from '../../types';
import {addCustomDecorator, getBlockId} from '../../utils';
import {Form} from '../Form/Form';

import './Editor.scss';

const b = block('editor');

export const Editor = ({children, customSchema, onChange, ...rest}: EditorProps) => {
    const {
        content,
        activeBlockIndex,
        errorBoundaryState,
        viewMode,
        onContentUpdate,
        onViewModeUpdate,
        onAdd,
        onSelect,
        injectEditBlockProps,
    } = useEditorState(rest);
    const isEditingMode = viewMode === ViewModeItem.Edititng;
    const constructorProps = useMemo(() => {
        if (isEditingMode) {
            return {
                content,
                custom: addCustomDecorator(
                    [
                        (props: BlockDecorationProps) => (
                            <EditBlock {...injectEditBlockProps(props)} />
                        ),
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
            };
        }

        return {content, custom: rest.custom};
    }, [injectEditBlockProps, content, errorBoundaryState, isEditingMode, rest.custom]);

    useEffect(() => {
        onChange?.(content);
    }, [content, onChange]);

    const formSpecs = useFormSpec(customSchema);

    return (
        <Layout mode={viewMode} onModeChange={onViewModeUpdate}>
            <Layout.Form>
                <Form
                    content={content}
                    onChange={onContentUpdate}
                    activeBlockIndex={activeBlockIndex}
                    onSelect={onSelect}
                    spec={formSpecs}
                />
            </Layout.Form>
            <Layout.Preview>
                <ErrorBoundary key={errorBoundaryState}>{children(constructorProps)}</ErrorBoundary>
                {isEditingMode && <AddBlock onAdd={onAdd} className={b('add-button')} />}
            </Layout.Preview>
        </Layout>
    );
};

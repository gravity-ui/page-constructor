import React, {useEffect, useMemo} from 'react';

import {BlockDecorationProps} from '../../../models';
import AddBlock from '../../components/AddBlock/AddBlock';
import EditBlock from '../../components/EditBlock/EditBlock';
import {ErrorBoundary} from '../../components/ErrorBoundary/ErrorBoundary';
import Layout from '../../components/Layout/Layout';
import useFormSpec from '../../hooks/useFormSpec';
import {useEditorState} from '../../store';
import {EditorProps, ViewModeItem} from '../../types';
import {addCustomDecorator, getBlockId} from '../../utils';
import {Form} from '../Form/Form';

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
    const formSpecs = useFormSpec(customSchema);

    const isEditingMode = viewMode === ViewModeItem.Edititng;
    const outgoingProps = useMemo(() => {
        const custom = isEditingMode
            ? addCustomDecorator(
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
              )
            : rest.custom;
        return {content, custom, viewMode};
    }, [injectEditBlockProps, content, errorBoundaryState, isEditingMode, viewMode, rest.custom]);

    useEffect(() => {
        onChange?.(content);
    }, [content, onChange]);

    return (
        <Layout mode={viewMode} onModeChange={onViewModeUpdate}>
            {isEditingMode && (
                <Layout.Left>
                    <Form
                        content={content}
                        onChange={onContentUpdate}
                        activeBlockIndex={activeBlockIndex}
                        onSelect={onSelect}
                        spec={formSpecs}
                    />
                </Layout.Left>
            )}
            <Layout.Right>
                <ErrorBoundary key={errorBoundaryState}>{children(outgoingProps)}</ErrorBoundary>
                {isEditingMode && <AddBlock onAdd={onAdd} />}
            </Layout.Right>
        </Layout>
    );
};

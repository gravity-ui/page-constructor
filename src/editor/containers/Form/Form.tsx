import React, {Fragment, memo} from 'react';

import {Tabs, TabsProps} from '@gravity-ui/uikit';
import {JSONSchema4} from 'json-schema';

import {Block, PageContent} from '../../../models';
import {block, getBlockKey} from '../../../utils';
import {BlockForm} from '../../components/BlockForm/BlockForm';
import {CodeEditor} from '../../components/CodeEditor/CodeEditor';
import {PagePropsForm, PagePropsFormData} from '../../components/PagePropsForm/PagePropsForm';
import useFormSpec from '../../hooks/useFormSpec';
import {FormTab} from '../../types';
import {CodeEditorMessageProps} from '../../utils/validation';

import './Form.scss';

const b = block('editor-form');

const tabsItems = Object.values(FormTab).map((tab) => ({
    id: tab,
    title: tab,
}));

export interface FormProps {
    content: PageContent;
    schema: JSONSchema4;
    activeBlockIndex: number;
    activeTab: FormTab;
    codeFullscreeModeOn: boolean;
    onActiveTabUpdate: (tab: FormTab) => void;
    onCodeFullscreeModeOnUpdate: (codeFullscreeModeOn: boolean) => void;
    codeValidator: (code: string) => CodeEditorMessageProps;
    onChange: (content: PageContent) => void;
    onSelect: (index: number) => void;
}

export const Form = memo(
    ({
        content,
        onChange,
        activeBlockIndex,
        onSelect,
        schema,
        codeValidator,
        activeTab,
        onActiveTabUpdate,
        codeFullscreeModeOn,
        onCodeFullscreeModeOnUpdate,
    }: FormProps) => {
        const {blocks, ...page} = content || {};
        const spec = useFormSpec(schema);
        const {blocks: blocksSpec, page: pageSpec} = spec || {};

        let form;

        switch (activeTab) {
            case FormTab.Page: {
                form = (
                    <PagePropsForm
                        spec={pageSpec}
                        data={page}
                        onChange={(data: PagePropsFormData) => {
                            return onChange({
                                ...content,
                                ...data,
                            });
                        }}
                    />
                );
                break;
            }
            case FormTab.Blocks: {
                form = (
                    <Fragment>
                        {blocks.map((blockData, index) =>
                            blocksSpec[blockData.type] ? (
                                <div
                                    className={b('block-form')}
                                    key={getBlockKey(blockData, index)}
                                >
                                    <BlockForm
                                        spec={blocksSpec[blockData.type]}
                                        data={blockData}
                                        active={activeBlockIndex === index}
                                        onChange={(data: Block) => {
                                            onChange({
                                                ...content,
                                                blocks: [
                                                    ...blocks.slice(0, index),
                                                    data,
                                                    ...blocks.slice(index + 1),
                                                ],
                                            });
                                        }}
                                        onSelect={() => onSelect(index)}
                                    />
                                </div>
                            ) : null,
                        )}
                    </Fragment>
                );
                break;
            }
            case FormTab.Code: {
                form = (
                    <CodeEditor
                        content={content}
                        onChange={onChange}
                        validator={codeValidator}
                        fullscreenModeOn={codeFullscreeModeOn}
                        onFullscreenModeOnUpdate={onCodeFullscreeModeOnUpdate}
                    />
                );
                break;
            }
        }

        return (
            <div className={b({'code-editor-active': activeTab === FormTab.Code})}>
                <Tabs
                    activeTab={activeTab}
                    className={b('tabs')}
                    items={tabsItems}
                    onSelectTab={onActiveTabUpdate as TabsProps['onSelectTab']}
                />
                {form}
            </div>
        );
    },
);

Form.displayName = 'Form';
